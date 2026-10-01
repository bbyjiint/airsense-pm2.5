import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass, faHouse } from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '../../context/LanguageContext.jsx';

export function NotFoundScreen() {
  const { t } = useLanguage();

  return (
    <div className="px-5 pt-12 pb-8 md:px-7 md:pt-16 flex flex-col items-center text-center">
      <div className="w-20 h-20 rounded-3xl bg-brand-soft/80 text-brand flex items-center justify-center mb-6 shadow-xs animate-bounce">
        <FontAwesomeIcon icon={faCompass} className="w-10 h-10 text-3xl" />
      </div>

      <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-gray-100 text-text-tertiary mb-3 border border-divider">
        {t('notFound.subtitle')}
      </span>

      <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-text-primary mb-3">
        {t('notFound.title')}
      </h1>

      <p className="text-sm text-text-secondary max-w-[320px] mb-8 leading-relaxed">
        {t('notFound.desc')}
      </p>

      <Link
        to="/"
        className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-brand text-white font-semibold text-sm shadow-md hover:bg-brand/90 active:scale-95 transition-all no-underline cursor-pointer"
      >
        <FontAwesomeIcon icon={faHouse} className="w-4 h-4" />
        <span>{t('notFound.backHome')}</span>
      </Link>
    </div>
  );
}

export default NotFoundScreen;
