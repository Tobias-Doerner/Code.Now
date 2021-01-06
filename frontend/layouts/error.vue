<template>
  <v-app>
    <h1 v-if="error.statusCode === 404">
      {{ $t('page.error.page not found') }}
    </h1>
    <h1 v-else>{{ $t('page.error.other error') }}</h1>
    <NuxtLink to="/">{{ $t('page.error.link') }}</NuxtLink>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      pageNotFound: this.$t('page.error.page not found'),
      otherError: this.$t('page.error.other error')
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
