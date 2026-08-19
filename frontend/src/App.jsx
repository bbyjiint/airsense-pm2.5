import { useState } from 'react';

import HomeController from './controllers/HomeController.jsx';
import MapController from './controllers/MapController.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWind } from '@fortawesome/free-solid-svg-icons';
import { faMap } from '@fortawesome/free-regular-svg-icons';


function App() {
  const [activeScreen, setActiveScreen] = useState('home');

  function renderScreen() {
    if (activeScreen === 'map') {
      return (
        <MapController
          onGoHome={() => setActiveScreen('home')}
        />
      );
    }

    return <HomeController />;
  }

  return (
    <div className="app">

      <main className="app__content">
        {renderScreen()}
      </main>

      <nav
        className="bottom-nav"
        aria-label="Main navigation"
      >

        <button
          type="button"
          className={`bottom-nav__item${
            activeScreen === 'home'
              ? ' bottom-nav__item--active'
              : ''
          }`}
          onClick={() => setActiveScreen('home')}
        >
          <FontAwesomeIcon
            icon={faWind}
            className="bottom-nav__icon"
          />

          <span className="bottom-nav__label">
            My Air
          </span>
        </button>


        <button
          type="button"
          className={`bottom-nav__item${
            activeScreen === 'map'
              ? ' bottom-nav__item--active'
              : ''
          }`}
          onClick={() => setActiveScreen('map')}
        >
          <FontAwesomeIcon
            icon={faMap}
            className="bottom-nav__icon"
          />

          <span className="bottom-nav__label">
            Map
          </span>
        </button>

      </nav>
    </div>
  );
}

export default App;