import { useEffect, useState } from 'react';
import HomeView from '../views/HomeView.jsx';

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3000';

function getStatus(pm25) {
  const value = Number(pm25);

  if (value <= 49) return 'Good';
  if (value <= 99) return 'Moderate';
  return 'Unhealthy';
}

function formatUpdatedTime(createdAt) {
  if (!createdAt) return '-';

  return new Date(createdAt).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function HomeController() {
  const [locations, setLocations] = useState([]);
  const [selectedLocationId, setSelectedLocationId] = useState(null);
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

      const formattedLocations = readings.map((reading) => ({
        id: reading.device_id,
        deviceCode: reading.device_code,
        name: reading.name,
        locationName: reading.location_name,
        lat: Number(reading.latitude),
        lng: Number(reading.longitude),
        aqi: Number(reading.pm25),
        pm25: Number(reading.pm25),
        temperature: Number(reading.temperature),
        humidity: Number(reading.humidity),
        status: getStatus(reading.pm25),
        updated: formatUpdatedTime(reading.created_at),
        createdAt: reading.created_at,
      }));

      setLocations(formattedLocations);

      if (
        selectedLocationId === null &&
        formattedLocations.length > 0
      ) {
        setSelectedLocationId(formattedLocations[0].id);
      }

    } catch (err) {
      console.error(err);
      setError('Unable to connect to the AirSense API.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLatestReadings();

    const interval = setInterval(
      loadLatestReadings,
      5000
    );

    return () => clearInterval(interval);
  }, []);

  const selectedLocation =
    locations.find(
      (location) =>
        location.id === selectedLocationId
    ) ||
    locations[0] ||
    null;

  return (
    <HomeView
      locations={locations}
      selectedLocation={selectedLocation}
      selectedLocationId={selectedLocationId}
      loading={loading}
      error={error}
      onSelectLocation={setSelectedLocationId}
    />
  );
}

export default HomeController;