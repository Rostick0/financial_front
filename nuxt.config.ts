// https://nuxt.com/docs/api/configuration/nuxt-config
export default {
  devtools: { enabled: true },

  css: ["~/assets/scss/index.scss"],

  modules: ["@vite-pwa/nuxt"],

  pwa: {
    name: "My Finance",
    short_name: "Finance",
    description: "An application for monitoring your financial",
    theme_color: "black",
    lang: "ru-RU",
  },
};
