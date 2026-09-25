import { useState } from 'react';
import { HomeScreen } from './pages/home/HomeScreen.jsx';
import { MapScreen } from './pages/map/MapScreen.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWind } from '@fortawesome/free-solid-svg-icons';
import { faMap } from '@fortawesome/free-regular-svg-icons';

function App() {
  const [activeScreen, setActiveScreen] = useState('home');

  function renderScreen() {
    if (activeScreen === 'map') {
      return <MapScreen onGoHome={() => setActiveScreen('home')} />;
    }

    return <HomeScreen />;
  }

  return (
    <div className="app min-h-screen flex flex-col max-w-[480px] mx-auto bg-bg-app md:max-w-[520px] md:border-x md:border-divider md:shadow-2xl">
      <main className="app__content flex-1 overflow-y-auto pb-[calc(var(--nav-height)+var(--safe-bottom)+16px)]">
        {renderScreen()}
      </main>

      <nav
        className="bottom-nav fixed left-1/2 -translate-x-1/2 bottom-0 w-full max-w-[480px] md:max-w-[520px] flex pb-[var(--safe-bottom)] border-t border-divider bg-white/90 backdrop-blur-xl z-[2000]"
        aria-label="Main navigation"
      >
        <button
          type="button"
          className={`bottom-nav__item flex-1 min-h-[var(--nav-height)] flex flex-col items-center justify-center gap-1 py-3 px-2 transition-all active:scale-95 ${
            activeScreen === 'home'
              ? 'bottom-nav__item--active text-brand'
              : 'text-text-tertiary'
          }`}
          onClick={() => setActiveScreen('home')}
        >
          <FontAwesomeIcon icon={faWind} className="bottom-nav__icon w-6 h-6 text-2xl" />
          <span className="bottom-nav__label text-xs font-semibold">My Air</span>
        </button>

        <button
          type="button"
          className={`bottom-nav__item flex-1 min-h-[var(--nav-height)] flex flex-col items-center justify-center gap-1 py-3 px-2 transition-all active:scale-95 ${
            activeScreen === 'map'
              ? 'bottom-nav__item--active text-brand'
              : 'text-text-tertiary'
          }`}
          onClick={() => setActiveScreen('map')}
        >
          <FontAwesomeIcon icon={faMap} className="bottom-nav__icon w-6 h-6 text-2xl" />
          <span className="bottom-nav__label text-xs font-semibold">Map</span>
        </button>
      </nav>
    </div>
  );
}

export default App;
