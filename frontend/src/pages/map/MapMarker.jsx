import { Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { getAqiColor, getIndicatorPosition } from './formatAqi.jsx';

function createMarkerIcon(aqi) {
  const color = getAqiColor(aqi);

  return L.divIcon({
    className: 'relative !w-[38px] !h-[38px] !bg-transparent !border-none',
    html: `
      <div class="absolute inset-0 w-[38px] h-[38px] rounded-full opacity-20 z-[1]" style="background:${color}"></div>
      <div class="absolute left-1 top-1 w-[30px] h-[30px] flex items-center justify-center border-[3px] border-white text-[10px] rounded-full text-white font-extrabold leading-none tabular-nums shadow-[0_4px_12px_rgba(0,0,0,0.25)] z-[2]" style="background:${color}">${aqi}</div>
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
      className="absolute top-2.5 right-4 w-[26px] h-[26px] flex items-center justify-center border-none bg-transparent text-[22px] leading-none text-[#7d8798] hover:text-[#14171f] cursor-pointer z-20"
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
      <Popup
        className="sensor-popup [&_.leaflet-popup-content-wrapper]:!scale-[0.56] [&_.leaflet-popup-content-wrapper]:!origin-bottom [&_.leaflet-popup-content-wrapper]:!p-0 [&_.leaflet-popup-content-wrapper]:!overflow-hidden [&_.leaflet-popup-content-wrapper]:!rounded-[18px] [&_.leaflet-popup-content-wrapper]:!bg-white [&_.leaflet-popup-content-wrapper]:!shadow-[0_12px_28px_rgba(20,23,31,0.16)] [&_.leaflet-popup-content]:!w-[245px] [&_.leaflet-popup-content]:!min-w-[245px] [&_.leaflet-popup-content]:!m-0 [&_.leaflet-popup-tip]:!bg-white min-[421px]:[&_.leaflet-popup-content]:!w-[285px] min-[421px]:[&_.leaflet-popup-content]:!min-w-[285px]"
        maxWidth={285}
        closeButton={false}
      >
        <div className="relative p-3.5 sm:p-4 text-[#14171f]">
          <PopupCloseButton />

          <div className="flex items-center gap-2 pr-5">
            <div>
              <h3 className="m-0 text-[15px] font-bold leading-tight text-[#14171f]">
                {location.name}
              </h3>
              <p className="mt-0.5 text-[10px] text-[#9aa1ac]">
                {location.locationName}
              </p>
            </div>
          </div>

          <div className="w-full h-px my-2.5 bg-[#e7eaef]" />

          <div className="grid grid-cols-[76px_minmax(0,1fr)] sm:grid-cols-[95px_minmax(0,1fr)] gap-2.5 sm:gap-3.5 items-center">
            <div className="flex flex-col p-2 rounded-xl bg-[#f4f7f9]">
              <span className="text-[11px] text-[#28334a]">PM2.5</span>
              <strong
                className="my-0.5 text-[31px] sm:text-[36px] font-bold leading-none"
                style={{ color }}
              >
                {location.pm25}
              </strong>
              <span className="text-[9px] text-[#7d8798]">µg/m³</span>
            </div>

            <div className="min-w-0 flex flex-col justify-center">
              <span className="mb-0.5 text-[10px] font-semibold text-[#28334a]">
                คุณภาพอากาศ
              </span>
              <strong
                className="mb-2 text-base sm:text-lg font-bold leading-tight"
                style={{ color }}
              >
                {location.statusThai}
              </strong>

              <div className="relative w-full pt-1.5">
                <div className="w-full h-1.5 flex overflow-hidden rounded-full">
                  <span className="flex-1 bg-good" />
                  <span className="flex-1 bg-moderate" />
                  <span className="flex-1 bg-unhealthy" />
                </div>
                <span
                  className="absolute top-1 w-3 h-3 -translate-x-1/2 border-2 border-solid rounded-full bg-white shadow-[0_1px_4px_rgba(0,0,0,0.18)] z-[2] before:content-[''] before:absolute before:left-1/2 before:-top-1.5 before:-translate-x-1/2 before:w-0 before:h-0 before:border-l-[3px] before:border-l-transparent before:border-r-[3px] before:border-r-transparent before:border-b-[5px] before:border-b-current"
                  style={{
                    left: `${indicatorPosition}%`,
                    borderColor: color,
                    color: color,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3.5 mt-2.5 pt-2 border-t border-[#e7eaef]">
            <div className="flex-1 flex flex-col">
              <span className="text-[9px] text-[#9aa1ac]">อุณหภูมิ</span>
              <strong className="mt-px text-xs text-[#14171f]">
                {location.temperature}°C
              </strong>
            </div>
            <div className="flex-1 flex flex-col">
              <span className="text-[9px] text-[#9aa1ac]">ความชื้น</span>
              <strong className="mt-px text-xs text-[#14171f]">
                {location.humidity}%
              </strong>
            </div>
          </div>

          <p className="my-2.5 text-[9px] text-[#7d8798]">
            อัปเดตล่าสุด {location.updated}
          </p>

          <button
            type="button"
            className="w-full block py-2 px-2.5 border-none rounded-lg bg-brand text-white text-[11px] font-bold cursor-pointer active:opacity-85 active:scale-[0.98]"
            onClick={onGoHome}
          >
            ดูรายละเอียดใน My Air
          </button>
        </div>
      </Popup>
    </Marker>
  );
}
