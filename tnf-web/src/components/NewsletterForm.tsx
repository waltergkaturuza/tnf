"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    // TODO: Wire to Payload form-submissions or email service
    await new Promise((r) => setTimeout(r, 500));
    setStatus("success");
    setEmail("");
  };

  return (
    <div className="rounded-xl border border-white/20 bg-white/5 p-6">
      <h4 className="font-semibold text-white">Stay informed</h4>
      <p className="mt-2 text-sm text-slate-300">
        Get weekly updates, policy briefs, and event invitations in your inbox.
      </p>
      <ul className="mt-3 space-y-1 text-sm text-slate-400">
        <li>• Latest TNF news and announcements</li>
        <li>• Upcoming events and dialogues</li>
        <li>• New reports and publications</li>
      </ul>
      {status === "success" ? (
        <p className="mt-4 text-sm font-medium text-green-400">Thank you for subscribing!</p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            required
            disabled={status === "loading"}
            className="flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-white placeholder-slate-400 outline-none focus:border-tnf-gold"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded-lg bg-tnf-gold px-4 py-2.5 text-sm font-semibold text-tnf-navy transition-colors hover:bg-tnf-gold-light disabled:opacity-50"
          >
            {status === "loading" ? "..." : "Subscribe"}
          </button>
        </form>
      )}
    </div>
  );
}
