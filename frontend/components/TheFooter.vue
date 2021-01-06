<template>
  <v-footer :inset="inset" color="footing" app padless>
    <span class="mx-auto my-1 text-center white--text">
      {{ $t('footer.title') }}
      {{ version }} {{ year }}
    </span>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      inset: false,
      version: '(' + this.$config.version + ')',
      year: new Date().getFullYear()
    }
  }
}
</script>
