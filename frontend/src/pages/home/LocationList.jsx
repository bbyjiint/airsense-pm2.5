const LEVEL_VALUE_COLORS = {
  good: 'text-good',
  moderate: 'text-moderate',
  unhealthy: 'text-unhealthy',
};

export function LocationList({ locations, selectedLocationId, onSelectLocation }) {
  return (
    <section className="mb-6" aria-label="Monitoring locations">
      <h2 className="mb-3.5 text-xl font-bold tracking-tight">
        All Locations
      </h2>

      <div className="flex flex-col gap-2.5">
        {locations.map((location) => {
          const selected = location.id === selectedLocationId;
          const valueColorClass = LEVEL_VALUE_COLORS[location.level] || 'text-text-primary';

          return (
            <button
              key={location.id}
              type="button"
              className={`w-full min-h-[76px] flex items-center justify-between gap-4 p-4 md:p-5 text-left border-2 rounded-2xl bg-white shadow-sm transition-all duration-150 active:scale-[0.985] ${
                selected
                  ? 'border-brand shadow-md'
                  : 'border-transparent'
              }`}
              onClick={() => onSelectLocation(location.id)}
              aria-pressed={selected}
            >
              <div className="flex-1 min-w-0">
                <h3 className="mb-1 text-base font-semibold leading-snug truncate">
                  {location.name}
                </h3>
                <p className="text-[13px] text-text-tertiary">
                  Updated {location.updated}
                </p>
              </div>

              <div className="flex flex-col items-end shrink-0">
                <span className={`text-2xl md:text-[28px] font-bold tracking-tight leading-none tabular-nums ${valueColorClass}`}>
                  {location.pm25}
                </span>
                <span className="mt-0.5 text-xs font-semibold text-text-secondary">
                  {location.status}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
