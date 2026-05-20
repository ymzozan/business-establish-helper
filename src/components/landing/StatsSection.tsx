const stats = [
  { value: "300+", label: "Aktif Kullanıcı" },
  { value: "50M+", label: "İşlem Hacmi (₺)" },
  { value: "%99.9", label: "Uptime" },
  { value: "7/24", label: "Destek" },
];

export function StatsSection() {
  return (
    <section className="bg-surface-dark py-20">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-heading text-4xl sm:text-5xl font-normal tracking-[-1px] leading-none text-on-dark mb-3">
                {stat.value}
              </div>
              <p className="text-on-dark-soft text-sm font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
