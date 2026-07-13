"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FORM_INBOXES } from "./FormInbox";

export default function FormSubmissionsNav() {
  const pathname = usePathname() || "";

  return (
    <div className="nav-group tnf-forms-nav">
      <div className="nav-group__toggle" aria-hidden="true">
        <span className="nav-group__label">Form Submissions</span>
      </div>
      <div className="tnf-forms-nav__links">
        {FORM_INBOXES.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.key}
              id={`nav-forms-${item.key}`}
              href={item.href}
              className={`nav__link${active ? " active" : ""}`}
              prefetch={false}
            >
              {active && <div className="nav__link-indicator" />}
              <span className="nav__link-label">{item.title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
