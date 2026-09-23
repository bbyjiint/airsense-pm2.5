import { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';

import { useMapSensors } from './hooks/useMapSensors.js';
import { MapMarker } from './components/MapMarker.jsx';

function MapBounds({ locations }) {
  const map = useMap();

  useEffect(() => {
    if (locations.length === 0) return;

    if (locations.length === 1) {
      map.setView([locations[0].lat, locations[0].lng], 16);
      return;
    }

    const bounds = L.latLngBounds(locations.map((loc) => [loc.lat, loc.lng]));
    map.fitBounds(bounds, { padding: [48, 48], maxZoom: 14 });
  }, [locations, map]);

  return null;
}

export function MapScreen({ onGoHome }) {
  const { locations, loading, error } = useMapSensors();

  const center = useMemo(() => {
    if (locations.length === 0) return null;
    const avgLat = locations.reduce((sum, loc) => sum + loc.lat, 0) / locations.length;
    const avgLng = locations.reduce((sum, loc) => sum + loc.lng, 0) / locations.length;
    return [avgLat, avgLng];
  }, [locations]);

  return (
    <div className="page page--map">
      <header className="page__header page__header--compact">
        <p className="page__eyebrow">SAMUT SAKHON PROVINCE</p>
        <h1 className="page__title">แผนที่เซ็นเซอร์</h1>
      </header>

      {error && <p className="error-message">{error}</p>}
      {loading && <p>Loading sensor locations...</p>}

      {!loading && locations.length > 0 && (
        <div className="sensor-map">
          <MapContainer
            center={center}
            zoom={16}
            className="sensor-map__canvas"
            scrollWheelZoom
            zoomControl
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapBounds locations={locations} />

            {locations.map((location) => (
              <MapMarker
                key={location.id}
                location={location}
                onGoHome={onGoHome}
              />
            ))}
          </MapContainer>

          <div className="map-legend">
            <strong>PM2.5</strong>
            <span>
              <i className="legend-dot legend-dot--good" />
              0-49
            </span>
            <span>
              <i className="legend-dot legend-dot--moderate" />
              50-99
            </span>
            <span>
              <i className="legend-dot legend-dot--unhealthy" />
              100+
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default MapScreen;
