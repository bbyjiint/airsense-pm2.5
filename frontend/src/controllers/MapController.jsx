// import { useEffect, useState } from 'react';
// import MapView from '../views/MapView.jsx';

// const API_URL =
//   import.meta.env.VITE_API_URL || 'http://localhost:3000';

// function getStatus(pm25) {
//   const value = Number(pm25);

//   if (value <= 49) return 'Good';
//   if (value <= 99) return 'Moderate';
//   return 'Unhealthy';
// }

// function formatUpdatedTime(createdAt) {
//   if (!createdAt) return '-';

//   return new Date(createdAt).toLocaleString('en-GB', {
//     day: '2-digit',
//     month: 'short',
//     hour: '2-digit',
//     minute: '2-digit',
//   });
// }

// function MapController({ onGoHome }) {
//   const [locations, setLocations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   async function loadLatestReadings() {
//     try {
//       setError('');

//       const response = await fetch(
//         `${API_URL}/api/readings/latest-all`
//       );

//       if (!response.ok) {
//         throw new Error('Could not load sensor data');
//       }

//       const readings = await response.json();

//       const formattedLocations = readings.map((reading) => ({
//         id: reading.device_id,
//         deviceCode: reading.device_code,
//         name: reading.name,
//         locationName: reading.location_name,

//         lat: Number(reading.latitude),
//         lng: Number(reading.longitude),

//         aqi: Number(reading.pm25),
//         pm25: Number(reading.pm25),
//         temperature: Number(reading.temperature),
//         humidity: Number(reading.humidity),

//         status: getStatus(reading.pm25),

//         updated: formatUpdatedTime(
//           reading.created_at
//         ),

//         createdAt: reading.created_at,
//       }));

//       setLocations(formattedLocations);

//     } catch (err) {
//       console.error(err);

//       setError(
//         'Unable to connect to the AirSense API.'
//       );

//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     loadLatestReadings();

//     const interval = setInterval(
//       loadLatestReadings,
//       5000
//     );

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <MapView
//       locations={locations}
//       loading={loading}
//       error={error}
//       onGoHome={onGoHome}
//     />
//   );
// }

// export default MapController;
import { useEffect, useState } from 'react';
import MapView from '../views/MapView.jsx';

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3000';

function getStatus(pm25) {
  const value = Number(pm25);

  if (value <= 49) {
    return {
      text: 'Good',
      textThai: 'ดี',
      level: 'good',
    };
  }

  if (value <= 99) {
    return {
      text: 'Moderate',
      textThai: 'ปานกลาง',
      level: 'moderate',
    };
  }

  return {
    text: 'Unhealthy',
    textThai: 'ไม่ดีต่อสุขภาพ',
    level: 'unhealthy',
  };
}

function formatUpdatedTime(createdAt) {
  if (!createdAt) return '-';

  return new Date(createdAt).toLocaleString('th-TH', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function MapController({ onGoHome }) {
  const [locations, setLocations] = useState([]);
  const [selectedLocationId, setSelectedLocationId] =
    useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadLatestReadings() {
    try {
      setError('');

      const response = await fetch(
        '/api/readings/latest-all'
      );

      if (!response.ok) {
        throw new Error('Could not load sensor data');
      }

      const readings = await response.json();

      const formattedLocations = readings.map((reading) => {
        const status = getStatus(reading.pm25);

        return {
          id: reading.device_id,

          deviceCode: reading.device_code,

          name: reading.name,
          locationName: reading.location_name,

          lat: Number(reading.latitude),
          lng: Number(reading.longitude),

          pm25: Number(reading.pm25),
          temperature: Number(reading.temperature),
          humidity: Number(reading.humidity),

          status: status.text,
          statusThai: status.textThai,
          level: status.level,

          updated: formatUpdatedTime(
            reading.created_at
          ),

          createdAt: reading.created_at,
        };
      });

      setLocations(formattedLocations);

      // keep current selection
      // but select first sensor initially
      setSelectedLocationId((currentId) => {
        if (
          currentId &&
          formattedLocations.some(
            (location) => location.id === currentId
          )
        ) {
          return currentId;
        }

        return formattedLocations[0]?.id || null;
      });

    } catch (err) {
      console.error(err);

      setError(
        'Unable to connect to the AirSense API.'
      );

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLatestReadings();

    const interval = setInterval(
      loadLatestReadings,
      15000
    );

    return () => clearInterval(interval);
  }, []);

  const selectedLocation =
    locations.find(
      (location) =>
        location.id === selectedLocationId
    ) || null;

  function handleSelectLocation(id) {
    setSelectedLocationId(id);
  }

  function handleClosePopup() {
    setSelectedLocationId(null);
  }

  return (
    <MapView
      locations={locations}
      selectedLocation={selectedLocation}
      loading={loading}
      error={error}
      onSelectLocation={handleSelectLocation}
      onClosePopup={handleClosePopup}
      onGoHome={onGoHome}
    />
  );
}

export default MapController;