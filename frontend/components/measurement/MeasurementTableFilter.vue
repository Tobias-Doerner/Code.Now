<template>
  <v-card color="tertiary" flat tile>
    <v-card-actions>
      <v-container fluid>
        <v-row no-gutters>
          <v-col cols="12" sm="12" md="12" lg="6" xl="4">
            <v-combobox
              v-model="selectedCountry"
              :items="countries"
              :label="$t('measurement.label.country')"
              prepend-inner-icon="mdi-filter"
              class="mr-2 my-1"
              hide-details
              item-text="name"
              item-value="code"
              clearable
              dense
              outlined
              @change="handleCountryChange"
            >
              <template v-slot:item="{ item }">
                <div>{{ item.name }}</div>
                <v-spacer />
                <v-chip small>{{ item.code }}</v-chip>
              </template>
            </v-combobox>
          </v-col>

          <v-col cols="12" sm="12" md="12" lg="6" xl="4">
            <v-combobox
              v-model="selectedCity"
              :disabled="selectedCountry === null"
              :items="cities"
              :label="$t('measurement.label.city')"
              prepend-inner-icon="mdi-filter"
              class="mr-2 my-1"
              hide-details
              item-text="name"
              item-value="city"
              clearable
              dense
              outlined
              @change="handleCityChange"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      selectedCity: null,
      selectedCountry: null
    }
  },
  computed: {
    cities() {
      if (this.selectedCountry !== null) {
        return this.$store.getters['measurements/getCities'](
          this.selectedCountry.code
        )
      } else {
        return []
      }
    },
    countries() {
      return this.$store.getters['measurements/getCountries']
    }
  },
  methods: {
    emitFilterChange() {
      const el = {}
      el.city = this.selectedCity ? this.selectedCity.city : null
      el.country = this.selectedCountry ? this.selectedCountry.code : null
      this.$emit('filter:changed', JSON.parse(JSON.stringify(el)))
    },
    handleCityChange() {
      this.emitFilterChange()
    },
    handleCountryChange() {
      if (this.selectedCountry === null) {
        this.selectedCity = null
      }
      this.emitFilterChange()
    }
  }
}
</script>
