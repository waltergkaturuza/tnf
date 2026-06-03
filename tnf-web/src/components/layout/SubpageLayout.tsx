type Props = {
  title: string;
  description?: string;
  children: React.ReactNode;
  /** Narrower content column for forms (max-w-xl) */
  narrow?: boolean;
  /** Wider form layout (max-w-4xl) */
  wideForm?: boolean;
  /** Slightly wider prose column (max-w-3xl) */
  prose?: boolean;
};

export function SubpageLayout({
  title,
  description,
  children,
  narrow = false,
  wideForm = false,
  prose = false,
}: Props) {
  const bodyMax = narrow
    ? "max-w-xl"
    : wideForm
      ? "max-w-4xl"
      : prose
        ? "max-w-3xl"
        : "max-w-6xl";

  return (
    <div>
      <div className="page-shell-hero py-6 sm:py-8">
        <div className="page-shell-header">
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">{title}</h1>
          {description && (
            <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-200 sm:mt-3 sm:text-base">{description}</p>
          )}
        </div>
      </div>
      <div className={`page-shell-body ${bodyMax} py-10 lg:py-12`}>{children}</div>
    </div>
  );
}
