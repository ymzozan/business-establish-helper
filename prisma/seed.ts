import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Admin user
  const hashedPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@kuyumcu.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@kuyumcu.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });
  console.log("Admin user created:", admin.email);

  // Kuyumcu sector
  const sector = await prisma.sector.upsert({
    where: { slug: "kuyumcu" },
    update: {},
    create: {
      name: "Kuyumcu",
      slug: "kuyumcu",
      isActive: true,
    },
  });
  console.log("Sector created:", sector.name);

  // Clean existing data
  await prisma.answer.deleteMany({});
  await prisma.packageItem.deleteMany({});
  await prisma.package.deleteMany({});
  await prisma.question.deleteMany({ where: { sectorId: sector.id } });
  await prisma.service.deleteMany({ where: { sectorId: sector.id } });

  // ---- NEW_BUSINESS Questions ----
  const q1 = await prisma.question.create({
    data: {
      sectorId: sector.id,
      text: "Bir şirketiniz/firmanız var mı?",
      type: "yes_no",
      options: JSON.stringify(["Evet", "Hayır"]),
      order: 1,
      appType: "NEW_BUSINESS",
    },
  });

  const q2 = await prisma.question.create({
    data: {
      sectorId: sector.id,
      text: "Firma türü nedir?",
      type: "single_choice",
      options: JSON.stringify(["Şahıs", "Limited", "Anonim"]),
      order: 2,
      appType: "NEW_BUSINESS",
      dependsOn: JSON.stringify({ questionId: q1.id, answer: "Evet" }),
    },
  });

  const q3 = await prisma.question.create({
    data: {
      sectorId: sector.id,
      text: "Dükkan/mekanınız var mı?",
      type: "single_choice",
      options: JSON.stringify(["Evet", "Hayır", "Arıyorum"]),
      order: 3,
      appType: "NEW_BUSINESS",
    },
  });

  const q4 = await prisma.question.create({
    data: {
      sectorId: sector.id,
      text: "Mekan büyüklüğü nedir?",
      type: "single_choice",
      options: JSON.stringify(["0-30 m²", "30-60 m²", "60 m² üzeri"]),
      order: 4,
      appType: "NEW_BUSINESS",
      dependsOn: JSON.stringify({ questionId: q3.id, answer: "Evet" }),
    },
  });

  const q5 = await prisma.question.create({
    data: {
      sectorId: sector.id,
      text: "Bütçe aralığınız nedir?",
      type: "single_choice",
      options: JSON.stringify([
        "100.000 TL altı",
        "100.000 - 300.000 TL",
        "300.000 - 500.000 TL",
        "500.000 TL üzeri",
      ]),
      order: 5,
      appType: "NEW_BUSINESS",
    },
  });

  const q6 = await prisma.question.create({
    data: {
      sectorId: sector.id,
      text: "Hangi hizmetlere ihtiyacınız var?",
      type: "multiple_choice",
      options: JSON.stringify([
        "Vitrin Tasarımı",
        "Kasa Sistemi",
        "Güvenlik Sistemi",
        "Yazılım/POS",
        "İç Dekorasyon",
        "Aydınlatma",
        "Klima/Havalandırma",
      ]),
      order: 6,
      appType: "NEW_BUSINESS",
    },
  });

  const q7 = await prisma.question.create({
    data: {
      sectorId: sector.id,
      text: "Ne zaman açmayı planlıyorsunuz?",
      type: "single_choice",
      options: JSON.stringify(["1 ay içinde", "3 ay içinde", "6 ay içinde", "Belirsiz"]),
      order: 7,
      appType: "NEW_BUSINESS",
    },
  });

  // ---- RENOVATION Questions ----
  const r1 = await prisma.question.create({
    data: {
      sectorId: sector.id,
      text: "Kaç yıldır faaliyet gösteriyorsunuz?",
      type: "single_choice",
      options: JSON.stringify(["0-2 yıl", "2-5 yıl", "5-10 yıl", "10 yıl üzeri"]),
      order: 1,
      appType: "RENOVATION",
    },
  });

  const r2 = await prisma.question.create({
    data: {
      sectorId: sector.id,
      text: "Neyi yenilemek istiyorsunuz?",
      type: "multiple_choice",
      options: JSON.stringify([
        "Vitrin",
        "İç Tasarım",
        "Güvenlik Sistemi",
        "Yazılım/POS",
        "Aydınlatma",
        "Kasa Sistemi",
      ]),
      order: 2,
      appType: "RENOVATION",
    },
  });

  const r3 = await prisma.question.create({
    data: {
      sectorId: sector.id,
      text: "Mevcut dükkan büyüklüğünüz nedir?",
      type: "single_choice",
      options: JSON.stringify(["0-30 m²", "30-60 m²", "60 m² üzeri"]),
      order: 3,
      appType: "RENOVATION",
    },
  });

  const r4 = await prisma.question.create({
    data: {
      sectorId: sector.id,
      text: "Bütçe aralığınız nedir?",
      type: "single_choice",
      options: JSON.stringify([
        "50.000 TL altı",
        "50.000 - 150.000 TL",
        "150.000 - 300.000 TL",
        "300.000 TL üzeri",
      ]),
      order: 4,
      appType: "RENOVATION",
    },
  });

  console.log("Questions created");

  // ---- Services ----
  const services = [
    {
      sectorId: sector.id,
      name: "Şirket Kuruluşu",
      description: "Firma kuruluş işlemleri, vergi levhası, ticaret sicil kaydı",
      priceMin: 5000,
      priceMax: 15000,
      category: "Yasal",
      partnerType: "mali_musavir",
      rules: JSON.stringify({
        conditions: [{ questionId: q1.id, operator: "equals", value: "Hayır" }],
        logic: "AND",
      }),
    },
    {
      sectorId: sector.id,
      name: "Vitrin Tasarımı ve Üretimi",
      description: "Profesyonel kuyumcu vitrini tasarım ve üretimi",
      priceMin: 30000,
      priceMax: 150000,
      category: "Tasarım",
      partnerType: "vitrin_uretici",
      rules: JSON.stringify({
        conditions: [{ questionId: q6.id, operator: "contains", value: "Vitrin Tasarımı" }],
        logic: "AND",
      }),
    },
    {
      sectorId: sector.id,
      name: "Kasa Sistemi Kurulumu",
      description: "Güvenlikli kasa sistemi temin ve kurulumu",
      priceMin: 15000,
      priceMax: 80000,
      category: "Ekipman",
      partnerType: "kasa_tedarikci",
      rules: JSON.stringify({
        conditions: [{ questionId: q6.id, operator: "contains", value: "Kasa Sistemi" }],
        logic: "AND",
      }),
    },
    {
      sectorId: sector.id,
      name: "Güvenlik Sistemi Kurulumu",
      description: "Kamera, alarm ve güvenlik sistemi kurulumu",
      priceMin: 10000,
      priceMax: 50000,
      category: "Güvenlik",
      partnerType: "guvenlik",
      rules: JSON.stringify({
        conditions: [{ questionId: q6.id, operator: "contains", value: "Güvenlik Sistemi" }],
        logic: "AND",
      }),
    },
    {
      sectorId: sector.id,
      name: "POS/Yazılım Sistemi",
      description: "Kuyumcu yönetim yazılımı ve POS sistemi",
      priceMin: 5000,
      priceMax: 25000,
      category: "Yazılım",
      partnerType: "yazilim",
      rules: JSON.stringify({
        conditions: [{ questionId: q6.id, operator: "contains", value: "Yazılım/POS" }],
        logic: "AND",
      }),
    },
    {
      sectorId: sector.id,
      name: "İç Dekorasyon",
      description: "Kuyumcu dükkanı iç mekan tasarımı ve uygulama",
      priceMin: 20000,
      priceMax: 100000,
      category: "Tasarım",
      partnerType: "ic_mimar",
      rules: JSON.stringify({
        conditions: [{ questionId: q6.id, operator: "contains", value: "İç Dekorasyon" }],
        logic: "AND",
      }),
    },
    {
      sectorId: sector.id,
      name: "Aydınlatma Sistemi",
      description: "Profesyonel kuyumcu aydınlatma sistemi",
      priceMin: 5000,
      priceMax: 30000,
      category: "Ekipman",
      partnerType: "aydinlatma",
      rules: JSON.stringify({
        conditions: [{ questionId: q6.id, operator: "contains", value: "Aydınlatma" }],
        logic: "AND",
      }),
    },
    {
      sectorId: sector.id,
      name: "Klima/Havalandırma Sistemi",
      description: "Klima ve havalandırma sistemi kurulumu",
      priceMin: 8000,
      priceMax: 25000,
      category: "Ekipman",
      partnerType: "iklimlendirme",
      rules: JSON.stringify({
        conditions: [{ questionId: q6.id, operator: "contains", value: "Klima/Havalandırma" }],
        logic: "AND",
      }),
    },
    // Renovation services
    {
      sectorId: sector.id,
      name: "Vitrin Yenileme",
      description: "Mevcut vitrin yenileme ve modernizasyon",
      priceMin: 20000,
      priceMax: 100000,
      category: "Tasarım",
      partnerType: "vitrin_uretici",
      rules: JSON.stringify({
        conditions: [{ questionId: r2.id, operator: "contains", value: "Vitrin" }],
        logic: "AND",
      }),
    },
    {
      sectorId: sector.id,
      name: "İç Mekan Yenileme",
      description: "Mevcut dükkan iç mekan yenileme",
      priceMin: 15000,
      priceMax: 80000,
      category: "Tasarım",
      partnerType: "ic_mimar",
      rules: JSON.stringify({
        conditions: [{ questionId: r2.id, operator: "contains", value: "İç Tasarım" }],
        logic: "AND",
      }),
    },
    {
      sectorId: sector.id,
      name: "Güvenlik Sistemi Güncelleme",
      description: "Mevcut güvenlik sistemi güncelleme ve modernizasyon",
      priceMin: 8000,
      priceMax: 40000,
      category: "Güvenlik",
      partnerType: "guvenlik",
      rules: JSON.stringify({
        conditions: [{ questionId: r2.id, operator: "contains", value: "Güvenlik Sistemi" }],
        logic: "AND",
      }),
    },
    {
      sectorId: sector.id,
      name: "Yazılım/POS Güncelleme",
      description: "Mevcut yazılım sistemi güncelleme",
      priceMin: 3000,
      priceMax: 15000,
      category: "Yazılım",
      partnerType: "yazilim",
      rules: JSON.stringify({
        conditions: [{ questionId: r2.id, operator: "contains", value: "Yazılım/POS" }],
        logic: "AND",
      }),
    },
  ];

  for (const service of services) {
    await prisma.service.create({ data: service });
  }

  console.log("Services created");
  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
