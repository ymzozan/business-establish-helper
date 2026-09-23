"use client";
import Link from "next/link";
import { Diamond, Menu, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
const links = [{href:"/#hizmetler",label:"Hizmetlerimiz"},{href:"/#planla",label:"Mağazanı oluştur"},{href:"/#surec",label:"Nasıl çalışır?"},{href:"/#teklif",label:"İletişim"}];
export function Header() { return <header className="j-header"><div className="j-topbar">Toptan altın, tamirat ve anahtar teslim kuyumcu kurulumu</div><div className="j-nav"><Link href="/" className="j-logo"><Diamond size={31} strokeWidth={1.3}/><span>kuyumcu<span className="j-logo-sub">MERKEZİ</span></span></Link><nav aria-label="Ana menü" className="j-desktop-nav">{links.map(l=><Link key={l.href} href={l.href}>{l.label}</Link>)}</nav><Link className="j-nav-cta" href="/#teklif">Birlikte planlayalım <ArrowUpRight size={17}/></Link><div className="j-mobile-menu"><Sheet><SheetTrigger render={<Button variant="ghost" size="icon" aria-label="Menüyü aç"/>}><Menu/></SheetTrigger><SheetContent><SheetHeader><SheetTitle>Kuyumcu Merkezi</SheetTitle></SheetHeader><nav className="flex flex-col gap-5 p-6">{links.map(l=><SheetClose key={l.href} render={<Link href={l.href}/>}>{l.label}</SheetClose>)}</nav></SheetContent></Sheet></div></div></header>; }
