module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
    'plugin:vue-i18n/recommended'
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'vue-i18n/no-missing-keys': 'error',
    'vue-i18n/no-raw-text': [
      'warn',
      {
        ignoreNodes: ['v-icon'],
        ignoreText: ['&mdash;', '—', '|']
      }
    ],
    'vue-i18n/no-dynamic-keys': 'error',
    'vue-i18n/no-unused-keys': [
      'error',
      {
        extensions: ['.js', '.vue']
      }
    ]
  },
  settings: {
    'vue-i18n': {
      // localeDir should be ./i18n/*.js becaus the files are javascript files.
      // But the vue-i18n linter doesn't work with js files only work with
      // json files.
      // https://github.com/kazupon/eslint-plugin-vue-i18n/issues/32
      localeDir: './i18n/*.json'
    }
  }
}
