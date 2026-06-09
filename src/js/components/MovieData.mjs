export default class MovieData {
  constructor() {
    this._baseUrl = import.meta.env.VITE_TMDB_BASE_URL;
    this._accessToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
  }

  async #fetchData(endpoint) {
    const url = `${this._baseUrl}${endpoint}`;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${this._accessToken}`,
      },
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error capturado en #fetchData:", error);
      throw error;
    }
  }

  async getTrendingMovies() {
    const data = await this.#fetchData("/trending/movie/day?language=en-US");
    return data.results;
  }

  async getGenres() {
    const data = await this.#fetchData("/genre/movie/list?language=en-US");
    return data.genres;
  }

  async getDiscoverMovies(genreId = "", sortBy = "popularity.desc") {
    let endpoint = `/discover/movie?language=en-US&sort_by=${sortBy}`;

    if (genreId) {
      endpoint += `&with_genres=${genreId}`;
    }

    const data = await this.#fetchData(endpoint);
    return data.results;
  }

  async searchMovies(query) {
    const endpoint = `/search/movie?language=en-US&query=${query}`;

    const data = await this.#fetchData(endpoint);
    return data.results;
  }

  async getMovieDetails(movieId) {
    return await this.#fetchData(`/movie/${movieId}?language=en-US`);
  }

  async getMovieReviews(movieId) {
    const data = await this.#fetchData(
      `/movie/${movieId}/reviews?language=en-US`,
    );
    return data.results;
  }

  async getMovieTrailerId(movieTitle) {
    const youtubeKey = import.meta.env.VITE_YOUTUBE_API_KEY;
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${movieTitle}&type=video&maxResults=1&key=${youtubeKey}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status}`);
      }
        
      const data = await response.json();
      console.log("YouTube API response:", data);
      if (data.items && data.items.length > 0) {
        return data.items[0].id.videoId;
      }
      return null;
    } catch (error) {
      console.error("Failed to fetch YouTube trailer:", error);
      return null;
    }
  }
}
