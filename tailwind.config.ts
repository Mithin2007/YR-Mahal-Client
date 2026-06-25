import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        charcoal: "#171512",
        ink: "#252018",
        cream: "#f7f0e5",
        porcelain: "#fffdf8",
        royalGold: "#b8892f",
        deepGold: "#7a581b",
        softGold: "#dfc27a"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Arial", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"]
      },
      boxShadow: {
        luxury: "0 24px 80px rgba(25, 19, 10, 0.16)"
      },
      backgroundImage: {
        "gold-sheen": "linear-gradient(135deg, #6f4d16 0%, #b8892f 42%, #f0d78f 100%)"
      }
    }
  },
  plugins: []
};

export default config;
