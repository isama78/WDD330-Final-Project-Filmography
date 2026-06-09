import MovieData from './components/MovieData.mjs';
import MovieDetails from './components/MovieDetails.mjs';
import { loadHeaderFooter } from './utils/utils.mjs';

document.addEventListener('DOMContentLoaded', async () => {
  loadHeaderFooter();

  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get('movie');

  if (!movieId) {
    window.location.href = `${import.meta.env.VITE_TMDB_BASE_URL}index.html`;
    return;
  }

  const dataSource = new MovieData();
  const container = document.getElementById('movie-details-container');
  
  if (container) {
    const movieDetails = new MovieDetails(movieId, container, dataSource);
    movieDetails.init();
  }
});