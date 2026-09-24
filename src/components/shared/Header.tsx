import Link from "next/link";
import { Diamond } from "lucide-react";

export function Header() {
  return (
    <header className="simple-header">
      <Link href="/" className="simple-logo" aria-label="Kuyumcu Merkezi ana sayfa">
        <Diamond size={24} strokeWidth={1.5} aria-hidden="true" />
        <span>kuyumcu<span className="simple-logo-light">merkezi</span></span>
      </Link>
      <span className="simple-header-note">Birlikte, kolayca.</span>
    </header>
  );
}
