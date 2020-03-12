// const bodyParser = require('body-parser');
require('dotenv').config();

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Free The Router',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // { rel: "stylesheet", href: "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css", integrity: "sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh", crossorigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Courier+Prime|Open+Sans|Montserrat&display=swap" }
    ],
    script: [
      { src: "https://kit.fontawesome.com/de4652b620.js", crossorigin: "anonymous" },
      { src: "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js", body: true },
      // { src: "https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js", body: true }
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
    [ '@nuxtjs/dotenv' ]
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
  env: {
    firebaseAPIKey: "AIzaSyAGPDCLt8tpLYIKuFuBL_RXHq5Wgeu0VRQ",
    geolocationDBAPIKey: "0f761a30-fe14-11e9-b59f-e53803842572"
  },
  router: {
    linkActiveClass: 'active',
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    }
  },
  transition: {
    name: 'fade',
    mode: 'out-in'
  },
  serverMiddleware: [
    // bodyParser.urlencoded({extended: true})
  ],
  router: {
    middleware: 'detectCountry'
  }
}
