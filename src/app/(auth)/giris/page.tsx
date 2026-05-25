"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Gem, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function GirisPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("E-posta veya şifre hatalı.");
    } else {
      router.push("/panel");
      router.refresh();
    }
  };

  const inputClass =
    "w-full px-4 py-3.5 rounded-xl bg-white/6 border border-white/10 text-[#F0EDD8] text-sm placeholder:text-[#8B8B9B]/60 focus:outline-none focus:border-[#D4AF37]/50 focus:bg-white/8 transition-all";

  return (
    <div className="min-h-screen bg-[#0B0C10] flex items-center justify-center p-4">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-[#D4AF37]/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center">
              <Gem className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <span className="font-heading font-semibold text-2xl text-[#F0EDD8] tracking-wide">
              SORS
            </span>
          </Link>
          <p className="text-sm text-[#8B8B9B] mt-3">Yönetim Paneli Girişi</p>
        </div>

        {/* Card */}
        <div className="glass-card rounded-2xl p-8 border border-white/8">
          <h1 className="font-heading text-2xl text-[#F0EDD8] mb-1.5">Hoş Geldiniz</h1>
          <p className="text-sm text-[#8B8B9B] mb-7">Hesabınıza giriş yapın</p>

          {error && (
            <div className="mb-5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs text-[#8B8B9B] uppercase tracking-wider mb-2">
                E-posta
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                placeholder="ornek@firma.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-xs text-[#8B8B9B] uppercase tracking-wider mb-2">
                Şifre
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${inputClass} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8B8B9B] hover:text-[#F0EDD8] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full py-3.5 rounded-xl bg-[#D4AF37] text-[#0B0C10] font-semibold text-sm tracking-wide hover:bg-[#E5C84E] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-[#0B0C10]/30 border-t-[#0B0C10] rounded-full animate-spin" />
              ) : (
                <>
                  Giriş Yap
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-[#8B8B9B] hover:text-[#F0EDD8] transition-colors">
            ← Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  );
}
