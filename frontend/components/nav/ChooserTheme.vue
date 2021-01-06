<template>
  <v-switch v-model="darkTheme" dense inset />
</template>

<script>
export default {
  computed: {
    darkTheme: {
      get() {
        return this.$vuetify.theme.dark
      },
      set(val) {
        this.$storage.setCookie('dark_theme', val)
        this.$vuetify.theme.dark = val
      }
    }
  }
}
</script>
