import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomeScreen } from './pages/home/HomeScreen.jsx';
import { MapScreen } from './pages/map/MapScreen.jsx';
import { SettingsScreen } from './pages/settings/SettingsScreen.jsx';
import { NotFoundScreen } from './pages/not-found/NotFoundScreen.jsx';
import { BottomNav } from './components/BottomNav.jsx';
import { LanguageProvider } from './context/LanguageContext.jsx';

function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col max-w-[480px] mx-auto bg-bg-app md:max-w-[520px] md:border-x md:border-divider md:shadow-2xl">
      <main className="flex-1 overflow-y-auto pb-[calc(var(--nav-height)+var(--safe-bottom)+16px)]">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/map" element={<MapScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
          <Route path="*" element={<NotFoundScreen />} />
        </Routes>
      </main>

      <BottomNav />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
