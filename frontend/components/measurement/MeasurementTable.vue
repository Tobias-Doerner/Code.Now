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

    <v-data-table
      :headers="headers"
      :items="items"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      class="tertiary"
      dense
      disable-pagination
      hide-default-footer
      @update:options="setSorting"
    >
      <template v-slot:top>
        <v-toolbar color="accent" dense flat>
          <v-toolbar-title
            class="flex-grow-1 flex-shrink-0 title pl-0 white--text"
          >
            {{ $t('measurement.table.title') }}
          </v-toolbar-title>
        </v-toolbar>
        <slot name="filter"></slot>
      </template>

      <template v-slot:item.parameter="{ item }">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-chip
              class="text-center d-flex align-center justify-space-around"
              color="secondary"
              small
              v-bind="attrs"
              v-on="on"
            >
              <strong>{{ getParameter(item.parameter).displayName }}</strong>
            </v-chip>
          </template>
          <span>{{ getParameter(item.parameter).description }}</span>
        </v-tooltip>
      </template>

      <template v-slot:item.value="{ item }">
        {{ item.value | formatDecimal }}
      </template>

      <template v-slot:item.longitude="{ item }">
        {{ item.longitude | formatDecimal }}
      </template>

      <template v-slot:item.latitude="{ item }">
        {{ item.latitude | formatDecimal }}
      </template>

      <template v-slot:item.date="{ item }">
        <span class="text-no-wrap">{{ item.date | formatDateTime }}</span>
      </template>

      <template v-slot:footer>
        <div class="d-flex justify-center">
          <v-btn
            :loading="loading"
            class="text-none ma-4"
            large
            @click="loadMeasurements"
          >
            {{ $t('measurement.loader.btn') }}
          </v-btn>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  props: {
    city: {
      type: String,
      default: () => null
    },
    country: {
      type: String,
      default: () => null
    }
  },
  data() {
    return {
      loading: false,
      page: 1,
      selectedCity: null,
      selectedCountry: null,
      snackbar: false,
      sortBy: 'date',
      sortDesc: true,
      sortedBy: [],
      sortedDesc: []
    }
  },
  computed: {
    headers() {
      return [
        {
          class: 'text-no-wrap',
          sortable: false,
          text: this.$t('measurement.table.header.location'),
          value: 'location'
        },
        {
          class: 'text-no-wrap',
          text: this.$t('measurement.table.header.city'),
          value: 'city'
        },
        {
          class: 'text-no-wrap',
          text: this.$t('measurement.table.header.country'),
          value: 'country'
        },
        {
          class: 'text-no-wrap',
          sortable: false,
          text: this.$t('measurement.table.header.air_pollution'),
          value: 'parameter'
        },
        {
          class: 'text-no-wrap',
          sortable: false,
          text: this.$t('measurement.table.header.measurement_unit'),
          value: 'unit'
        },
        {
          class: 'text-no-wrap',
          sortable: false,
          text: this.$t('measurement.table.header.measurement_value'),
          value: 'value'
        },
        {
          class: 'text-no-wrap',
          sortable: false,
          text: this.$t('measurement.table.header.longitude'),
          value: 'longitude'
        },
        {
          class: 'text-no-wrap',
          sortable: false,
          text: this.$t('measurement.table.header.latitude'),
          value: 'latitude'
        },
        {
          class: 'text-no-wrap',
          text: this.$t('measurement.table.header.date'),
          value: 'date'
        }
      ]
    },
    items() {
      return this.$store.getters['measurements/getMeasurements']
    }
  },
  watch: {
    city(val) {
      this.reset()
      this.loadMeasurements()
    },
    country(val) {
      this.reset()
      this.loadMeasurements()
    }
  },
  mounted() {
    this.scroll()
  },
  methods: {
    getParameter(id) {
      const res = this.$store.getters['measurements/getParameter'](id)
      return res || ''
    },
    loadMeasurements() {
      this.loading = true
      const params = {
        page: this.page,
        country: this.country,
        city: this.city,
        sortedBy: this.sortedBy,
        sortedDesc: this.sortedDesc
      }

      this.$store
        .dispatch('measurements/GET_MEASUREMENTS', params)
        .then(() => {})
        .catch((err) => {
          if (err) this.snackbar = true
        })
        .finally(() => {
          this.loading = false
        })
      this.page++
    },
    reset() {
      this.page = 1
      this.$store.commit('measurements/RESET_MEASUREMENTS')
    },
    scroll() {
      window.onscroll = () => {
        const bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight

        if (bottomOfWindow) this.loadMeasurements()
      }
    },
    setSorting(event) {
      this.sortedBy = event.sortBy
      this.sortedDesc = event.sortDesc
      this.page = 1
      this.$store.commit('measurements/RESET_MEASUREMENTS')
      this.loadMeasurements()
    }
  }
}
</script>
