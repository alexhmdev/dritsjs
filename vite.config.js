import { defineConfig } from 'vite';
import { ghPages } from 'vite-plugin-gh-pages';

export default defineConfig({
  root: 'src/renderer',
  base: '/',
  plugins: [ghPages()],
});
