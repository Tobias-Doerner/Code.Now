<template>
  <measurement-table :city="filter.city" :country="filter.country">
    <template v-slot:filter>
      <measurement-table-filter @filter:changed="setFilter" />
    </template>
  </measurement-table>
</template>

<script>
export default {
  data() {
    return {
      filter: {
        city: null,
        country: null
      }
    }
  },
  async mounted() {
    await Promise.all([
      this.$store.dispatch('measurements/GET_COUNTRIES'),
      this.$store.dispatch('measurements/GET_CITIES'),
      this.$store.dispatch('measurements/GET_PARAMETERS')
    ])
  },
  destroyed() {
    this.$store.commit('measurements/CLEAR')
  },
  methods: {
    setFilter(event) {
      this.filter.city = event.city
      this.filter.country = event.country
    }
  }
}
</script>
