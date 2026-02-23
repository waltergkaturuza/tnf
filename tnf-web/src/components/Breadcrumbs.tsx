import Link from "next/link";

type Item = { label: string; href?: string };

export function Breadcrumbs({ items, variant = "default" }: { items: Item[]; variant?: "default" | "light" }) {
  if (items.length === 0) return null;

  const isLight = variant === "light";
  const baseClass = isLight ? "text-slate-300" : "text-slate-600";
  const linkClass = isLight ? "hover:text-white" : "hover:text-tnf-gold";
  const currentClass = isLight ? "text-white" : "text-tnf-navy";
  const separatorClass = isLight ? "text-slate-500" : "text-slate-400";

  return (
    <nav aria-label="Breadcrumb" className="py-2">
      <ol className={`flex flex-wrap items-center gap-2 text-sm ${baseClass}`} itemScope itemType="https://schema.org/BreadcrumbList">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.href ?? item.label} className="flex items-center gap-2" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              {i > 0 && (
                <span className={separatorClass} aria-hidden="true">
                  /
                </span>
              )}
              {isLast || !item.href ? (
                <span itemProp="name" className={`font-medium ${currentClass}`}>
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className={linkClass} itemProp="item">
                  <span itemProp="name">{item.label}</span>
                </Link>
              )}
              <meta itemProp="position" content={String(i + 1)} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
