import { useState, useEffect } from 'react';
import { API_URL, getAqiStatus, formatUpdatedTime } from '../../utils/air.js';

export function useHomeSensors(pollingInterval = 5000) {
  const [locations, setLocations] = useState([]);
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadLatestReadings() {
    try {
      setError('');
      const response = await fetch(`${API_URL}/api/readings/latest-all`);

      if (!response.ok) {
        throw new Error('Could not load sensor data');
      }

      const readings = await response.json();

      const formattedLocations = readings.map((reading) => {
        const status = getAqiStatus(reading.pm25);
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
          level: status.level,
          statusKey: status.statusKey,
          createdAt: reading.created_at,
        };
      });

      setLocations(formattedLocations);

      setSelectedLocationId((prevId) => {
        if (prevId && formattedLocations.some((loc) => loc.id === prevId)) {
          return prevId;
        }
        return formattedLocations[0]?.id || null;
      });
    } catch (err) {
      console.error(err);
      setError('Unable to connect to the AirSense API.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLatestReadings();

    const interval = setInterval(loadLatestReadings, pollingInterval);
    return () => clearInterval(interval);
  }, [pollingInterval]);

  const selectedLocation =
    locations.find((loc) => loc.id === selectedLocationId) ||
    locations[0] ||
    null;

  return {
    locations,
    selectedLocation,
    selectedLocationId,
    setSelectedLocationId,
    loading,
    error,
    reload: loadLatestReadings,
  };
}
