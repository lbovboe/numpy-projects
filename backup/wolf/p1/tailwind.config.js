const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "pri-color": "#D19F6C",
        "sec-color": "#D4C5B2",
        "ter-color":'#888888',
        "border-color": "#E0E0E0",
        "bg-color": "#EAEAEA",
        "text-color":"#2F3035",
      },
      screens: {
        min12: "1200px",
        max12: { max: "1200px" },
      },
      keyframes: {
        slide: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(var(--slide-distance))" },
        },
      },
      animation: {
        slide: "slide var(--slide-speed) linear forwards",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".no-scrollbar::-webkit-scrollbar": {
          "content-visibility": "auto",
          display: "none",
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      });
    }),
  ],
};
