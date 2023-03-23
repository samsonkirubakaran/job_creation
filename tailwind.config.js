/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      keyframes: {
        headShake: {
          "0%": {
            transform: "translatex(0)",
          },
          "6.5%": {
            transform: "translateX(-6px) rotateY(-9deg)",
          },

          "18.5%": {
            transform: "translateX(5px) rotateY(7deg)",
          },

          "31.5%": {
            transform: "translateX(-3px) rotateY(-5deg)",
          },

          "43.5%": {
            transform: "translateX(2px) rotateY(3deg)",
          },
          "50%": {
            transform: "translatex(0)",
          },
        },
        textOpac: {
          "0%": {
            opacity: "0",
          },
          "50%": {
            opacity: "0.5",
          },
          "100%": {
            opacity: "1",
          },
        },
        scaleOpac: {
          "0%": {
            opacity: "0",
            transform: "scale(0)",
          },
          "50%": {
            opacity: "0.5",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
      },

      animation: {
        headShake: "headShake 2s 1",
        textOpac: "textOpac 1.5s 1",
        "textOpac-1": "textOpac 0.75s 1",
        scaleOpac: "scaleOpac 1s 1",
      },

      padding: {
        "input-space": "8px 12px 8px 12px",
        "card-space": "16px 24px",
      },
      height: {
        "dialog-height": "564px",
        "card-height": "320px",
      },
      width: {
        "dialog-width": "577px",
        "47-per": "47%",
        "card-width": "830px",
      },
      borderColor: {
        input: "#E6E6E6",
        radio: "#D8D8D8",
      },
      colors: {
        placeholder: "#7A7A7A",
        primary: "#1597E4",
        error: "#D86161",
        dark: "#212121",
        "light-black": "#212427",
      },
      borderRadius: {
        5: "5px",
        10: "10px",
      },
      gap: {
        "10px": "10px",
      },
      gridAutoColumns: {
        "2fr": "minmax(0, 1fr)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
