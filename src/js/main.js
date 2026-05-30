import MovieData from "./components/MovieData.mjs";
import MovieList from "./components/MovieList.mjs";
import { loadHeaderFooter } from "./utils/utils.mjs";

document.addEventListener("DOMContentLoaded", async () => {

  loadHeaderFooter();
  const dataSource = new MovieData();

  const container = document.getElementById("trending-grid");

  if (container) {
    const trendingList = new MovieList(container, dataSource);
    trendingList.init();
  }
});
