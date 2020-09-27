module.exports = {
  mode: 'universal',
  target: "server",
  /*
  ** Headers of the page
  */
  head: {
    meta: [
      { 'http-equiv': "Content-Type", content: "text/html", charset: "utf-8" },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
    ]
  },
  /*
  ** Customize the progress-bar color20
  */
  loading: { color: '#2015a2' },
  /*
  ** Global CSS
  */
  css: [
    "~assets/styles/main.css"
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    "~/plugins/firebase.js"
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
  ],
  srcDir: 'src',
  buildDir: '.nuxt',
  /*
  ** Build configuration
  */
  build: {
    // publicPath: '/public/',
    extractCSS: true,
    babel: {
      presets: [
        [
          "@babel/preset-env",
            {
              "targets": {
                "chrome": "58",
                "ie": "11"
              },
              "useBuiltIns": "entry",
              "corejs": 3
            }
        ],
      ],
      plugins: [
        ["@babel/plugin-transform-runtime", {
          "corejs": 3,
          "regenerator": true
        }],

        ["module-resolver", {
          "root": ["./src"]
        }]
      ]
    },
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  
  router: {
    linkActiveClass: 'active',
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition;
      } else {
        return { x: 0, y: 0 };
      }
    },
    middleware: 'setCountry'
  }
};