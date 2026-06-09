import { addToWatchlistStorage } from "../utils/storage.mjs";

export default class MovieDetails {
  constructor(movieId, containerElement, dataSource) {
    this.movieId = movieId;
    this.containerElement = containerElement;
    this.dataSource = dataSource;
    this.reviewsContainer = document.getElementById("reviews-container");
  }

  async init() {
    try {
      // 1. Get movie details and reviews in parallel to save time
      const [movieData, reviewsData] = await Promise.all([
        this.dataSource.getMovieDetails(this.movieId),
        this.dataSource.getMovieReviews(this.movieId),
      ]);

      const trailerId = await this.dataSource.getMovieTrailerId(
        movieData.title,
      );

      this.renderMovieDetails(movieData, trailerId);

      this.renderMovieReviews(reviewsData);

      this.setupWatchlistButton(movieData);
    } catch (error) {
      console.error("Error initializing movie details:", error);
      this.containerElement.innerHTML = `<p class="error-msg">Failed to load movie details. Please try again later.</p>`;
    }
  }

  renderMovieDetails(movie, trailerId) {
    const genresList = movie.genres.map((g) => g.name).join(", ");
   
    const budgetFormatted = movie.budget > 0 ? `$${movie.budget} USD` : "N/A";
  
    const trailerHtml = trailerId
      ? `
      <div class="trailer-wrapper">
        <h2>Official Trailer</h2>
        <div class="video-container">
          <iframe 
            src="https://www.youtube.com/embed/${trailerId}" 
            title="${movie.title} Official Trailer" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
          </iframe>
        </div>
      </div>
    `
      : `<p class="no-trailer">Trailer not available for this movie.</p>`;

    this.containerElement.innerHTML = `
      <div class="details-layout">
        <div class="details-poster-box">
          <img class="details-poster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        </div>
        <div class="details-info-box">
          <h1 class="details-title">${movie.title}</h1>
          <p class="details-tagline"><em>"${movie.tagline || ""}"</em></p>
          
          <div class="details-meta">
            <span><strong>Release Date:</strong> ${movie.release_date}</span>
            <span><strong>Runtime:</strong> ${movie.runtime} mins</span>
            <span><strong>Rating:</strong> ⭐ ${movie.vote_average.toFixed(1)}</span>
          </div>

          <p class="details-overview"><strong>Overview:</strong><br>${movie.overview}</p>
          
          <div class="details-extra">
            <p><strong>Genres:</strong> ${genresList}</p>
            <p><strong>Budget:</strong> ${budgetFormatted}</p>
          </div>

          <button id="add-watchlist-btn" class="btn-watchlist">➕ Add to Watchlist</button>
        </div>
      </div>

      ${trailerHtml}
    `;
  }

  renderMovieReviews(reviews) {
    if (!this.reviewsContainer) return;

    if (reviews.length === 0) {
      this.reviewsContainer.innerHTML = `<p class="no-reviews">No reviews available for this movie yet.</p>`;
      return;
    }

    // Show up to 3 reviews
    const reviewsHtml = reviews
      .slice(0, 3)
      .map(
        (review) => `
      <div class="review-card">
        <h4 class="review-author">Written by ${review.author}</h4>
        <p class="review-content">${review.content.substring(0, 400)}${review.content.length > 400 ? "..." : ""}</p>
      </div>
    `,
      )
      .join("");

    this.reviewsContainer.innerHTML = reviewsHtml;
  }

  setupWatchlistButton(movieData) {
    const watchlistBtn = document.getElementById("add-watchlist-btn");
    if (!watchlistBtn) return;

    watchlistBtn.addEventListener("click", () => {
      const added = addToWatchlistStorage(movieData);

      if (added) {
        watchlistBtn.textContent = "✅ Added to Watchlist";
        watchlistBtn.style.backgroundColor = "#10b981";
        watchlistBtn.disabled = true;
      } else {
        alert("This movie is already in your watchlist!");
      }
    });
  }
}
