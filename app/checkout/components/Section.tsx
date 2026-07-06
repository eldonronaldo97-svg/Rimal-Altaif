interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export default function Section({
  title,
  children,
}: SectionProps) {
  return (
    <section className="mb-10">

      <h2 className="mb-6 text-[24px] font-semibold text-[#111827]">
        {title}
      </h2>

      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6">
        {children}
      </div>

    </section>
  );
}