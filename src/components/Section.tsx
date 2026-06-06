export function Section({
  actionLabel = "전체 보기",
  children,
  id,
  subtitle,
  title,
}: {
  actionLabel?: string;
  children: React.ReactNode;
  id?: string;
  subtitle: string;
  title: string;
}) {
  return (
    <section
      className="scroll-mt-8 border-t border-[#C9D2D7] pt-4"
      id={id}
    >
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h2 className="text-[21px] font-semibold tracking-normal text-[#202A31]">
            {title}
          </h2>
          <p className="mt-2 text-[13px] text-[#6A767E]">{subtitle}</p>
        </div>
        <button
          className="mt-1 text-[12px] font-semibold text-[#00AEBB] transition hover:text-[#087F89]"
          type="button"
        >
          {actionLabel}
        </button>
      </div>
      {children}
    </section>
  );
}
