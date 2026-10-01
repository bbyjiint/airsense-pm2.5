import { useState } from 'react';
import { HomeScreen } from './pages/home/HomeScreen.jsx';
import { MapScreen } from './pages/map/MapScreen.jsx';
import { SettingsScreen } from './pages/settings/SettingsScreen.jsx';
import { LanguageProvider, useLanguage } from './context/LanguageContext.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWind, faGear } from '@fortawesome/free-solid-svg-icons';
import { faMap } from '@fortawesome/free-regular-svg-icons';

function AppContent() {
  const [activeScreen, setActiveScreen] = useState('home');
  const { t } = useLanguage();

  function renderScreen() {
    if (activeScreen === 'map') {
      return <MapScreen onGoHome={() => setActiveScreen('home')} />;
    }

    if (activeScreen === 'settings') {
      return <SettingsScreen />;
    }

    return <HomeScreen />;
  }

  return (
    <div className="min-h-screen flex flex-col max-w-[480px] mx-auto bg-bg-app md:max-w-[520px] md:border-x md:border-divider md:shadow-2xl">
      <main className="flex-1 overflow-y-auto pb-[calc(var(--nav-height)+var(--safe-bottom)+16px)]">
        {renderScreen()}
      </main>

      <nav
        className="fixed left-1/2 -translate-x-1/2 bottom-0 w-full max-w-[480px] md:max-w-[520px] flex pb-[var(--safe-bottom)] border-t border-divider bg-white/90 backdrop-blur-xl z-[2000]"
        aria-label="Main navigation"
      >
        <button
          type="button"
          className={`flex-1 min-h-[var(--nav-height)] flex flex-col items-center justify-center gap-1 py-3 px-2 transition-all active:scale-95 cursor-pointer ${
            activeScreen === 'home'
              ? 'text-brand'
              : 'text-text-tertiary'
          }`}
          onClick={() => setActiveScreen('home')}
        >
          <FontAwesomeIcon icon={faWind} className="w-5 h-5 text-xl" />
          <span className="text-xs font-semibold">{t('nav.myAir')}</span>
        </button>

        <button
          type="button"
          className={`flex-1 min-h-[var(--nav-height)] flex flex-col items-center justify-center gap-1 py-3 px-2 transition-all active:scale-95 cursor-pointer ${
            activeScreen === 'map'
              ? 'text-brand'
              : 'text-text-tertiary'
          }`}
          onClick={() => setActiveScreen('map')}
        >
          <FontAwesomeIcon icon={faMap} className="w-5 h-5 text-xl" />
          <span className="text-xs font-semibold">{t('nav.map')}</span>
        </button>

        <button
          type="button"
          className={`flex-1 min-h-[var(--nav-height)] flex flex-col items-center justify-center gap-1 py-3 px-2 transition-all active:scale-95 cursor-pointer ${
            activeScreen === 'settings'
              ? 'text-brand'
              : 'text-text-tertiary'
          }`}
          onClick={() => setActiveScreen('settings')}
        >
          <FontAwesomeIcon icon={faGear} className="w-5 h-5 text-xl" />
          <span className="text-xs font-semibold">{t('nav.settings')}</span>
        </button>
      </nav>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
