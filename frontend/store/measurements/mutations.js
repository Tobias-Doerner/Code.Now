/**
 * Mutations of the jobs store module.
 */
export default {
  /**
   * Mutation for appending an array of measurements to the measurement state.
   *
   * @param {object} state       - VUEX state object.
   * @param {array} measurements - Array containing measurement objects.
   */
  APPEND_MEASUREMENTS(state, measurements) {
    if (Array.isArray(measurements) && measurements.length > 0)
      state.measurements = state.measurements.concat(
        measurements.map((el) => {
          const measurement = {
            city: el.city,
            country: el.country,
            date: el.date.local,
            location: el.location,
            parameter: el.parameter,
            unit: el.unit,
            value: el.value
          }

          if (el.coordinates) {
            measurement.latitude = el.coordinates.latitude
            measurement.longitude = el.coordinates.longitude
          }

          return measurement
        })
      )
  },

  /**
   * Mutation for resetting the state to initial values.
   *
   * @param {object} state - VUEX state object.
   */
  CLEAR(state) {
    state.cities = []
    state.countries = []
    state.parameters = []
  },

  /**
   * Mutation for resetting the measurement state to empty array.
   *
   * @param {object} state - VUEX state object.
   */
  RESET_MEASUREMENTS(state) {
    state.measurements = []
  },

  /**
   * Mutation for adding an array of cities to the state.
   *
   * @param {object} state - VUEX state object.
   * @param {array} cities - Array containing city objects.
   */
  SET_CITIES(state, cities) {
    if (Array.isArray(cities) && cities.length > 0) state.cities = cities
  },

  /**
   * Mutation for adding an array of countries to the state.
   *
   * @param {object} state    - VUEX state object.
   * @param {array} countries - Array containing country objects.
   */
  SET_COUNTRIES(state, countries) {
    if (Array.isArray(countries) && countries.length > 0)
      state.countries = countries
  },

  /**
   * Mutation for adding an array of measurement parameters to the state.
   *
   * @param {object} state     - VUEX state object.
   * @param {array} parameters - Array containing parameter objects.
   */
  SET_PARAMETERS(state, parameters) {
    if (Array.isArray(parameters) && parameters.length > 0)
      state.parameters = parameters
  }
}
