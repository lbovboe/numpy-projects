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
        "pri-color": "#00AFC7",
        "sec-color": "#FF5722",
        "ter-color":'#888888',
        "border-color": "#F3F4F7",
        "bg-color": "#E3F7F7",
        "text-color":"#323232",
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
