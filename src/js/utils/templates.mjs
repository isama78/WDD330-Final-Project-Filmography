import logoURL from '../../assets/logo.png';

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
      <a href="/movie-details/index.html?movie=${movie.id}">
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
          <li><a href="/watchlist/index.html">My Watchlist</a></li>
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
