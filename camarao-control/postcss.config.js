// postcss.config.js

// Importamos as ferramentas no topo
import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

export default {
  // A lista de plugins agora é um Array []
  plugins: [
    tailwindcss,
    autoprefixer,
  ],
};