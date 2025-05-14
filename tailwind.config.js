/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Esto le dice a Tailwind que escanee todos estos tipos de archivos en tu carpeta src
  ],
  theme: {
    extend: {
      colors: { // Paleta de colores personalizada
        sky: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7', // Azul principal
          700: '#0369a1', // Azul más oscuro
          800: '#075985', // Azul muy oscuro
          900: '#0c4a6e',
        },
        amber: { // Para los tonos amarillos (usados en hover y gradientes)
           300: '#fcd34d',
           400: '#facc15',
           500: '#f59e0b',
        },
        yellow: { // Paleta 'yellow' explícita para consistencia con clases de Tailwind
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15', // Amarillo principal (pelota de pádel)
          500: '#eab308',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Fuente principal
      },
    },
  },
  plugins: [],
};