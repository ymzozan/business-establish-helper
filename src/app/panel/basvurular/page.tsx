import { prisma } from "@/lib/db";
import type { Prisma } from "@prisma/client";
import Link from "next/link";
import { ArrowUpRight, Inbox, Search } from "lucide-react";
const statuses: Record<string, string> = {
  NEW: "Yeni",
  IN_PROGRESS: "İşlemde",
  CONTACTED: "Görüşüldü",
  COMPLETED: "Tamamlandı",
  CANCELLED: "İptal",
};
const services: Record<string, string> = {
  NEW_BUSINESS: "Mağaza kurulumu",
  WHOLESALE: "Toptan altın",
  REPAIR: "Tamirat",
  RENOVATION: "Yenileme",
};
export default async function ApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    status?: string;
    type?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q.trim().slice(0, 100) : "";
  const status =
    typeof params.status === "string" && statuses[params.status]
      ? params.status
      : "";
  const type =
    typeof params.type === "string" && services[params.type] ? params.type : "";
  const requestedPage = Math.max(
    1,
    Math.min(100000, parseInt(params.page || "1", 10) || 1),
  );
  const where: Prisma.ApplicationWhereInput = {
    ...(status ? { status } : {}),
    ...(type ? { type } : {}),
    ...(q
      ? {
          OR: [
            { firstName: { contains: q, mode: "insensitive" } },
            { lastName: { contains: q, mode: "insensitive" } },
            { phone: { contains: q } },
            { email: { contains: q, mode: "insensitive" } },
          ],
        }
      : {}),
  };
  const [count, total, newCount, openCount] = await Promise.all([
    prisma.application.count({ where }),
    prisma.application.count(),
    prisma.application.count({ where: { status: "NEW" } }),
    prisma.application.count({ where: { status: "IN_PROGRESS" } }),
  ]);
  const pages = Math.max(1, Math.ceil(count / 20));
  const page = Math.min(requestedPage, pages);
  const applications = await prisma.application.findMany({
    where,
    take: 20,
    skip: (page - 1) * 20,
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    select: {
      id: true,
      firstName: true,
      lastName: true,
      phone: true,
      city: true,
      type: true,
      status: true,
      budget: true,
      createdAt: true,
    },
  });
  function pageLink(value: number) {
    return `/panel/basvurular?${new URLSearchParams({ q, status, type, page: String(value) })}`;
  }
  return (
    <div className="inbox-page">
      <div className="inbox-heading">
        <div>
          <span className="simple-kicker">TALEP MERKEZİ</span>
          <h1>Gelen talepler</h1>
          <p>Müşteriyi tanıyın. İhtiyacını görün. Sonraki adımı belirleyin.</p>
        </div>
        <Inbox size={30} strokeWidth={1.25} />
      </div>
      <div className="inbox-stats">
        <Link href="/panel/basvurular">
          <strong>{total}</strong>
          <span>Toplam talep</span>
        </Link>
        <Link href="/panel/basvurular?status=NEW">
          <strong>{newCount}</strong>
          <span>Yeni bekleyen</span>
        </Link>
        <Link href="/panel/basvurular?status=IN_PROGRESS">
          <strong>{openCount}</strong>
          <span>İşlemde</span>
        </Link>
      </div>
      <form className="inbox-filters">
        <label>
          <Search size={17} />
          <input
            name="q"
            defaultValue={q}
            aria-label="İsim, telefon veya e-posta ara"
            placeholder="İsim, telefon veya e-posta"
          />
        </label>
        <select name="type" defaultValue={type} aria-label="Hizmet filtresi">
          <option value="">Tüm hizmetler</option>
          {Object.entries(services).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
        <select name="status" defaultValue={status} aria-label="Durum filtresi">
          <option value="">Tüm durumlar</option>
          {Object.entries(statuses).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
        <button type="submit">Filtrele</button>
        {(q || status || type) && <Link href="/panel/basvurular">Temizle</Link>}
      </form>
      <div className="inbox-results">
        <div className="inbox-list-title">
          <h2>Talepler</h2>
          <span>{count} kayıt</span>
        </div>
        {applications.length === 0 ? (
          <div className="inbox-empty">
            <Inbox size={32} strokeWidth={1.2} />
            <h3>
              {q || status || type
                ? "Eşleşen talep bulunamadı."
                : "Henüz talep yok."}
            </h3>
            <p>
              {q || status || type
                ? "Farklı bir arama veya filtre deneyin."
                : "Siteden gelen bilgiler burada görünecek."}
            </p>
          </div>
        ) : (
          applications.map((app) => (
            <Link
              className="inbox-row"
              href={`/panel/basvurular/${app.id}`}
              key={app.id}
            >
              <div className="inbox-person">
                <span className="person-initial">
                  {app.firstName.slice(0, 1)}
                </span>
                <div>
                  <h3>
                    {app.firstName} {app.lastName}
                  </h3>
                  <p>
                    {app.phone}
                    {app.city ? ` · ${app.city}` : ""}
                  </p>
                </div>
              </div>
              <div className="inbox-service">
                <strong>{services[app.type] || app.type}</strong>
                <span>Bütçe: {app.budget || "Belirtilmedi"}</span>
              </div>
              <div className="inbox-state">
                <span
                  className={`request-status status-${app.status.toLowerCase()}`}
                >
                  {statuses[app.status] || app.status}
                </span>
                <small>{app.createdAt.toLocaleDateString("tr-TR")}</small>
              </div>
              <ArrowUpRight size={17} />
            </Link>
          ))
        )}
      </div>
      {pages > 1 && (
        <nav className="inbox-pagination" aria-label="Talep sayfaları">
          {page > 1 ? (
            <Link href={pageLink(page - 1)}>← Önceki</Link>
          ) : (
            <span />
          )}
          <span>
            {page} / {pages}
          </span>
          {page < pages ? (
            <Link href={pageLink(page + 1)}>Sonraki →</Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </div>
  );
}
