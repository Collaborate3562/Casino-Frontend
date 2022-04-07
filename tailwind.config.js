module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        app: {
          brown: {
            DEFAULT: "#40040a",
            light: "#7b4621"
          },
          yellow: {
            DEFAULT: "#ffca79",
            light: "#ffeed7"
          }
        }
      }
    },
    screens: {
      tiny: "350px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1366px",
      "2xl": "1680px"
    }
  },
  plugins: [],
}
