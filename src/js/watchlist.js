import Watchlist from "./components/Watchlist.mjs";
import { loadHeaderFooter } from "./utils/utils.mjs";

document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter();

  const container = document.getElementById("watchlist-grid");
  if (container) {
    const watchlistView = new Watchlist(container);
    watchlistView.init();
  }
});
