"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { AnalyticsSummary } from "@/lib/analytics/aggregate";

const DAY_OPTIONS = [7, 14, 30, 90] as const;

function formatShortDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

function KpiCard({
  icon,
  label,
  value,
  hint,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  hint: string;
  accent: "blue" | "amber" | "violet" | "green" | "purple";
}) {
  return (
    <div className={`tnf-analytics-kpi tnf-analytics-kpi--${accent}`}>
      <div className="tnf-analytics-kpi__icon">{icon}</div>
      <p className="tnf-analytics-kpi__value">{value.toLocaleString()}</p>
      <p className="tnf-analytics-kpi__label">{label}</p>
      <p className="tnf-analytics-kpi__hint">{hint}</p>
    </div>
  );
}

export default function AnalyticsDashboard() {
  const [days, setDays] = useState<number>(14);
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/analytics/summary?days=${days}`, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to load analytics");
      const data = (await res.json()) as AnalyticsSummary;
      setSummary(data);
    } catch {
      setError("Could not load analytics. Run payload:migrate if this is a new install.");
    } finally {
      setLoading(false);
    }
  }, [days]);

  useEffect(() => {
    void load();
  }, [load]);

  const chartData = useMemo(
    () =>
      summary?.pageViewsByDay.map((row) => ({
        ...row,
        label: formatShortDate(row.date),
      })) ?? [],
    [summary],
  );

  const topPageMax = summary?.topPages[0]?.count ?? 1;
  const deviceColors = ["#3b82f6", "#f59e0b", "#8b5cf6", "#64748b"];

  return (
    <div className="tnf-analytics">
      <header className="tnf-analytics__header">
        <div>
          <h1 className="tnf-analytics__title">Analytics</h1>
          <p className="tnf-analytics__subtitle">Site visitors and interactions</p>
        </div>
        <div className="tnf-analytics__controls">
          <select
            className="tnf-analytics__select"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            aria-label="Date range"
          >
            {DAY_OPTIONS.map((d) => (
              <option key={d} value={d}>
                {d} days
              </option>
            ))}
          </select>
          <button type="button" className="tnf-analytics__refresh" onClick={() => void load()} aria-label="Refresh">
            ↻
          </button>
        </div>
      </header>

      {error && <p className="tnf-analytics__error">{error}</p>}

      {loading && !summary ? (
        <p className="tnf-analytics__loading">Loading analytics…</p>
      ) : summary ? (
        <>
          <div className="tnf-analytics-kpis">
            <KpiCard
              accent="blue"
              label="Total Page Views"
              value={summary.totals.pageViews}
              hint="All time"
              icon="👁"
            />
            <KpiCard
              accent="amber"
              label="Unique Visitors"
              value={summary.totals.uniqueVisitors}
              hint={`Last ${summary.days} days`}
              icon="👥"
            />
            <KpiCard
              accent="violet"
              label="Views Today"
              value={summary.totals.viewsToday}
              hint="Since midnight"
              icon="↗"
            />
            <KpiCard
              accent="green"
              label="Days in Window"
              value={summary.days}
              hint={`${summary.days} days`}
              icon="📅"
            />
            <KpiCard
              accent="purple"
              label="Resource Downloads"
              value={summary.totals.resourceDownloads}
              hint={`Last ${summary.downloadDays} days`}
              icon="⬇"
            />
          </div>

          <section className="tnf-analytics-panel tnf-analytics-panel--wide">
            <div className="tnf-analytics-panel__head">
              <div>
                <h2>Events</h2>
                <p>Page views over time</p>
              </div>
              <span className="tnf-analytics-panel__meta">BY TYPE ({summary.days} DAYS)</span>
            </div>
            <div className="tnf-analytics-chart tnf-analytics-chart--tall">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="pageViewsFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.45} />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="rgba(148,163,184,0.15)" strokeDasharray="4 4" />
                  <XAxis dataKey="label" tick={{ fill: "#93c5fd", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#93c5fd", fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }}
                    labelStyle={{ color: "#e2e8f0" }}
                  />
                  <Area type="monotone" dataKey="total" name="Page views" stroke="#3b82f6" fill="url(#pageViewsFill)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          <div className="tnf-analytics-grid">
            <section className="tnf-analytics-panel">
              <div className="tnf-analytics-panel__head">
                <div>
                  <h2>Page Views</h2>
                  <p className="tnf-analytics-legend">
                    <span className="tnf-analytics-legend__dot tnf-analytics-legend__dot--blue" /> Total
                    <span className="tnf-analytics-legend__dot tnf-analytics-legend__dot--amber" /> Unique Sessions
                  </p>
                </div>
                <span className="tnf-analytics-panel__meta">{summary.days} DAYS</span>
              </div>
              <div className="tnf-analytics-chart">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid stroke="rgba(148,163,184,0.15)" strokeDasharray="4 4" />
                    <XAxis dataKey="label" tick={{ fill: "#93c5fd", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#93c5fd", fontSize: 10 }} axisLine={false} tickLine={false} allowDecimals={false} />
                    <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }} />
                    <Line type="monotone" dataKey="total" name="Total" stroke="#3b82f6" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="unique" name="Unique" stroke="#f59e0b" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section className="tnf-analytics-panel">
              <div className="tnf-analytics-panel__head">
                <div>
                  <h2>Top pages</h2>
                  <p>Most visited pages</p>
                </div>
                <span className="tnf-analytics-panel__meta">{summary.days} DAYS</span>
              </div>
              <ul className="tnf-analytics-list">
                {summary.topPages.length === 0 ? (
                  <li className="tnf-analytics-list__empty">No page views recorded yet.</li>
                ) : (
                  summary.topPages.map((page, i) => (
                    <li key={page.path} className="tnf-analytics-list__item">
                      <span className="tnf-analytics-list__rank">{i + 1}</span>
                      <div className="tnf-analytics-list__body">
                        <span className="tnf-analytics-list__title">{page.label}</span>
                        <div className="tnf-analytics-list__bar">
                          <span style={{ width: `${Math.round((page.count / topPageMax) * 100)}%` }} />
                        </div>
                      </div>
                      <span className="tnf-analytics-list__count">{page.count}</span>
                    </li>
                  ))
                )}
              </ul>
            </section>
          </div>

          <section className="tnf-analytics-panel tnf-analytics-panel--wide">
            <div className="tnf-analytics-panel__head">
              <div>
                <h2>Resource Downloads</h2>
                <p>Document downloads from Resources</p>
              </div>
              <span className="tnf-analytics-panel__meta">LAST {summary.downloadDays} DAYS</span>
            </div>
            <div className="tnf-analytics-downloads">
              <p className="tnf-analytics-downloads__total">
                Total downloads: <strong>{summary.totals.resourceDownloads}</strong>
              </p>
              <ul className="tnf-analytics-list tnf-analytics-list--compact">
                {summary.topResources.length === 0 ? (
                  <li className="tnf-analytics-list__empty">No downloads recorded yet.</li>
                ) : (
                  summary.topResources.map((item, i) => (
                    <li key={item.label} className="tnf-analytics-list__item">
                      <span className="tnf-analytics-list__rank">{i + 1}</span>
                      <span className="tnf-analytics-list__title tnf-analytics-list__title--truncate">{item.label}</span>
                      <span className="tnf-analytics-list__count">{item.count}</span>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </section>

          <section className="tnf-analytics-panel tnf-analytics-panel--wide">
            <div className="tnf-analytics-panel__head">
              <div>
                <h2>Devices</h2>
                <p>Browser device types</p>
              </div>
              <span className="tnf-analytics-panel__meta">{summary.days} DAYS</span>
            </div>
            <div className="tnf-analytics-devices">
              <div className="tnf-analytics-devices__chart">
                {summary.devices.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={summary.devices} dataKey="count" nameKey="device" innerRadius="58%" outerRadius="82%" paddingAngle={2}>
                        {summary.devices.map((_, i) => (
                          <Cell key={i} fill={deviceColors[i % deviceColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="tnf-analytics-list__empty">No device data yet.</p>
                )}
              </div>
              <ul className="tnf-analytics-devices__list">
                {summary.devices.map((device, i) => (
                  <li key={device.device} className="tnf-analytics-devices__row">
                    <span className="tnf-analytics-devices__icon" style={{ background: deviceColors[i % deviceColors.length] }} />
                    <span>{device.device}</span>
                    <div className="tnf-analytics-list__bar">
                      <span style={{ width: `${device.percent}%`, background: deviceColors[i % deviceColors.length] }} />
                    </div>
                    <strong>{device.percent}%</strong>
                    <span className="tnf-analytics-devices__raw">{device.count}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </>
      ) : null}
    </div>
  );
}
