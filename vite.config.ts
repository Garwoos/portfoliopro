import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import commonjs from '@rollup/plugin-commonjs';

export default defineConfig({
  base: '/', // Remplacez 'nom-du-repo' par le nom de votre dépôt GitHub
  plugins: [
    react(),
    commonjs() // Add this plugin to handle CommonJS modules
  ],
  build: {
    sourcemap: true, // Assurez-vous que les liens source sont générés
  },
  optimizeDeps: {
    include: ['clsx', 'lucide-react', 'some-commonjs-library', 'index.modern.js'], // Ajoutez ici les modules problématiques
  },
  ssr: {
    noExternal: ['index.modern.js'], // Exclude the library from SSR if needed
  },
});