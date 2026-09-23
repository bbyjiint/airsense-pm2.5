export function AqiCard({ location }) {
  if (!location) return null;

  return (
    <section
      className={`aqi-card aqi-card--${location.level}`}
      aria-label="Current air quality"
    >
      <p className="aqi-card__label">Air Quality</p>
      <p className="aqi-card__value">{location.pm25}</p>
      <p className="aqi-card__status">{location.status}</p>

      <div className="aqi-card__meta">
        <p className="aqi-card__location">{location.name}</p>
        <p className="aqi-card__updated">Updated {location.updated}</p>
      </div>
    </section>
  );
}
