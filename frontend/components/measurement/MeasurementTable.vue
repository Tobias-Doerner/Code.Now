<template>
  <v-data-table
    :headers="headers"
    :items="items"
    class="tertiary"
    dense
    disable-pagination
    hide-default-footer
    multi-sort
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
            <strong>{{ getParameter(item.parameter).name }}</strong>
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
  </v-data-table>
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
      page: 1,
      scrolledToBottom: false,
      selectedCity: null,
      selectedCountry: null,
      sortedBy: [],
      sortedDesc: []
    }
  },
  computed: {
    headers() {
      return [
        {
          class: 'text-no-wrap',
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
          text: this.$t('measurement.table.header.air_pollution'),
          value: 'parameter'
        },
        {
          class: 'text-no-wrap',
          text: this.$t('measurement.table.header.measurement_unit'),
          value: 'unit'
        },
        {
          class: 'text-no-wrap',
          text: this.$t('measurement.table.header.measurement_value'),
          value: 'value'
        },
        {
          class: 'text-no-wrap',
          text: this.$t('measurement.table.header.longitude'),
          value: 'longitude'
        },
        {
          class: 'text-no-wrap',
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
    },
    scrolledToBottom(val) {
      if (val === true) {
        this.loadMeasurements()
      }
    }
  },
  mounted() {
    this.scroll()
  },
  methods: {
    getParameter(id) {
      return this.$store.getters['measurements/getParameter'](id)
    },
    loadMeasurements() {
      const params = {
        page: this.page,
        country: this.country,
        city: this.city,
        sortedBy: this.sortedBy,
        sortedDesc: this.sortedDesc
      }

      this.$store.dispatch('measurements/GET_MEASUREMENTS', params)
      this.page++
    },
    reset() {
      this.page = 1
      this.$store.commit('measurements/RESET_MEASUREMENTS')
    },
    scroll() {
      window.onscroll = () => {
        const bottomOfWindow =
          Math.max(
            window.pageYOffset,
            document.documentElement.scrollTop,
            document.body.scrollTop
          ) +
            window.innerHeight ===
          document.documentElement.offsetHeight

        if (bottomOfWindow) {
          this.scrolledToBottom = true
        } else {
          this.scrolledToBottom = false
        }
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
