import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LandingPage from './Pages/LandingPage.jsx'
import MoviesPage from './Pages/MoviesPage.jsx'
import SeriesPage from './Pages/SeriesPage.jsx'
import SeriesDetail from './Pages/SeriesDetail.jsx'
import MovieDetail from './Pages/MovieDetail.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/NavBar.jsx'
import Footer from './Components/Footer.jsx'
import './Styles/Navbar.css'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:id" element={<MovieDetail />} />
        <Route path="/series" element={<SeriesPage />} />
        <Route path="/series/:id" element={<SeriesDetail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </StrictMode>,
)