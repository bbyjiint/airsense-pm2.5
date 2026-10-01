import { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';

import { useMapSensors } from './useMapSensors.jsx';
import { MapMarker } from './MapMarker.jsx';
import { PageHeader } from '../../components/PageHeader.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';

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
  const navigate = useNavigate();
  const handleGoHome = onGoHome || (() => navigate('/'));
  const { t } = useLanguage();
  const { locations, loading, error } = useMapSensors();

  const center = useMemo(() => {
    if (locations.length === 0) return null;
    const avgLat = locations.reduce((sum, loc) => sum + loc.lat, 0) / locations.length;
    const avgLng = locations.reduce((sum, loc) => sum + loc.lng, 0) / locations.length;
    return [avgLat, avgLng];
  }, [locations]);

  return (
    <div className="px-5 pt-6 pb-0 md:px-7 md:pt-8 flex flex-col h-[calc(100vh-var(--nav-height)-var(--safe-bottom))] md:h-[calc(100vh-var(--nav-height)-var(--safe-bottom)-32px)]">
      <PageHeader
        title={t('map.title')}
        subtitle={t('map.province')}
        className="mb-4"
      />

      {error && (
        <p className="mb-4 p-3 rounded-xl bg-unhealthy-soft text-unhealthy text-sm">
          {t('common.error')}
        </p>
      )}
      {loading && <p className="text-text-secondary">{t('map.loadingLocations')}</p>}

      {!loading && locations.length > 0 && (
        <div className="relative flex-1 min-h-0 mb-2 overflow-hidden rounded-[20px] shadow-lg [&_.leaflet-container]:w-full [&_.leaflet-container]:h-full [&_.leaflet-control-zoom]:overflow-hidden [&_.leaflet-control-zoom]:!border-none [&_.leaflet-control-zoom]:!rounded-2xl [&_.leaflet-control-zoom]:!shadow-[0_4px_16px_rgba(20,23,31,0.16)] [&_.leaflet-control-zoom_a]:!w-[38px] [&_.leaflet-control-zoom_a]:!h-[38px] [&_.leaflet-control-zoom_a]:!flex [&_.leaflet-control-zoom_a]:!items-center [&_.leaflet-control-zoom_a]:!justify-center [&_.leaflet-control-zoom_a]:!leading-[38px] [&_.leaflet-control-zoom_a]:!text-text-primary">
          <MapContainer
            center={center}
            zoom={16}
            className="w-full h-full min-h-[420px] md:min-h-[480px] z-0"
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
                onGoHome={handleGoHome}
              />
            ))}
          </MapContainer>

          <div className="absolute right-3.5 bottom-3.5 flex items-center gap-2 py-2 px-3 rounded-full bg-white/95 shadow-md text-[10px] z-[1000] max-w-[calc(100%-28px)] overflow-x-auto">
            <strong className="text-[10px]">PM2.5</strong>
            <span className="flex items-center gap-1 whitespace-nowrap">
              <i className="w-2 h-2 rounded-full bg-good shrink-0" />
              0-12
            </span>
            <span className="flex items-center gap-1 whitespace-nowrap">
              <i className="w-2 h-2 rounded-full bg-moderate shrink-0" />
              12.1-35.4
            </span>
            <span className="flex items-center gap-1 whitespace-nowrap">
              <i className="w-2 h-2 rounded-full bg-sensitive shrink-0" />
              35.5-55.4
            </span>
            <span className="flex items-center gap-1 whitespace-nowrap">
              <i className="w-2 h-2 rounded-full bg-unhealthy shrink-0" />
              55.5-150.4
            </span>
            <span className="flex items-center gap-1 whitespace-nowrap">
              <i className="w-2 h-2 rounded-full bg-very-unhealthy shrink-0" />
              150.5+
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default MapScreen;
