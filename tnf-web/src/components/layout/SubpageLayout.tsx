import { Breadcrumbs } from "@/components/Breadcrumbs";

export type BreadcrumbItem = { label: string; href?: string };

type Props = {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  children: React.ReactNode;
  /** Narrower content column for forms (max-w-xl) */
  narrow?: boolean;
  /** Slightly wider prose column (max-w-3xl) */
  prose?: boolean;
};

export function SubpageLayout({
  title,
  description,
  breadcrumbs,
  children,
  narrow = false,
  prose = false,
}: Props) {
  const bodyMax = narrow
    ? "max-w-xl"
    : prose
      ? "max-w-3xl"
      : "max-w-6xl";

  return (
    <div>
      <div className="bg-tnf-navy py-12 lg:py-16">
        <div className="page-shell-header">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <div className="flex justify-center">
              <Breadcrumbs items={breadcrumbs} variant="light" />
            </div>
          )}
          <h1
            className={`text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl ${
              breadcrumbs?.length ? "mt-4" : ""
            }`}
          >
            {title}
          </h1>
          {description && (
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-200 sm:text-lg">{description}</p>
          )}
        </div>
      </div>
      <div className={`page-shell-body ${bodyMax} py-14 lg:py-16`}>{children}</div>
    </div>
  );
}
