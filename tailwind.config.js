/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        me: "url(./public/assets/me.jpg)",
      },
      keyframes: {
        overlayShow: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        contentShow: {
          from: { opacity: 0, transform: "translate(-50%, -48%) scale(0.96)" },
          to: { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
        },
        profileAnimate: {
          "0%": {
            "border-radius": "60% 40% 30% 70%/60% 30% 70% 40%",
          },
          "50%": {
            "border-radius": "30% 60% 70% 40%/50% 60% 30% 60%",
          },
          "100%": {
            "border-radius": "60% 40% 30% 70%/60% 30% 70% 40%",
          },
        },
      },
      animation: {
        overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        profileAnimation: "profileAnimate 8s ease-in-out infinite 1s",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
