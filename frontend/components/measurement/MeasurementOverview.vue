<template>
  <div>
    <v-snackbar v-model="snackbar" color="error">
      <template v-slot:action="{ attrs }">
        {{ $t('common.error.network_error') }}
        <v-btn class="ma-2" v-bind="attrs" icon @click="snackbar = false">
          <v-icon>mdi-close-circle</v-icon>
        </v-btn>
      </template>
    </v-snackbar>

    <measurement-table
      v-if="!loading"
      :city="filter.city"
      :country="filter.country"
    >
      <template v-slot:filter>
        <measurement-table-filter @filter:changed="setFilter" />
      </template>
    </measurement-table>

    <div v-else class="d-flex justify-center">
      <v-progress-circular
        v-show="loading"
        color="primary"
        size="64"
        width="8"
        indeterminate
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filter: {
        city: null,
        country: null
      },
      loading: true,
      snackbar: false
    }
  },
  mounted() {
    Promise.all([
      this.$store.dispatch('measurements/GET_COUNTRIES'),
      this.$store.dispatch('measurements/GET_CITIES'),
      this.$store.dispatch('measurements/GET_PARAMETERS')
    ])
      .then((res) => {})
      .catch((err) => {
        if (err) this.snackbar = true
      })
      .finally(() => {
        this.loading = false
      })
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
