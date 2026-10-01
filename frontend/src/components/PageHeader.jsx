export function PageHeader({ title, subtitle, className = 'mb-6' }) {
  return (
    <header className={className}>
      {subtitle && (
        <p className="mb-1 text-[13px] font-semibold tracking-wider uppercase text-text-tertiary">
          {subtitle}
        </p>
      )}
      <h1 className="text-[32px] font-bold tracking-tight leading-tight text-text-primary">
        {title}
      </h1>
    </header>
  );
}

export default PageHeader;
