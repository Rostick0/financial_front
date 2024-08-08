// https://nuxt.com/docs/api/configuration/nuxt-config
export default {
  devtools: { enabled: true },
  app: {
    head: {
      title: "Мои финансовик",
      htmlAttrs: {
        lang: "ru-RU",
      },
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0",
        },
        { hid: "description", name: "description", content: "" },
        { name: "format-detection", content: "telephone=no" },
      ],
    },
  },

  css: ["~/assets/scss/index.scss"],

  build: {
    transpile: ["@vuepic/vue-datepicker", "vue-toastification"],
  },

  modules: ["@vite-pwa/nuxt", "nuxt-lodash"],

  lodash: {
    prefix: "lodash",
  },

  runtimeConfig: {
    public: {
      HOST: process.env.HOST,
      API_URL: `${process.env.API_URL}`,
      BACK_URL: `${process.env.BACK_URL}`,
    },
  },

  pwa: {
    manifest: {
      name: "Мои финансовик",
      short_name: "Мои финансовик",
      description: "An application for monitoring your financial",
      theme_color: "black",
      lang: "ru-RU",
    },
    devOptions: {
      enabled: true,
      type: "module",
    },
  },
};
