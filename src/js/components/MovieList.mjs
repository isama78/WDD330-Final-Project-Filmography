import { movieCardTemplate } from "../utils/templates.mjs";
import { delay, showLoading } from "../utils/utils.mjs";

export default class MovieList {
  constructor(containerElement, dataSource) {
    this.containerElement = containerElement;
    this.dataSource = dataSource;
    this.genreSelect = document.getElementById("genre-select");
    this.sortSelect = document.getElementById("sort-select");
    this.listHeading = document.getElementById("list-heading");
    this.searchForm = document.getElementById("search-form");
    this.searchInput = document.getElementById("search-input");
  }

  async init() {
    try {
      await this.initGenres();

      this.genreSelect.addEventListener("change", () =>
        this.handleFilterChange(),
      );
      this.sortSelect.addEventListener("change", () =>
        this.handleFilterChange(),
      );

      if (this.searchForm) {
        this.searchForm.addEventListener("submit", (e) => this.handleSearch(e));
      }

      showLoading(this.containerElement);

      // Function to simulate loading delay
      await delay(1500);
      
      const initialMovies = await this.dataSource.getTrendingMovies();
      this.renderList(initialMovies);
    } catch (error) {
      this.containerElement.innerHTML = `<p class="error-msg">Error loading movies.</p>`;
    }
  }

  async initGenres() {
    const genres = await this.dataSource.getGenres();
    genres.forEach((genre) => {
      const option = document.createElement("option");
      option.value = genre.id;
      option.textContent = genre.name;
      this.genreSelect.appendChild(option);
    });
  }

  async handleFilterChange() {
    if (this.searchInput) {
      this.searchInput.value = "";
    }

    showLoading(this.containerElement);

    // Function to simulate loading delay
    await delay(1500);

    const selectedGenre = this.genreSelect.value;
    const selectedSort = this.sortSelect.value;

    let movies = [];

    if (selectedSort === "trending" && !selectedGenre) {
      this.listHeading.textContent = "Trending Movies";
      movies = await this.dataSource.getTrendingMovies();
    } else {
      this.listHeading.textContent = "Filtered Movies";
      movies = await this.dataSource.getDiscoverMovies(
        selectedGenre,
        selectedSort,
      );
    }

    this.renderList(movies);
  }

  renderList(movies) {
    this.containerElement.innerHTML = "";
    if (movies.length === 0) {
      this.containerElement.innerHTML = `<p class="no-results">No movies found matching the criteria.</p>`;
      return;
    }
    const htmlStrings = movies.map((movie) => movieCardTemplate(movie));
    this.containerElement.innerHTML = htmlStrings.join("");
  }

  async handleSearch(event) {
    event.preventDefault();

    const query = this.searchInput.value.trim();
    if (!query) return;

    try {
      this.listHeading.textContent = `Search Results for "${query}"`;

      this.genreSelect.value = "";
      this.sortSelect.value = "trending";

      const searchResults = await this.dataSource.searchMovies(query);

      this.renderList(searchResults);
    } catch (error) {
      this.containerElement.innerHTML = `<p class="error-msg">Error executing search.</p>`;
    }
  }
}
