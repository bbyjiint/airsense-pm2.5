import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation, faRotateRight, faHouse } from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '../../context/LanguageContext.jsx';

export function ErrorScreen({ onRetry, onGoHome }) {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleRetry = onRetry || (() => window.location.reload());
  const handleGoHome = onGoHome || (() => navigate('/'));

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-bg-app text-center max-w-[480px] mx-auto">
      <div className="w-16 h-16 rounded-2xl bg-unhealthy-soft text-unhealthy flex items-center justify-center mb-5 shadow-xs">
        <FontAwesomeIcon icon={faTriangleExclamation} className="w-8 h-8 text-2xl" />
      </div>

      <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-red-50 text-unhealthy mb-2 border border-red-200">
        {t('errorScreen.subtitle')}
      </span>

      <h1 className="text-xl md:text-2xl font-bold text-text-primary mb-2">
        {t('errorScreen.title')}
      </h1>

      <p className="text-xs md:text-sm text-text-secondary max-w-[320px] mb-6 leading-relaxed">
        {t('errorScreen.desc')}
      </p>

      <div className="flex flex-col w-full max-w-[280px] gap-2.5">
        <button
          type="button"
          onClick={handleRetry}
          className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand text-white font-semibold text-sm shadow-md hover:bg-brand/90 active:scale-95 transition-all cursor-pointer"
        >
          <FontAwesomeIcon icon={faRotateRight} className="w-4 h-4" />
          <span>{t('errorScreen.retry')}</span>
        </button>

        <button
          type="button"
          onClick={handleGoHome}
          className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-divider bg-white text-text-primary font-semibold text-sm hover:bg-gray-50 active:scale-95 transition-all cursor-pointer"
        >
          <FontAwesomeIcon icon={faHouse} className="w-4 h-4" />
          <span>{t('errorScreen.backHome')}</span>
        </button>
      </div>
    </div>
  );
}

export default ErrorScreen;
