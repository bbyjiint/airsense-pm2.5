// import { useEffect, useMemo } from 'react';
// import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
// import L from 'leaflet';

// function getAqiColor(aqi) {
//   if (aqi <= 49) return '#2FBF71';
//   if (aqi <= 99) return '#F5A623';
//   return '#E5484D';
// }

// function createMarkerIcon(aqi) {
//   return L.divIcon({
//     className: 'sensor-marker',
//     html: `<span class="sensor-marker__dot" style="background-color:${getAqiColor(aqi)}"></span>`,
//     iconSize: [28, 28],
//     iconAnchor: [14, 14],
//     popupAnchor: [0, -16],
//   });
// }

// function MapBounds({ locations }) {
//   const map = useMap();

//   useEffect(() => {
//     if (locations.length === 0) return;

//     if (locations.length === 1) {
//       map.setView([locations[0].lat, locations[0].lng], 16);
//       return;
//     }

//     const bounds = L.latLngBounds(
//       locations.map((location) => [location.lat, location.lng])
//     );

//     map.fitBounds(bounds, { padding: [48, 48], maxZoom: 14 });
//   }, [locations, map]);

//   return null;
// }

// function MapView({ locations, loading, error, onGoHome }) {
//   const center = useMemo(() => {
//     if (locations.length === 0) return null;

//     const avgLat =
//       locations.reduce((sum, location) => sum + location.lat, 0) / locations.length;

//     const avgLng =
//       locations.reduce((sum, location) => sum + location.lng, 0) / locations.length;

//     return [avgLat, avgLng];
//   }, [locations]);

//   return (
//     <div className="page page--map">
//       <header className="page__header page__header--compact">
//         <p className="page__eyebrow">Samut Sakhon Province</p>
//         <h1 className="page__title">Sensor Map</h1>
//         <p className="page__subtitle">Sensor locations from the AirSense database.</p>
//       </header>

//       {error && <p className="error-message">{error}</p>}
//       {loading && <p>Loading sensor location...</p>}

//       {!loading && locations.length > 0 && (
//         <div className="sensor-map">
//           <MapContainer
//             center={center}
//             zoom={16}
//             className="sensor-map__canvas"
//             scrollWheelZoom
//             zoomControl
//           >
//             <TileLayer
//               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />

//             <MapBounds locations={locations} />

//             {locations.map((location) => (
//               <Marker
//                 key={location.id}
//                 position={[location.lat, location.lng]}
//                 icon={createMarkerIcon(location.pm25)}
//               >
//                 <Popup className="sensor-popup">
//                   <div className="sensor-popup__content">
//                     <h3 className="sensor-popup__name">{location.name}</h3>
//                     <p className="sensor-popup__aqi">
//                       PM2.5 <strong>{location.pm25}</strong>
//                     </p>
//                     <p className="sensor-popup__status">{location.status}</p>
//                     <p className="sensor-popup__updated">Updated {location.updated}</p>
//                     <button type="button" className="sensor-popup__button" onClick={onGoHome}>
//                       View in My Air
//                     </button>
//                   </div>
//                 </Popup>
//               </Marker>
//             ))}
//           </MapContainer>
//         </div>
//       )}
//     </div>
//   );
// }

// export default MapView;
import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

import L from "leaflet";

// ========================================
// AQI COLOR
// ========================================

function getAqiColor(aqi) {
  if (aqi <= 49) return "#2FBF71";
  if (aqi <= 99) return "#F5A623";
  return "#E5484D";
}

// ========================================
// AQI THAI TEXT
// ========================================

function getAqiThai(status) {
  if (status === "Good") return "ดี";
  if (status === "Moderate") return "ปานกลาง";
  return "ไม่ดีต่อสุขภาพ";
}

// ========================================
// AQI INDICATOR POSITION
// ========================================

function getIndicatorPosition(pm25) {
  const value = Number(pm25);

  if (value <= 49) {
    return Math.max(8, (value / 49) * 33);
  }

  if (value <= 99) {
    return 33 + ((value - 50) / 49) * 33;
  }

  return Math.min(92, 66 + ((value - 100) / 100) * 34);
}

// ========================================
// CUSTOM MARKER WITH PM2.5 NUMBER
// ========================================

function createMarkerIcon(aqi) {
  const color = getAqiColor(aqi);

  return L.divIcon({
    className: "sensor-marker",

    html: `
      <div
        class="sensor-marker__pulse"
        style="background:${color}"
      ></div>

      <div
        class="sensor-marker__dot"
        style="background:${color}"
      >
        ${aqi}
      </div>
    `,

    iconSize: [38, 38],
    iconAnchor: [19, 19],
    popupAnchor: [0, -19],
  });
}

