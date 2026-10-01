import { useHomeSensors } from './useHomeSensors.jsx';
import { AqiCard } from './AqiCard.jsx';
import { LocationList } from './LocationList.jsx';
import { PageHeader } from '../../components/PageHeader.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';

export function HomeScreen() {
  const { t } = useLanguage();
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
        <PageHeader title={t('home.title')} subtitle={t('home.province')} />
        <p className="text-text-secondary">{t('common.loading')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-5 pt-6 md:px-7 md:pt-8">
        <PageHeader title={t('home.title')} subtitle={t('home.province')} />
        <p className="mb-4 p-3 rounded-xl bg-unhealthy-soft text-unhealthy text-sm">
          {t('common.error')}
        </p>
      </div>
    );
  }

  if (!selectedLocation) {
    return (
      <div className="px-5 pt-6 md:px-7 md:pt-8">
        <PageHeader title={t('home.title')} subtitle={t('home.province')} />
        <p className="text-text-secondary">{t('home.noData')}</p>
      </div>
    );
  }

  return (
    <div className="px-5 pt-6 md:px-7 md:pt-8">
      <PageHeader title={t('home.title')} subtitle={t('home.province')} />

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
