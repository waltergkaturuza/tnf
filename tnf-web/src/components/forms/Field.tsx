import { formHintClass, formLabelClass } from "./form-styles";

export function Field({
  label,
  htmlFor,
  required,
  hint,
  className = "",
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className={formLabelClass}>
        {label}
        {required && <span className="text-tnf-green"> *</span>}
      </label>
      {hint && <p className={formHintClass}>{hint}</p>}
      {children}
    </div>
  );
}
