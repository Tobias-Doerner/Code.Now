import VueI18n from 'vue-i18n'
import DE from '@/i18n/de-DE'
import EN from '@/i18n/en-US'

function loadLocaleMessages() {
  const de = DE
  const en = EN

  return {
    en,
    de
  }
}

export function setupI18n(vueInstance) {
  vueInstance.use(VueI18n)

  const i18n = new VueI18n({
    locale: process.env.VUE_APP_I18N_LOCALE || 'de',
    fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'de',
    messages: loadLocaleMessages()
  })

  i18n.locales = [
    { code: 'de', iso: 'de-DE', file: 'de-DE.js', name: 'deutsch' },
    { code: 'en', iso: 'en-US', file: 'en-US.js', name: 'english' }
  ]

  i18n.setLocale = (locale) => {}
  i18n.setLocaleCookie = (locale) => {}

  return i18n
}
