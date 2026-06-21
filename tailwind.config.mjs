import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx,svelte,vue}"],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#F0FDFA",
          100: "#CCFBF1",
          200: "#99F6E4",
        },
        navy: {
          DEFAULT: "#0D9488",
          600: "#0D9488",
          700: "#115E59",
        },
        terracotta: {
          400: "#5EEAD4",
          500: "#0F172A",
          600: "#020617",
        },
        primary: { DEFAULT: "#0D9488" },
        accent: { DEFAULT: "#0F172A" },
        sage: { 400: "#8FA888", 500: "#6F8B6A", 600: "#566F52" },
        rose: { deep: "#0B1120" },
        ink: {
          900: "#042F2E",
          700: "#115E59",
          500: "#14B8A6",
        },
      },
      maxWidth: {
        prose: "68ch",
        site: "72rem",
      },
      typography: {
        DEFAULT: { css: { maxWidth: "68ch" } },
        ink: { css: { color: "#334155" } },
      },
      fontFamily: {
        display: ["Work Sans", "Georgia", "serif"],
        sans: ["Source Sans 3", "system-ui", "sans-serif"],
        body: ["Source Sans 3", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [typography],
};
