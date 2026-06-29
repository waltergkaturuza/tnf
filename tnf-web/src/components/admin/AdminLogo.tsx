export default function AdminLogo() {
  return (
    <div className="tnf-admin-logo">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/tnf-logo.png"
        alt="Tripartite Negotiating Forum"
        className="tnf-admin-logo__image"
        width={240}
        height={120}
      />
    </div>
  );
}
