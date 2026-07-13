"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";

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
  createdAt?: string;
  updatedAt?: string;
};

type FormGroup = "contact" | "feedback" | "whistleblower" | "newsletter";

const GROUPS: {
  key: FormGroup;
  title: string;
  description: string;
  match: (type: string | undefined) => boolean;
}[] = [
  {
    key: "contact",
    title: "Contact",
    description: "General enquiries from the public contact form.",
    match: (type) => type === "contact",
  },
  {
    key: "feedback",
    title: "Feedback",
    description: "Economic, social, and labour feedback submissions.",
    match: (type) => Boolean(type?.startsWith("feedback-")),
  },
  {
    key: "whistleblower",
    title: "Whistleblower",
    description: "Confidential incident reports.",
    match: (type) => type === "whistleblower",
  },
  {
    key: "newsletter",
    title: "Newsletter",
    description: "Email subscriptions from the website footer.",
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

function ViewModal({
  row,
  onClose,
}: {
  row: Submission;
  onClose: () => void;
}) {
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
          <DetailRow label="Date of incident" value={row.dateOfIncident ? formatDate(row.dateOfIncident) : undefined} />
          <DetailRow label="Preferred contact" value={row.preferredContact} />
          <DetailRow label="Submitted" value={formatDate(row.createdAt)} />
          <DetailRow
            label="Message"
            value={row.message ? <div className="tnf-forms-detail__message">{row.message}</div> : undefined}
          />
        </dl>

        <div className="tnf-forms-modal__actions">
          <Link
            className="tnf-forms-btn tnf-forms-btn--secondary"
            href={`/admin/collections/form-submissions/${row.id}`}
          >
            Open full record
          </Link>
          <button type="button" className="tnf-forms-btn tnf-forms-btn--gold" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

function SubmissionTable({
  group,
  rows,
  onView,
  onDelete,
  deletingId,
}: {
  group: (typeof GROUPS)[number];
  rows: Submission[];
  onView: (row: Submission) => void;
  onDelete: (row: Submission) => void;
  deletingId: string | number | null;
}) {
  const isNewsletter = group.key === "newsletter";
  const isFeedback = group.key === "feedback";
  const isWhistleblower = group.key === "whistleblower";

  return (
    <section className="tnf-forms-panel">
      <div className="tnf-forms-panel__head">
        <div>
          <h2>{group.title}</h2>
          <p>{group.description}</p>
        </div>
        <span className="tnf-forms-panel__count">{rows.length}</span>
      </div>

      {rows.length === 0 ? (
        <p className="tnf-forms-empty">No {group.title.toLowerCase()} submissions yet.</p>
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
                {group.key === "contact" && <th>Subject</th>}
                <th>Submitted</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
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
                  {group.key === "contact" && <td>{row.subject || "—"}</td>}
                  <td>{formatDate(row.createdAt)}</td>
                  <td>
                    <div className="tnf-forms-actions">
                      <button
                        type="button"
                        className="tnf-forms-btn tnf-forms-btn--secondary"
                        onClick={() => onView(row)}
                      >
                        View
                      </button>
                      <button
                        type="button"
                        className="tnf-forms-btn tnf-forms-btn--danger"
                        disabled={deletingId === row.id}
                        onClick={() => onDelete(row)}
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
  );
}

export default function FormSubmissionsList() {
  const [rows, setRows] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Submission | null>(null);
  const [deletingId, setDeletingId] = useState<string | number | null>(null);
  const [search, setSearch] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/form-submissions?limit=500&sort=-createdAt&depth=0", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to load submissions");
      const data = (await res.json()) as { docs?: Submission[] };
      setRows(data.docs ?? []);
    } catch {
      setError("Could not load form submissions. Refresh and try again.");
    } finally {
      setLoading(false);
    }
  }, []);

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

  const grouped = useMemo(() => {
    return GROUPS.map((group) => ({
      group,
      rows: filtered.filter((row) => group.match(row.type)),
    }));
  }, [filtered]);

  const handleDelete = async (row: Submission) => {
    const label = displayName(row);
    if (!window.confirm(`Delete this ${TYPE_LABELS[row.type || ""] || "submission"} entry for ${label}?`)) {
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
      <div className="tnf-forms__header">
        <div>
          <h1>Form Submissions</h1>
          <p>
            {rows.length} total · separate inboxes for Contact, Feedback, Whistleblower, and Newsletter
          </p>
        </div>
        <button type="button" className="tnf-forms-btn tnf-forms-btn--secondary" onClick={() => void load()}>
          Refresh
        </button>
      </div>

      <div className="tnf-forms__toolbar">
        <input
          className="tnf-forms__search"
          type="search"
          placeholder="Search by name, email, subject, message, or category…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading && <p className="tnf-forms-empty">Loading submissions…</p>}
      {error && <p className="tnf-forms-error">{error}</p>}

      {!loading && !error && (
        <div className="tnf-forms__stack">
          {grouped.map(({ group, rows: groupRows }) => (
            <SubmissionTable
              key={group.key}
              group={group}
              rows={groupRows}
              onView={setSelected}
              onDelete={handleDelete}
              deletingId={deletingId}
            />
          ))}
        </div>
      )}

      {selected && <ViewModal row={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
