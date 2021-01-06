export default function ({ $vuetify, $storage }) {
  const isDark = $storage.getCookie('dark_theme')
  if (isDark) $vuetify.theme.dark = true
  if (!isDark) $vuetify.theme.dark = false
}
