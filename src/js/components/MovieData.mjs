export default class MovieData {
  constructor() {
    this._baseUrl = import.meta.env.VITE_TMDB_BASE_URL;
    this._accessToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
  }

  async #fetchData(endpoint) {
    const url = `${this._baseUrl}${endpoint}`;

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${this._accessToken}`
      }
    };

    try {
      console.log("URL completa:", url);
      console.log("_accessToken:", this._accessToken);
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
    const data = await this.#fetchData('/trending/movie/day?language=en-US');
    return data.results;
  }
}