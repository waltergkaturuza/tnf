"use client";

import { useState } from "react";
import { submitToPayload } from "@/lib/submit-form";

type NewsletterFormProps = {
  variant?: "banner" | "footer";
};

export function NewsletterForm({ variant = "banner" }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const result = await submitToPayload({
      type: "newsletter",
      email: email.trim(),
      name: email.trim(),
      subject: "Newsletter subscription",
      message: "Newsletter subscription request from the website.",
      category: "newsletter",
    });

    if (!result.ok) {
      setStatus("error");
      setError(result.error || "Subscription failed. Please try again.");
      return;
    }

    setStatus("success");
    setEmail("");
  };

  const isFooter = variant === "footer";

  return (
    <div
      className={
        isFooter
          ? "mt-6 rounded-xl border border-white/20 bg-white/5 p-4"
          : "mx-auto max-w-xl rounded-xl border border-white/20 bg-white/5 p-6"
      }
    >
      <h4 className="font-semibold text-white">Stay informed</h4>
      <p className="mt-2 text-sm text-slate-300">
        Get weekly updates, policy briefs, and event invitations in your inbox.
      </p>
      {!isFooter && (
        <ul className="mt-3 space-y-1 text-sm text-slate-300">
          <li>• Latest TNF news and announcements</li>
          <li>• Upcoming events and dialogues</li>
          <li>• New reports and publications</li>
        </ul>
      )}
      {status === "success" ? (
        <p className="mt-4 text-sm font-medium text-green-400">Thank you for subscribing!</p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className={isFooter ? "mt-3 flex flex-col gap-2" : "mt-4 flex gap-2"}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            required
            disabled={status === "loading"}
            className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-white placeholder-slate-400 outline-none focus:border-tnf-green"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="btn-tnf-primary rounded-lg px-4 py-2.5 text-sm font-semibold"
          >
            {status === "loading" ? "..." : "Subscribe"}
          </button>
        </form>
      )}
      {status === "error" && error && (
        <p className="mt-2 text-sm text-red-300">{error}</p>
      )}
    </div>
  );
}
