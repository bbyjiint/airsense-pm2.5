import { useHomeSensors } from './useHomeSensors.jsx';
import { AqiCard } from './AqiCard.jsx';
import { LocationList } from './LocationList.jsx';

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
      <div className="px-5 pt-6 md:px-7 md:pt-8">
        <header className="mb-6">
          <p className="mb-1 text-[13px] font-semibold tracking-wider uppercase text-text-tertiary">
            Samut Sakhon Province
          </p>
          <h1 className="text-[32px] font-bold tracking-tight leading-tight">
            My Air
          </h1>
        </header>
        <p className="text-text-secondary">Loading sensor data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-5 pt-6 md:px-7 md:pt-8">
        <header className="mb-6">
          <p className="mb-1 text-[13px] font-semibold tracking-wider uppercase text-text-tertiary">
            Samut Sakhon Province
          </p>
          <h1 className="text-[32px] font-bold tracking-tight leading-tight">
            My Air
          </h1>
        </header>
        <p className="mb-4 p-3 rounded-xl bg-unhealthy-soft text-unhealthy text-sm">
          {error}
        </p>
      </div>
    );
  }

  if (!selectedLocation) {
    return (
      <div className="px-5 pt-6 md:px-7 md:pt-8">
        <header className="mb-6">
          <p className="mb-1 text-[13px] font-semibold tracking-wider uppercase text-text-tertiary">
            Samut Sakhon Province
          </p>
          <h1 className="text-[32px] font-bold tracking-tight leading-tight">
            My Air
          </h1>
        </header>
        <p className="text-text-secondary">No sensor data found.</p>
      </div>
    );
  }

  return (
    <div className="px-5 pt-6 md:px-7 md:pt-8">
      <header className="mb-6">
        <p className="mb-1 text-[13px] font-semibold tracking-wider uppercase text-text-tertiary">
          Samut Sakhon Province
        </p>
        <h1 className="text-[32px] font-bold tracking-tight leading-tight">
          My Air
        </h1>
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
