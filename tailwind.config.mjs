import config from "./config/config.json" assert { type: "json" };

/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./index.html"],
  safelist: [
    "bg-primario",
    "bg-secundario",
    "bg-texto",
    "bg-fondo",
  ],
  theme: {
    extend: {
      colors: {
        primario: config.colores.primario,
        secundario: config.colores.secundario,
        texto: config.colores.texto,
        fondo: config.colores.fondo,
      },
    },
  },
  plugins: [],
};

export default tailwindConfig;
