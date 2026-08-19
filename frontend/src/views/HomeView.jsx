function getAqiLevel(aqi) {
  if (aqi <= 49) return 'good';
  if (aqi <= 99) return 'moderate';
  return 'unhealthy';
}

function HomeView({
  locations,
  selectedLocation,
  selectedLocationId,
  loading,
  error,
  onSelectLocation,
}) {
  if (loading) {
    return (
      <div className="page page--my-air">
        <header className="page__header">
          <p className="page__eyebrow">Samut Sakhon Province</p>
          <h1 className="page__title">My Air</h1>
        </header>
        <p>Loading sensor data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page page--my-air">
        <header className="page__header">
          <p className="page__eyebrow">Samut Sakhon Province</p>
          <h1 className="page__title">My Air</h1>
        </header>
        <p className="error-message">{error}</p>
      </div>
    );
  }

  if (!selectedLocation) {
    return (
      <div className="page page--my-air">
        <header className="page__header">
          <p className="page__eyebrow">Samut Sakhon Province</p>
          <h1 className="page__title">My Air</h1>
        </header>
        <p>No sensor data found.</p>
      </div>
    );
  }

  const level = getAqiLevel(selectedLocation.aqi);

  return (
    <div className="page page--my-air">
      <header className="page__header">
        <p className="page__eyebrow">Samut Sakhon Province</p>
        <h1 className="page__title">My Air</h1>
      </header>

      <section className={`aqi-card aqi-card--${level}`} aria-label="Current air quality">
        <p className="aqi-card__label">Air Quality</p>
        <p className="aqi-card__value">{selectedLocation.pm25}</p>
        <p className="aqi-card__status">{selectedLocation.status}</p>

        <div className="aqi-card__meta">
          <p className="aqi-card__location">{selectedLocation.name}</p>
          <p className="aqi-card__updated">Updated {selectedLocation.updated}</p>
        </div>
      </section>

      <section className="location-list" aria-label="Monitoring locations">
        <h2 className="location-list__title">All Locations</h2>

        <div className="location-list__grid">
          {locations.map((location) => {
            const locationLevel = getAqiLevel(location.aqi);
            const selected = location.id === selectedLocationId;

            return (
              <button
                key={location.id}
                type="button"
                className={`location-card location-card--${locationLevel}${
                  selected ? ' location-card--selected' : ''
                }`}
                onClick={() => onSelectLocation(location.id)}
                aria-pressed={selected}
              >
                <div className="location-card__main">
                  <h3 className="location-card__name">{location.name}</h3>
                  <p className="location-card__updated">Updated {location.updated}</p>
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
    </div>
  );
}

export default HomeView;
