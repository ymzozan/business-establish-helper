CREATE TABLE "SiteSettings" (
 "id" TEXT NOT NULL DEFAULT 'main', "companyName" TEXT NOT NULL DEFAULT 'Kuyumcu Merkezi',
 "legalName" TEXT NOT NULL DEFAULT 'Örnek Kuyumculuk Ltd. Şti. (örnek bilgi)',
 "phone" TEXT NOT NULL DEFAULT '', "address" TEXT NOT NULL DEFAULT 'İstanbul, Türkiye (örnek adres)',
 "email" TEXT NOT NULL DEFAULT 'iletisim@example.com', "demo" BOOLEAN NOT NULL DEFAULT true,
 "notificationEmail" TEXT NOT NULL DEFAULT '', "notificationEnabled" BOOLEAN NOT NULL DEFAULT false,
 "privacyText" TEXT NOT NULL DEFAULT '', "disclosureText" TEXT NOT NULL DEFAULT '', "legalPublished" BOOLEAN NOT NULL DEFAULT false,
 "updatedAt" TIMESTAMP(3) NOT NULL, CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "BlogPost" (
 "slug" TEXT NOT NULL, "title" TEXT NOT NULL, "description" TEXT NOT NULL, "category" TEXT NOT NULL,
 "service" TEXT NOT NULL, "body" TEXT NOT NULL, "published" BOOLEAN NOT NULL DEFAULT false,
 "updatedAt" TIMESTAMP(3) NOT NULL, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
 CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("slug")
);
CREATE TABLE "RequestNotification" (
 "applicationId" TEXT NOT NULL, "status" TEXT NOT NULL DEFAULT 'PENDING',
 "attemptedAt" TIMESTAMP(3), "sentAt" TIMESTAMP(3), CONSTRAINT "RequestNotification_pkey" PRIMARY KEY ("applicationId"),
 CONSTRAINT "RequestNotification_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
