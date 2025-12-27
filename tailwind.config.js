/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "#ecc813",
        "primary-light": "rgba(230, 194, 23, 0.2)",
        "primary-dark": "rgb(180, 150, 10)",
        "background-light": "#F9FAFB",
        "background-dark": "#111827",
        "surface-light": "#FFFFFF",
        "surface-dark": "#1F2937",
        "primary-content": "#181711",
        "text-light": "#181711",
        "text-dark": "#e6e4db",
        "subtext-light": "#5f5e55",
        "subtext-dark": "#a3a199",
        "border-light": "#e6e4db",
        "border-dark": "#3e3b2e",
      },
      fontFamily: {
        "display": ["Noto Sans Arabic", "Inter", "sans-serif"],
        "body": ["Noto Sans Arabic", "Inter", "sans-serif"],
        "arabic": ["Noto Sans Arabic", "sans-serif"],
        "sans": ["Inter", "Noto Sans Arabic", "sans-serif"],
      },
      borderRadius: { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "2xl": "1rem", "full": "9999px" },
    },
  },
  plugins: [],
}
