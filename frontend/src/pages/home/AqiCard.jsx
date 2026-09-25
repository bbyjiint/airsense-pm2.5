const LEVEL_GRADIENTS = {
  good: 'bg-gradient-to-br from-[#34c759] to-[#2fbf71]',
  moderate: 'bg-gradient-to-br from-[#ffb340] to-[#f5a623]',
  unhealthy: 'bg-gradient-to-br from-[#ff5a5f] to-[#e5484d]',
};

export function AqiCard({ location }) {
  if (!location) return null;

  const bgGradient = LEVEL_GRADIENTS[location.level] || LEVEL_GRADIENTS.good;

  return (
    <section
      className={`aqi-card aqi-card--${location.level} mb-5 p-7 md:p-8 rounded-[20px] text-white shadow-2xl ${bgGradient}`}
      aria-label="Current air quality"
    >
      <p className="aqi-card__label mb-2 text-sm font-semibold tracking-wider uppercase opacity-85">
        Air Quality
      </p>

      <div className="aqi-card__body-wrapper flex justify-between items-end gap-5 mb-6">
        <div>
          <p className="aqi-card__value mb-0 text-[80px] font-bold tracking-tight leading-none">
            {location.pm25}
          </p>
          <p className="aqi-card__status mb-0 text-[28px] font-semibold tracking-tight">
            {location.status}
          </p>
        </div>

        <div className="aqi-card__meta text-right">
          <p className="aqi-card__location mb-1 text-[17px] font-semibold leading-snug">
            {location.name}
          </p>
          <p className="aqi-card__updated text-sm opacity-80">
            Updated {location.updated}
          </p>
        </div>
      </div>
    </section>
  );
}
