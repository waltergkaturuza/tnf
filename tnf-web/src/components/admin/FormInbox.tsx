"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";

export type FormInboxKey = "contact" | "feedback" | "whistleblower" | "newsletter";

type Submission = {
  id: number | string;
  type?: string;
  summary?: string | null;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  organisation?: string | null;
  subject?: string | null;
  message?: string | null;
  category?: string | null;
  ageRange?: string | null;
  gender?: string | null;
  locationScope?: string | null;
  province?: string | null;
  cityOrArea?: string | null;
  country?: string | null;
  dateOfIncident?: string | null;
  preferredContact?: string | null;
  anonymous?: boolean | null;
  metadata?: Record<string, unknown> | null;
  createdAt?: string;
};

export const FORM_INBOXES: {
  key: FormInboxKey;
  title: string;
  description: string;
  href: string;
  match: (type: string | undefined) => boolean;
}[] = [
  {
    key: "contact",
    title: "Contact",
    description: "General enquiries from the public contact form.",
    href: "/admin/forms/contact",
    match: (type) => type === "contact",
  },
  {
    key: "feedback",
    title: "Feedback",
    description: "Economic, social, and labour feedback submissions.",
    href: "/admin/forms/feedback",
    match: (type) => Boolean(type?.startsWith("feedback-")),
  },
  {
    key: "whistleblower",
    title: "Whistleblower",
    description: "Confidential incident reports.",
    href: "/admin/forms/whistleblower",
    match: (type) => type === "whistleblower",
  },
  {
    key: "newsletter",
    title: "Newsletter",
    description: "Email subscriptions from the website footer.",
    href: "/admin/forms/newsletter",
    match: (type) => type === "newsletter",
  },
];

const TYPE_LABELS: Record<string, string> = {
  contact: "Contact",
  "feedback-economic": "Economic",
  "feedback-social": "Social",
  "feedback-labour": "Labour",
  whistleblower: "Whistleblower",
  newsletter: "Newsletter",
};

