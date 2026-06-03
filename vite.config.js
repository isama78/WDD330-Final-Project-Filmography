import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  base: '/WDD330-Final-Project-Filmography/',
  root: "src",
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        details: resolve(__dirname, "src/movie-details/index.html"),
        watchlist: resolve(__dirname, "src/watchlist/index.html"),
      },
    },
  },
});
