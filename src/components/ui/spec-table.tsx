export type Spec = { label: string; value: string };

export function SpecTable({ specs, className = "" }: { specs: Spec[]; className?: string }) {
  return (
    <dl className={className}>
      {specs.map((s) => (
        <div key={s.label} className="spec-row">
          <dt className="spec-label">{s.label}</dt>
          <dd className="spec-value">{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}
