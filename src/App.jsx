import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import MangaList from './pages/MangaList';
import MangaDetail from './pages/MangaDetail';
import ChapterReader from './pages/ChapterReader';
import BookmarksPage from './pages/BookmarksPage';
import HistoryPage from './pages/HistoryPage';
import GenreList from './pages/GenreList';
import SearchPage from './pages/SearchPage';

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/manga" element={<MangaList />} />
          <Route path="/manga/:slug" element={<MangaDetail />} />
          <Route path="/bookmarks" element={<BookmarksPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/az" element={<MangaList />} />
          <Route path="/the-loai/:slug" element={<GenreList />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Chapter reader — full-screen, no Navbar/Footer */}
          <Route path="/manga/:slug/chapter/:chapterId" element={<ChapterReader />} />
          {/* All other pages */}
          <Route path="*" element={<MainLayout />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
