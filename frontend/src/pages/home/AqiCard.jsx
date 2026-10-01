import { useLanguage } from '../../context/LanguageContext.jsx';
import { formatUpdatedTime } from '../../utils/air.js';

const LEVEL_GRADIENTS = {
  good: 'bg-gradient-to-br from-[#34c759] to-[#2fbf71]',
  moderate: 'bg-gradient-to-br from-[#ffb340] to-[#f5a623]',
  'unhealthy-sensitive': 'bg-gradient-to-br from-[#ff9f43] to-[#ff7b00]',
  unhealthy: 'bg-gradient-to-br from-[#ff5a5f] to-[#e5484d]',
  'very-unhealthy': 'bg-gradient-to-br from-[#b070ff] to-[#8f44fd]',
};

export function AqiCard({ location }) {
  const { t, language } = useLanguage();

  if (!location) return null;

  const bgGradient = LEVEL_GRADIENTS[location.level] || LEVEL_GRADIENTS.good;
  const statusDisplay = t(location.statusKey || `status.${location.level}`);
  const updatedDisplay = location.createdAt
    ? formatUpdatedTime(location.createdAt, language === 'th' ? 'th-TH' : 'en-GB')
    : '-';

  return (
    <section
      className={`mb-5 p-7 md:p-8 rounded-[20px] text-white shadow-2xl ${bgGradient}`}
      aria-label="Current air quality"
    >
      <p className="mb-2 text-sm font-semibold tracking-wider uppercase opacity-85">
        {t('home.airQuality')}
      </p>

      <div className="flex justify-between items-end gap-5 mb-6">
        <div>
          <p className="mb-0 text-[80px] font-bold tracking-tight leading-none">
            {location.pm25}
          </p>
          <p className="mb-0 text-[28px] font-semibold tracking-tight">
            {statusDisplay}
          </p>
        </div>

        <div className="text-right">
          <p className="mb-1 text-[17px] font-semibold leading-snug">
            {location.name}
          </p>
          <p className="text-sm opacity-80">
            {t('common.updated')} {updatedDisplay}
          </p>
        </div>
      </div>
    </section>
  );
}
