import Link from "next/link";

export function Footer() {
  return (
    <footer className="simple-footer">
      <span>© {new Date().getFullYear()} Kuyumcu Merkezi</span>
      <Link href="/giris">Yönetim girişi</Link>
    </footer>
  );
}
