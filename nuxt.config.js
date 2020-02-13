
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || 'Free The Router',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: "stylesheet", href: "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css", integrity: "sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh", crossorigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Courier+Prime|Open+Sans&display=swap" }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
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
            'bootstrap-vue/nuxt'
    // Doc: https://bootstrap-vue.js.org
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  router: {
    linkActiveClass: 'active'
  },
  script: [
    {   src: "https://code.jquery.com/jquery-3.4.1.js", integrity: "sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU=", crossorigin: "anonymous" }
  ],
  transition: {
    name: 'fade',
    mode: 'out-in'
  }
}
