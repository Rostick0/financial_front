// https://nuxt.com/docs/api/configuration/nuxt-config
export default {
  devtools: { enabled: true },
  app: {
    head: {
      title: "Car",
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

  modules: ["@vite-pwa/nuxt", "nuxt-lodash"],

  lodash: {
    prefix: "lodash",
  },

  pwa: {
    manifest: {
      name: "My Finance",
      short_name: "Finance",
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
