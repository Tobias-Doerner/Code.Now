/**
 * Actions of the measurements store module.
 */
export default {
  /**
   * Action for retrieving the cities from the REST API.
   *
   * @param {object} commit - VUEX commit object.
   * @async
   */
  async GET_CITIES({ commit }) {
    await this.$axios
      .get(
        `/api.openaq.org/v1/cities?order_by[]=country&order_by[]=city&limit=10000`
      )
      .then((res) => {
        if (res.status === 200 && res.data.results.length > 0) {
          commit('SET_CITIES', res.data.results)
        }
      })
      .catch((err) => {
        console.error(err)
      })
  },

  /**
   * Action for retrieving the countries from the REST API.
   *
   * @param {object} commit - VUEX commit object.
   * @async
   */
  async GET_COUNTRIES({ commit }) {
    await this.$axios
      .get(`/api.openaq.org/v1/countries?order_by=code&limit=10000`)
      .then((res) => {
        if (res.status === 200 && res.data.results.length > 0) {
          commit('SET_COUNTRIES', res.data.results)
        }
      })
      .catch((err) => {
        console.error(err)
      })
  },

  /**
   * Action for retrieving the measurements from the REST API.
   *
   * @param {object} commit - VUEX commit object.
   * @param {object} params - query params e.g.:
   *                          {
   *                            page: 1,
   *                            country: 'CH',
   *                            city: 'Aargau',
   *                            sortedBy: ['city'],
   *                            sortedDesc: [false]
   *                          }
   * @async
   */
  async GET_MEASUREMENTS({ commit }, params) {
    if (params.page && params.page > 0) {
      let query = `?page=${params.page}`
      if (params.country) query = query + `&country=${params.country}`
      if (params.city) query = query + `&city=${params.city}`
      if (params.sortedBy && params.sortedBy.length > 0) {
        params.sortedBy.forEach((el) => {
          query = query + `&order_by[]=${el}`
        })
      }
      if (params.sortedDesc && params.sortedDesc.length > 0) {
        params.sortedDesc.forEach((el) => {
          const order = el ? 'desc' : 'asc'
          query = query + `&sort[]=${order}`
        })
      }

      await this.$axios
        .get(`/api.openaq.org/v1/measurements` + query)
        .then((res) => {
          if (res.status === 200 && res.data.results.length > 0)
            commit('APPEND_MEASUREMENTS', res.data.results)
        })
        .catch((err) => {
          console.error(err)
        })
    } else {
      return new Promise((resolve, reject) => resolve())
    }
  },

  /**
   * Action for retrieving the parameters from the REST API.
   *
   * @param {object} commit - VUEX commit object.
   * @async
   */
  async GET_PARAMETERS({ commit }) {
    await this.$axios
      .get(`/api.openaq.org/v1/parameters`)
      .then((res) => {
        if (res.status === 200 && res.data.results.length > 0)
          commit('SET_PARAMETERS', res.data.results)
      })
      .catch((err) => {
        console.error(err)
      })
  }
}
