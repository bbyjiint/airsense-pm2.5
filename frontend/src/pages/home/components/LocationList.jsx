export function LocationList({ locations, selectedLocationId, onSelectLocation }) {
  return (
    <section className="location-list" aria-label="Monitoring locations">
      <h2 className="location-list__title">All Locations</h2>

      <div className="location-list__grid">
        {locations.map((location) => {
          const selected = location.id === selectedLocationId;

          return (
            <button
              key={location.id}
              type="button"
              className={`location-card location-card--${location.level}${
                selected ? ' location-card--selected' : ''
              }`}
              onClick={() => onSelectLocation(location.id)}
              aria-pressed={selected}
            >
              <div className="location-card__main">
                <h3 className="location-card__name">{location.name}</h3>
                <p className="location-card__updated">
                  Updated {location.updated}
                </p>
              </div>

              <div className="location-card__aqi">
                <span className="location-card__value">{location.pm25}</span>
                <span className="location-card__status">{location.status}</span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
