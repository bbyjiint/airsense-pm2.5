import { useHomeSensors } from './hooks/useHomeSensors.js';
import { AqiCard } from './components/AqiCard.jsx';
import { LocationList } from './components/LocationList.jsx';

export function HomeScreen() {
  const {
    locations,
    selectedLocation,
    selectedLocationId,
    setSelectedLocationId,
    loading,
    error,
  } = useHomeSensors();

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

  return (
    <div className="page page--my-air">
      <header className="page__header">
        <p className="page__eyebrow">Samut Sakhon Province</p>
        <h1 className="page__title">My Air</h1>
      </header>

      <AqiCard location={selectedLocation} />

      <LocationList
        locations={locations}
        selectedLocationId={selectedLocationId}
        onSelectLocation={setSelectedLocationId}
      />
    </div>
  );
}

export default HomeScreen;
