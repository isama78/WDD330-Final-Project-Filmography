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
