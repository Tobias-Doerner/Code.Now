/**
 * Getters of the measurements store module.
 */
export default {
  /**
   * Get the cities belonging to a country.
   *
   * @param {object} state - VUEX state object.
   * @param {string} code  - the country code e.g.: 'CH'.
   * @returns {array} Array of cities.
   */
  getCities: (state) => (code) => {
    const cities = state.cities
      .filter((el) => el.country === code)
      .map((el) => {
        return {
          city: el.city,
          name: el.city
        }
      })

    return [...cities]
  },

  /**
   * Get the countries.
   *
   * @param {object} state - VUEX state object.
   * @returns {array} Array of countries.
   */
  getCountries: (state) => {
    const countries = state.countries.map((el) => {
      return {
        code: el.code,
        name: el.name
      }
    })

    return [...countries]
  },

  /**
   * Get the measurements.
   *
   * @param {object} state - VUEX state object.
   * @returns {array} Array of measurements.
   */
  getMeasurements: (state) => {
    const measurements = state.measurements
    return [...measurements]
  },

  /**
   * Get the parameter for a parameter id.
   *
   * @param {object} state - VUEX state object.
   * @param {string} id    - the id of a parameter e.g.: 'co2'
   * @returns {object} Parameter object.
   */
  getParameter: (state) => (id) => {
    const parameters = state.parameters.filter((el) => el.name === id)
    if (Array.isArray(parameters) && parameters.length > 0) {
      return parameters[0]
    } else {
      return null
    }
  }
}