function formatDate(value?: string) {
  if (!value) return "—";
  return new Date(value).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function displayName(row: Submission) {
  if (row.anonymous) return "Anonymous";
  return row.name?.trim() || "—";
}

function displayLocation(row: Submission) {
  if (row.locationScope === "international") {
    return row.country || "International";
  }
  const parts = [row.province, row.cityOrArea].filter(Boolean);
  return parts.length ? parts.join(", ") : row.locationScope || "—";
}

function DetailRow({ label, value }: { label: string; value?: ReactNode }) {
  if (value === undefined || value === null || value === "") return null;
  return (
    <div className="tnf-forms-detail__row">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function getAttachmentInfo(row: Submission): { label: string; url?: string } | null {
  const meta = row.metadata;
  if (!meta || typeof meta !== "object") return null;
  const attachment = (meta.attachment || meta.evidence) as
    | { fileName?: string; url?: string; mediaId?: string | number }
    | undefined;
  if (!attachment) return null;
  const label = attachment.fileName || "Attached file";
  if (attachment.url) return { label, url: attachment.url };
  if (attachment.mediaId != null) {
    return { label, url: `/admin/collections/media/${attachment.mediaId}` };
  }
  return { label };
}

function ViewModal({ row, onClose }: { row: Submission; onClose: () => void }) {
  const recordHref = `/admin/collections/form-submissions/${row.id}`;
  const attachment = getAttachmentInfo(row);

  const openFullRecord = () => {
    onClose();
    // Hard navigation — Next Link soft-routing often no-ops inside Payload custom views.
    window.location.assign(recordHref);
  };

  return (
    <div className="tnf-forms-modal" role="dialog" aria-modal="true">
      <button type="button" className="tnf-forms-modal__backdrop" aria-label="Close" onClick={onClose} />
      <div className="tnf-forms-modal__panel">
        <div className="tnf-forms-modal__head">
          <div>
            <p className="tnf-forms-modal__eyebrow">
              {TYPE_LABELS[row.type || ""] || row.type || "Submission"}
            </p>
            <h2>{displayName(row)}</h2>
          </div>
          <button type="button" className="tnf-forms-btn tnf-forms-btn--ghost" onClick={onClose}>
            Close
          </button>
        </div>

        <dl className="tnf-forms-detail">
          <DetailRow label="Email" value={row.email} />
          <DetailRow label="Phone" value={row.phone} />
          <DetailRow label="Organisation" value={row.organisation} />
          <DetailRow label="Subject" value={row.subject} />
          <DetailRow label="Category" value={row.category} />
          <DetailRow label="Age range" value={row.ageRange} />
          <DetailRow label="Gender" value={row.gender} />
          <DetailRow label="Location" value={displayLocation(row)} />
          <DetailRow
            label="Date of incident"
            value={row.dateOfIncident ? formatDate(row.dateOfIncident) : undefined}
          />
          <DetailRow label="Preferred contact" value={row.preferredContact} />
          <DetailRow label="Submitted" value={formatDate(row.createdAt)} />
          <DetailRow
            label="Attachment"
            value={
              attachment ? (
                attachment.url ? (
                  <a href={attachment.url} target="_blank" rel="noreferrer">
                    {attachment.label}
                  </a>
                ) : (
                  attachment.label
                )
              ) : undefined
            }
          />
          <DetailRow
            label="Message"
            value={row.message ? <div className="tnf-forms-detail__message">{row.message}</div> : undefined}
          />
        </dl>

        <div className="tnf-forms-modal__actions">
          <button type="button" className="tnf-forms-btn tnf-forms-btn--secondary" onClick={openFullRecord}>
            Open full record
          </button>
          <button type="button" className="tnf-forms-btn tnf-forms-btn--gold" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default function FormInbox({ formKey }: { formKey: FormInboxKey }) {
  const inbox = FORM_INBOXES.find((item) => item.key === formKey)!;
  const [rows, setRows] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Submission | null>(null);
  const [deletingId, setDeletingId] = useState<string | number | null>(null);
  const [search, setSearch] = useState("");

  const isNewsletter = formKey === "newsletter";
  const isFeedback = formKey === "feedback";
  const isWhistleblower = formKey === "whistleblower";
  const isContact = formKey === "contact";

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/form-submissions?limit=500&sort=-createdAt&depth=0", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to load submissions");
      const data = (await res.json()) as { docs?: Submission[] };
      setRows((data.docs ?? []).filter((row) => inbox.match(row.type)));
    } catch {
      setError("Could not load submissions. Refresh and try again.");
    } finally {
      setLoading(false);
    }
  }, [inbox]);

  useEffect(() => {
    void load();
  }, [load]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) =>
      [row.name, row.email, row.subject, row.message, row.category, row.summary, row.type]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [rows, search]);

  const handleDelete = async (row: Submission) => {
    const label = displayName(row);
    if (!window.confirm(`Delete this ${inbox.title.toLowerCase()} entry for ${label}?`)) {
      return;
    }
    setDeletingId(row.id);
    try {
      const res = await fetch(`/api/form-submissions/${row.id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Delete failed");
      setRows((prev) => prev.filter((item) => item.id !== row.id));
      if (selected?.id === row.id) setSelected(null);
    } catch {
      window.alert("Could not delete this submission. Try again.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="tnf-forms">
      <div className="tnf-forms__nav-row">
        <button
          type="button"
          className="tnf-forms-btn tnf-forms-btn--ghost tnf-forms-back"
          onClick={() => {
            window.location.assign("/admin");
          }}
        >
          ← Back to dashboard
        </button>
      </div>

      <div className="tnf-forms__header">
        <div>
          <p className="tnf-forms__eyebrow">Form Submissions</p>
          <h1>{inbox.title}</h1>
          <p>
            {filtered.length} {filtered.length === 1 ? "entry" : "entries"} · {inbox.description}
          </p>
        </div>
        <div className="tnf-forms__header-actions">
          <button type="button" className="tnf-forms-btn tnf-forms-btn--secondary" onClick={() => void load()}>
            Refresh
          </button>
        </div>
      </div>

      <nav className="tnf-forms-tabs" aria-label="Form submission types">
        {FORM_INBOXES.map((item) => {
          const active = item.key === formKey;
          return (
            <Link
              key={item.key}
              href={item.href}
              className={`tnf-forms-tabs__link${active ? " is-active" : ""}`}
            >
              {item.title}
            </Link>
          );
        })}
      </nav>

      <div className="tnf-forms__toolbar">
        <input
          className="tnf-forms__search"
          type="search"
          placeholder={`Search ${inbox.title.toLowerCase()} submissions…`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading && <p className="tnf-forms-empty">Loading submissions…</p>}
      {error && <p className="tnf-forms-error">{error}</p>}

      {!loading && !error && (
        <section className="tnf-forms-panel">
          <div className="tnf-forms-panel__head">
            <div>
              <h2>{inbox.title}</h2>
              <p>{inbox.description}</p>
            </div>
            <span className="tnf-forms-panel__count">{filtered.length}</span>
          </div>

          {filtered.length === 0 ? (
            <p className="tnf-forms-empty">No {inbox.title.toLowerCase()} submissions yet.</p>
          ) : (
            <div className="tnf-forms-table-wrap">
              <table className="tnf-forms-table">
                <thead>
                  <tr>
                    {!isNewsletter && <th>Name</th>}
                    <th>Email</th>
                    {isFeedback && <th>Type</th>}
                    {!isNewsletter && <th>Category</th>}
                    {isWhistleblower && <th>Location</th>}
                    {isContact && <th>Subject</th>}
                    <th>Submitted</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row) => (
                    <tr key={row.id}>
                      {!isNewsletter && <td>{displayName(row)}</td>}
                      <td className="tnf-forms-table__email">{row.email || "—"}</td>
                      {isFeedback && (
                        <td>
                          <span className="tnf-forms-badge">
                            {TYPE_LABELS[row.type || ""] || row.type}
                          </span>
                        </td>
                      )}
                      {!isNewsletter && <td>{row.category || "—"}</td>}
                      {isWhistleblower && <td>{displayLocation(row)}</td>}
                      {isContact && <td>{row.subject || "—"}</td>}
                      <td>{formatDate(row.createdAt)}</td>
                      <td>
                        <div className="tnf-forms-actions">
                          <button
                            type="button"
                            className="tnf-forms-btn tnf-forms-btn--secondary"
                            onClick={() => setSelected(row)}
                          >
                            View
                          </button>
                          <button
                            type="button"
                            className="tnf-forms-btn tnf-forms-btn--danger"
                            disabled={deletingId === row.id}
                            onClick={() => void handleDelete(row)}
                          >
                            {deletingId === row.id ? "…" : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      {selected && <ViewModal row={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
