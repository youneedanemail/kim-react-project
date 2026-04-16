import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './hooks/useFavorites';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { FavoritesPage } from './pages/FavoritesPage';

function App() {
  return (
    <BrowserRouter>
      <FavoritesProvider>
        <div className="min-h-screen bg-slate-950 text-slate-100">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </div>
      </FavoritesProvider>
    </BrowserRouter>
  );
}

export default App;
