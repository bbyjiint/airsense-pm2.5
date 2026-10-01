import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWind, faGear } from '@fortawesome/free-solid-svg-icons';
import { faMap } from '@fortawesome/free-regular-svg-icons';
import { useLanguage } from '../context/LanguageContext.jsx';

export function BottomNav() {
  const { t } = useLanguage();

  return (
    <nav
      className="fixed left-1/2 -translate-x-1/2 bottom-0 w-full max-w-[480px] md:max-w-[520px] flex pb-[var(--safe-bottom)] border-t border-divider bg-white/90 backdrop-blur-xl z-[2000]"
      aria-label="Main navigation"
    >
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `flex-1 min-h-[var(--nav-height)] flex flex-col items-center justify-center gap-1 py-3 px-2 transition-all active:scale-95 cursor-pointer no-underline ${
            isActive ? 'text-brand' : 'text-text-tertiary hover:text-text-secondary'
          }`
        }
      >
        <FontAwesomeIcon icon={faWind} className="w-5 h-5 text-xl" />
        <span className="text-xs font-semibold">{t('nav.myAir')}</span>
      </NavLink>

      <NavLink
        to="/map"
        className={({ isActive }) =>
          `flex-1 min-h-[var(--nav-height)] flex flex-col items-center justify-center gap-1 py-3 px-2 transition-all active:scale-95 cursor-pointer no-underline ${
            isActive ? 'text-brand' : 'text-text-tertiary hover:text-text-secondary'
          }`
        }
      >
        <FontAwesomeIcon icon={faMap} className="w-5 h-5 text-xl" />
        <span className="text-xs font-semibold">{t('nav.map')}</span>
      </NavLink>

      <NavLink
        to="/settings"
        className={({ isActive }) =>
          `flex-1 min-h-[var(--nav-height)] flex flex-col items-center justify-center gap-1 py-3 px-2 transition-all active:scale-95 cursor-pointer no-underline ${
            isActive ? 'text-brand' : 'text-text-tertiary hover:text-text-secondary'
          }`
        }
      >
        <FontAwesomeIcon icon={faGear} className="w-5 h-5 text-xl" />
        <span className="text-xs font-semibold">{t('nav.settings')}</span>
      </NavLink>
    </nav>
  );
}

export default BottomNav;
