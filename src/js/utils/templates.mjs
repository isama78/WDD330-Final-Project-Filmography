import logoURL from '../../assets/logo.png';

const baseUrl = import.meta.env.BASE_URL;

export function movieCardTemplate(movie) {
  const baseURL = "https://image.tmdb.org/t/p/w500";

  const posterPath = movie.poster_path
    ? `${baseURL}${movie.poster_path}`
    : "https://placehold.co/500x750?text=No+Image";

  const releaseYear = movie.release_date
    ? movie.release_date.split("-")[0]
    : "N/A";

  return `
    <div class="movie-card" data-id="${movie.id}">
      <a href="${baseUrl}movie-details/index.html?movie=${movie.id}">
        <img src="${posterPath}" alt="${movie.title}" loading="lazy" class="movie-poster">
        <div class="movie-info">
          <h3 class="movie-title">${movie.title}</h3>
          <p class="movie-year">${releaseYear}</p>
          <span class="movie-rating">⭐ ${movie.vote_average.toFixed(1)}</span>
        </div>
      </a>
    </div>
  `;
}

export function headerTemplate() {
  return `
    <div class="header-container">
      <div class="logo">
        <a href="/index.html">
          <img src="${logoURL}" alt="Filmography Logo" class="logo-img">
          Filmography
        </a>
      </div>
      <nav class="nav-menu">
        <ul>
          <li><a href="/index.html">Home</a></li>
          <li><a href="${baseUrl}watchlist/index.html">My Watchlist</a></li>
        </ul>
      </nav>
    </div>
  `;
}

export function footerTemplate() {
  const currentYear = new Date().getFullYear();
  return `
    <div class="footer-container">
      <p>&copy; ${currentYear} Filmography Project - WDD 330. All rights reserved.</p>
      <p>Data provided by TMDB and YouTube API.</p>
    </div>
  `;
}

export function watchlistCardTemplate(movie) {
  const baseUrl = import.meta.env.BASE_URL;

  return `
    <div class="movie-card watchlist-item" data-id="${movie.id}">
      <button class="btn-remove-item" title="Remove from watchlist">❌</button>
      <a href="${baseUrl}movie-details/index.html?movie=${movie.id}">
        <img class="movie-poster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        <div class="movie-info">
          <h3 class="movie-title">${movie.title}</h3>
          <p class="movie-year">${movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'}</p>
          <span class="movie-rating">⭐ ${movie.vote_average.toFixed(1)}</span>
        </div>
      </a>
    </div>
  `;
}
