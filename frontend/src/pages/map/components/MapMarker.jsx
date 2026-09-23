import { Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { getAqiColor, getIndicatorPosition } from '../utils/formatAqi.js';

function createMarkerIcon(aqi) {
  const color = getAqiColor(aqi);

  return L.divIcon({
    className: 'sensor-marker',
    html: `
      <div class="sensor-marker__pulse" style="background:${color}"></div>
      <div class="sensor-marker__dot" style="background:${color}">${aqi}</div>
    `,
    iconSize: [38, 38],
    iconAnchor: [19, 19],
    popupAnchor: [0, -19],
  });
}

function PopupCloseButton() {
  const map = useMap();

  return (
    <button
      type="button"
      className="sensor-popup__custom-close"
      onClick={(event) => {
        event.stopPropagation();
        map.closePopup();
      }}
      aria-label="Close popup"
    >
      ×
    </button>
  );
}

export function MapMarker({ location, onGoHome }) {
  const color = getAqiColor(location.pm25);
  const indicatorPosition = getIndicatorPosition(location.pm25);

  return (
    <Marker
      position={[location.lat, location.lng]}
      icon={createMarkerIcon(location.pm25)}
    >
      <Popup className="sensor-popup" maxWidth={260} closeButton={false}>
        <div className="sensor-popup__content">
          <PopupCloseButton />

          <div className="sensor-popup__header">
            <div>
              <h3 className="sensor-popup__name">{location.name}</h3>
              <p className="sensor-popup__location">{location.locationName}</p>
            </div>
          </div>

          <div className="sensor-popup__divider" />

          <div className="sensor-popup__body">
            <div className="sensor-popup__pm-card">
              <span className="sensor-popup__pm-label">PM2.5</span>
              <strong className="sensor-popup__pm-value" style={{ color }}>
                {location.pm25}
              </strong>
              <span className="sensor-popup__pm-unit">µg/m³</span>
            </div>

            <div className="sensor-popup__quality">
              <span className="sensor-popup__quality-label">คุณภาพอากาศ</span>
              <strong className="sensor-popup__quality-text" style={{ color }}>
                {location.statusThai}
              </strong>

              <div className="sensor-popup__scale-wrap">
                <div className="sensor-popup__scale">
                  <span className="scale-good" />
                  <span className="scale-moderate" />
                  <span className="scale-unhealthy" />
                </div>
                <span
                  className="sensor-popup__scale-indicator"
                  style={{
                    left: `${indicatorPosition}%`,
                    borderColor: color,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="sensor-popup__weather">
            <div>
              <span>อุณหภูมิ</span>
              <strong>{location.temperature}°C</strong>
            </div>
            <div>
              <span>ความชื้น</span>
              <strong>{location.humidity}%</strong>
            </div>
          </div>

          <p className="sensor-popup__updated">
            อัปเดตล่าสุด {location.updated}
          </p>

          <button
            type="button"
            className="sensor-popup__button"
            onClick={onGoHome}
          >
            ดูรายละเอียดใน My Air
          </button>
        </div>
      </Popup>
    </Marker>
  );
}
