export function getLocalStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function addToWatchlistStorage(movie) {
  const watchlist = getLocalStorage("watchlist");

  const exists = watchlist.some((item) => item.id === movie.id);

  if (!exists) {
    watchlist.push({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
    });
    setLocalStorage("watchlist", watchlist);
    return true;
  }
  return false;
}
