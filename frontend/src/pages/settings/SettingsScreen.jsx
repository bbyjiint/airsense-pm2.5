import { useLanguage } from '../../context/LanguageContext.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLanguage,
  faPalette,
  faCheck,
  faSun,
  faMoon,
  faGear,
  faCircleInfo,
  faLock,
} from '@fortawesome/free-solid-svg-icons';

export function SettingsScreen() {
  const { language, setLanguage, t } = useLanguage();

  const languageOptions = [
    { id: 'th', label: 'ภาษาไทย', sublabel: 'Thai', flag: '🇹🇭' },
    { id: 'en', label: 'English', sublabel: 'อังกฤษ', flag: '🇺🇸' },
  ];

  const standardTiers = [
    { range: '0 - 12.0', statusKey: 'status.good', color: '#2FBF71', bgClass: 'bg-good' },
    { range: '12.1 - 35.4', statusKey: 'status.moderate', color: '#F5A623', bgClass: 'bg-moderate' },
    { range: '35.5 - 55.4', statusKey: 'status.unhealthy-sensitive', color: '#FF7B00', bgClass: 'bg-sensitive' },
    { range: '55.5 - 150.4', statusKey: 'status.unhealthy', color: '#E5484D', bgClass: 'bg-unhealthy' },
    { range: '150.5+', statusKey: 'status.very-unhealthy', color: '#8F44FD', bgClass: 'bg-very-unhealthy' },
  ];

  return (
    <div className="px-5 pt-6 md:px-7 md:pt-8 flex flex-col gap-6">
      <header className="mb-1">
        <p className="mb-1 text-[13px] font-semibold tracking-wider uppercase text-text-tertiary">
          {t('settings.subtitle')}
        </p>
        <h1 className="text-[32px] font-bold tracking-tight leading-tight">
          {t('settings.title')}
        </h1>
      </header>

      {/* Section 1: Language Selection */}
      <section className="p-5 rounded-2xl bg-white border border-divider shadow-sm" aria-label="Language settings">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-xl bg-brand-soft text-brand flex items-center justify-center">
            <FontAwesomeIcon icon={faLanguage} className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-text-primary">
              {t('settings.languageSection')}
            </h2>
            <p className="text-xs text-text-secondary">
              {t('settings.languageDesc')}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          {languageOptions.map((opt) => {
            const isSelected = language === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                className={`w-full flex items-center justify-between p-3.5 rounded-xl border-2 transition-all cursor-pointer text-left ${
                  isSelected
                    ? 'border-brand bg-brand-soft/40 shadow-sm'
                    : 'border-divider hover:border-gray-300 bg-white'
                }`}
                onClick={() => setLanguage(opt.id)}
                aria-pressed={isSelected}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl leading-none">{opt.flag}</span>
                  <div>
                    <p className={`text-sm font-bold ${isSelected ? 'text-brand' : 'text-text-primary'}`}>
                      {opt.label}
                    </p>
                    <p className="text-xs text-text-tertiary">{opt.sublabel}</p>
                  </div>
                </div>

                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors ${
                    isSelected
                      ? 'border-brand bg-brand text-white'
                      : 'border-divider bg-transparent'
                  }`}
                >
                  {isSelected && <FontAwesomeIcon icon={faCheck} className="w-3 h-3 text-xs" />}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Section 2: Theme Selection (Disabled with "Coming soon / ในอนาคต") */}
      <section className="p-5 rounded-2xl bg-white border border-divider shadow-sm opacity-85" aria-label="Theme settings">
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gray-100 text-text-secondary flex items-center justify-center">
              <FontAwesomeIcon icon={faPalette} className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-text-primary">
                  {t('settings.themeSection')}
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                  {t('settings.comingSoon')}
                </span>
              </div>
              <p className="text-xs text-text-secondary">
                {t('settings.themeDesc')}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4">
          <button
            type="button"
            disabled
            className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-divider bg-gray-50/80 text-text-tertiary cursor-not-allowed select-none opacity-60"
            aria-disabled="true"
          >
            <FontAwesomeIcon icon={faSun} className="w-5 h-5" />
            <span className="text-xs font-semibold">{t('settings.themeLight')}</span>
          </button>

          <button
            type="button"
            disabled
            className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-divider bg-gray-50/80 text-text-tertiary cursor-not-allowed select-none opacity-60"
            aria-disabled="true"
          >
            <FontAwesomeIcon icon={faMoon} className="w-5 h-5" />
            <span className="text-xs font-semibold">{t('settings.themeDark')}</span>
          </button>

          <button
            type="button"
            disabled
            className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-divider bg-gray-50/80 text-text-tertiary cursor-not-allowed select-none opacity-60"
            aria-disabled="true"
          >
            <FontAwesomeIcon icon={faGear} className="w-5 h-5" />
            <span className="text-xs font-semibold">{t('settings.themeSystem')}</span>
          </button>
        </div>

        <p className="mt-3 text-[11px] text-text-tertiary flex items-center gap-1.5">
          <FontAwesomeIcon icon={faLock} className="w-3 h-3" />
          {t('settings.themeComingSoonNotice')}
        </p>
      </section>

      {/* Section 3: Standard Info */}
      <section className="p-5 rounded-2xl bg-white border border-divider shadow-sm" aria-label="Standard reference">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <FontAwesomeIcon icon={faCircleInfo} className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-text-primary">
              {t('settings.aboutSection')}
            </h2>
            <p className="text-xs text-text-secondary">
              {t('settings.standardTitle')}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-divider">
          {standardTiers.map((tier) => (
            <div key={tier.range} className="flex items-center justify-between text-xs py-1">
              <div className="flex items-center gap-2.5">
                <span className={`w-3 h-3 rounded-full ${tier.bgClass} shrink-0 shadow-xs`} />
                <span className="font-semibold text-text-primary">
                  {t(tier.statusKey)}
                </span>
              </div>
              <span className="font-bold text-text-secondary tabular-nums">
                {tier.range} <span className="text-[10px] font-normal text-text-tertiary">µg/m³</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center py-2 text-xs text-text-tertiary">
        AirSense App · {t('settings.version')} 1.0.0
      </footer>
    </div>
  );
}

export default SettingsScreen;
