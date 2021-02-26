import colors from 'vuetify/es5/util/colors'
import de from 'vuetify/es5/locale/de'
import en from 'vuetify/es5/locale/en'
import pkg from './package'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    meta: [
      { charset: 'utf-8' },
      { name: 'author', content: pkg.author },
      { name: 'description', content: pkg.description, hid: 'description' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    noscript: [{ innerHTML: 'This website requires JavaScript!' }],
    title: pkg.name,
    titleTemplate: 'AirPoll App'
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/css/main.css'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['~/plugins/vuetify.js', '~/plugins/formatter.js'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    ['@nuxtjs/vuetify', { defaultAssets: false }],
    '@nuxtjs/moment'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/moment',
    '@nuxtjs/universal-storage',
    ['nuxt-i18n', { seo: true }]
  ],

  router: {
    middleware: ['theme']
  },

  publicRuntimeConfig: {
    version: pkg.version
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  /*
   ** nuxt-i18n module configuration
   *  See https://nuxt-community.github.io/nuxt-i18n/
   */
  i18n: {
    defaultLocale: 'en',
    detectBrowserLanguage: {
      cookieKey: 'i18n_redirected',
      onlyOnRoot: true,
      useCookie: true
    },
    langDir: 'i18n/',
    lazy: true,
    locales: [
      { code: 'de', iso: 'de-DE', file: 'de-DE.js', name: 'deutsch' },
      { code: 'en', iso: 'en-US', file: 'en-US.js', name: 'english' }
    ],
    strategy: 'no_prefix',
    vuex: {
      moduleName: 'i18n',
      syncLocale: true,
      syncMessages: false,
      syncRouteParams: false
    }
  },

  moment: {
    locales: ['de']
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    lang: {
      locales: { de, en },
      current: 'de'
    },
    theme: {
      options: {
        customProperties: true
      },
      dark: false,
      themes: {
        dark: {
          accent: colors.orange.darken1,
          heading: colors.blueGrey.darken4,
          error: colors.red.base,
          footing: colors.blueGrey.darken4,
          info: colors.lightGreen.base,
          menus: colors.blueGrey.darken3,
          primary: colors.blue.lighten2,
          secondary: colors.blueGrey.base,
          success: colors.green.base,
          tertiary: '#323232',
          warning: colors.amber.base
        },
        light: {
          accent: colors.orange.darken4,
          heading: colors.blueGrey.darken1,
          error: colors.red.base,
          footing: colors.blueGrey.darken1,
          info: colors.lightGreen.base,
          menus: colors.blueGrey.lighten4,
          primary: colors.blue.darken2,
          secondary: colors.blueGrey.base,
          success: colors.green.base,
          tertiary: colors.grey.lighten4,
          warning: colors.amber.base
        }
      }
    },
    treeShake: true
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {}
}
