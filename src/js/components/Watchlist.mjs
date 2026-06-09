import { getLocalStorage, setLocalStorage } from "../utils/storage.mjs";
import { watchlistCardTemplate } from "../utils/templates.mjs";

export default class Watchlist {
  constructor(containerElement) {
    this.containerElement = containerElement;
  }

  init() {
    this.renderWatchlist();

    this.containerElement.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn-remove-item")) {
        const card = e.target.closest(".movie-card");
        const movieId = parseInt(card.dataset.id);
        this.removeItem(movieId);
      }
    });
  }

  renderWatchlist() {
    const movies = getLocalStorage("watchlist");

    if (movies.length === 0) {
      this.containerElement.innerHTML = `
        <div class="empty-watchlist">
          <p>Your watchlist is currently empty.</p>
          <a href="${import.meta.env.BASE_URL}index.html" class="btn-browse">Browse Movies</a>
        </div>
      `;
      return;
    }

    const htmlStrings = movies.map((movie) => watchlistCardTemplate(movie));
    this.containerElement.innerHTML = htmlStrings.join("");
  }

  removeItem(movieId) {
    let movies = getLocalStorage("watchlist");

    movies = movies.filter((movie) => movie.id !== movieId);
    setLocalStorage("watchlist", movies);
    this.renderWatchlist();
  }
}
