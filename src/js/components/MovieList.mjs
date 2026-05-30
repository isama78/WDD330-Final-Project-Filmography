import { movieCardTemplate } from "../utils/templates.mjs";

export default class MovieList {
  constructor(containerElement, dataSource) {
    this.containerElement = containerElement;
    this.dataSource = dataSource;
  }

  async init() {
    try {
      const movies = await this.dataSource.getTrendingMovies();

      this.renderList(movies);
    } catch (error) {
      this.containerElement.innerHTML = `<p class="error-msg">There was an error loading the trending movies. Please try again later.</p>`;
    }
  }

  renderList(movies) {
    this.containerElement.innerHTML = "";

    const htmlStrings = movies.map((movie) => movieCardTemplate(movie));

    this.containerElement.innerHTML = htmlStrings.join("");
  }
}
