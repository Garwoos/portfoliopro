import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // Remplacez 'nom-du-repo' par le nom de votre dépôt GitHub
  plugins: [react()],
});