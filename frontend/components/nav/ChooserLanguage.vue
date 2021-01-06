<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn small v-on="on">
        {{ currentUsedLocale }} <v-icon>mdi-menu-down</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="(locale, index) in availableLocales"
        :key="index"
        @click="setLocale(locale.code)"
      >
        <v-list-item-title>{{ locale.code }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
    },
    currentUsedLocale() {
      return this.$i18n.locale
    }
  },
  methods: {
    setLocale(locale) {
      this.$i18n.setLocale(locale)
      this.$i18n.setLocaleCookie(locale)
      this.$vuetify.lang.current = locale
    }
  }
}
</script>
