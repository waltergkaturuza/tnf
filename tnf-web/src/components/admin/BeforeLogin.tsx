const FEATURES = [
  "News and events",
  "Media library",
  "Partners and resources",
  "Form submissions",
];

export default function BeforeLogin() {
  return (
    <div className="tnf-admin-login-intro">
      <p className="tnf-admin-login-eyebrow">Tripartite Negotiating Forum</p>
      <h1 className="tnf-admin-login-title">Content Manager</h1>
      <p className="tnf-admin-login-lede">
        Sign in to publish updates, upload media, and manage website content for tnfzim.com.
      </p>
      <ul className="tnf-admin-login-features">
        {FEATURES.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
    </div>
  );
}
