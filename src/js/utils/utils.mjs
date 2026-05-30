function headerTemplate() {
  return `
    <div class="header-container">
      <div class="logo">
        <a href="/index.html">
          <img src="/assets/logo.png" alt="Filmography Logo" class="logo-img">
          Filmography
        </a>
      </div>
      <nav class="nav-menu">
        <ul>
          <li><a href="/index.html">Home</a></li>
          <li><a href="/watchlist/index.html">My Watchlist</a></li>
        </ul>
      </nav>
    </div>
  `;
}

function footerTemplate() {
  const currentYear = new Date().getFullYear();
  return `
    <div class="footer-container">
      <p>&copy; ${currentYear} Filmography Project - WDD 330. All rights reserved.</p>
      <p>Data provided by TMDB and YouTube API.</p>
    </div>
  `;
}

export function loadHeaderFooter() {
  const headerElement = document.querySelector("header");
  const footerElement = document.querySelector("footer");

  if (headerElement) {
    headerElement.innerHTML = headerTemplate();
  }

  if (footerElement) {
    footerElement.innerHTML = footerTemplate();
  }
}
