import { MeasOrder, Sort, V2Api } from 'openaq-api'

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
    const api = new V2Api()

    await api
      .citiesGetV2CitiesGet(100000)
      .then((res) => {
        if (res.status === 200 && res.data.results.length > 0) {
          commit('SET_CITIES', res.data.results)
        }
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },

  /**
   * Action for retrieving the countries from the REST API.
   *
   * @param {object} commit - VUEX commit object.
   * @async
   */
  async GET_COUNTRIES({ commit }) {
    const api = new V2Api()

    await api
      .countriesGetV2CountriesGet(10000)
      .then((res) => {
        if (res.status === 200 && res.data.results.length > 0) {
          commit('SET_COUNTRIES', res.data.results)
        }
      })
      .catch((err) => {
        return Promise.reject(err)
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
    const api = new V2Api()

    if (params.page && params.page > 0) {
      let sortedBy
      if (params.sortedBy.length > 0) {
        if (params.sortedBy[0] === 'date') {
          sortedBy = MeasOrder.Datetime
        }
        if (params.sortedBy[0] === 'city') {
          sortedBy = MeasOrder.City
        }
        if (params.sortedBy[0] === 'country') {
          sortedBy = MeasOrder.Country
        }
      }

      await api
        .measurementsGetV2MeasurementsGet(
          undefined,
          undefined,
          undefined,
          100,
          params.page ? params.page : undefined,
          undefined,
          params.sortedDesc[0] ? Sort.Desc : Sort.Asc,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          params.country ? params.country : undefined,
          undefined,
          params.city ? [params.city] : undefined,
          undefined,
          undefined,
          sortedBy
        )
        .then((res) => {
          if (res.status === 200 && res.data.results.length > 0)
            commit('APPEND_MEASUREMENTS', res.data.results)
        })
        .catch((err) => {
          return Promise.reject(err)
        })
    } else {
      return Promise.resolve()
    }
  },

  /**
   * Action for retrieving the parameters from the REST API.
   *
   * @param {object} commit - VUEX commit object.
   * @async
   */
  async GET_PARAMETERS({ commit }) {
    const api = new V2Api()

    await api
      .parametersGetV2ParametersGet(100000)
      .then((res) => {
        if (res.status === 200 && res.data.results.length > 0)
          commit('SET_PARAMETERS', res.data.results)
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  }
}