// ========================================
// AUTO MAP BOUNDS
// ========================================

function MapBounds({ locations }) {
  const map = useMap();

  useEffect(() => {
    if (locations.length === 0) {
      return;
    }

    if (locations.length === 1) {
      map.setView([locations[0].lat, locations[0].lng], 16);

      return;
    }

    const bounds = L.latLngBounds(
      locations.map((location) => [location.lat, location.lng]),
    );

    map.fitBounds(bounds, {
      padding: [48, 48],
      maxZoom: 14,
    });
  }, [locations, map]);

  return null;
}
/*close btn */
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

// MAP VIEW


function MapView({ locations, loading, error, onGoHome }) {
  const center = useMemo(() => {
    if (locations.length === 0) {
      return null;
    }

    const avgLat =
      locations.reduce((sum, location) => sum + location.lat, 0) /
      locations.length;

    const avgLng =
      locations.reduce((sum, location) => sum + location.lng, 0) /
      locations.length;

    return [avgLat, avgLng];
  }, [locations]);

  return (
    <div className="page page--map">
      {/* ========================================
          HEADER
      ======================================== */}

      <header className="page__header page__header--compact">
        <p className="page__eyebrow">SAMUT SAKHON PROVINCE</p>

        <h1 className="page__title">แผนที่เซ็นเซอร์</h1>

        {/* <p className="page__subtitle">ตำแหน่งเซ็นเซอร์จากฐานข้อมูล AirSense</p> */}
      </header>

      {/* ========================================
          ERROR
      ======================================== */}

      {error && <p className="error-message">{error}</p>}

      {/* ========================================
          LOADING
      ======================================== */}

      {loading && <p>Loading sensor locations...</p>}

      {/* ========================================
          MAP
      ======================================== */}

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

            {/* ========================================
                SENSOR MARKERS
            ======================================== */}

            {locations.map((location) => {
              const color = getAqiColor(location.pm25);

              const indicatorPosition = getIndicatorPosition(location.pm25);

              return (
                <Marker
                  key={location.id}
                  position={[location.lat, location.lng]}
                  icon={createMarkerIcon(location.pm25)}
                >
                  {/* ========================================
                      POPUP
                  ======================================== */}

                  <Popup
                    className="sensor-popup"
                    maxWidth={260}
                    closeButton={false}
                  >
                    <div className="sensor-popup__content">
                      <PopupCloseButton />
                      {/* ========================================
                          POPUP HEADER
                      ======================================== */}

                      <div className="sensor-popup__header">
                        <div>
                          <h3 className="sensor-popup__name">
                            {location.name}
                          </h3>

                          <p className="sensor-popup__location">
                            {location.locationName}
                          </p>
                        </div>
                      </div>

                      <div className="sensor-popup__divider" />

                      {/* ========================================
                          PM2.5 + STATUS
                      ======================================== */}

                      <div className="sensor-popup__body">
                        {/* PM2.5 CARD */}

                        <div className="sensor-popup__pm-card">
                          <span className="sensor-popup__pm-label">PM2.5</span>

                          <strong
                            className="sensor-popup__pm-value"
                            style={{
                              color: color,
                            }}
                          >
                            {location.pm25}
                          </strong>

                          <span className="sensor-popup__pm-unit">µg/m³</span>
                        </div>

                        {/* QUALITY */}

                        <div className="sensor-popup__quality">
                          <span className="sensor-popup__quality-label">
                            คุณภาพอากาศ
                          </span>

                          <strong
                            className="sensor-popup__quality-text"
                            style={{
                              color: color,
                            }}
                          >
                            {getAqiThai(location.status)}
                          </strong>

                          {/* ========================================
                              AQI SCALE
                          ======================================== */}

                          <div className="sensor-popup__scale-wrap">
                            <div className="sensor-popup__scale">
                              <span className="scale-good" />

                              <span className="scale-moderate" />

                              <span className="scale-unhealthy" />
                            </div>

                            {/* MOVING INDICATOR */}

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

                      {/* ========================================
                          TEMPERATURE / HUMIDITY
                      ======================================== */}

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

                      {/* ========================================
                          UPDATED
                      ======================================== */}

                      <p className="sensor-popup__updated">
                        อัปเดตล่าสุด {location.updated}
                      </p>

                      {/* ========================================
                          BUTTON
                      ======================================== */}

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
            })}
          </MapContainer>

          {/* ========================================
              LEGEND
          ======================================== */}

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

export default MapView;
