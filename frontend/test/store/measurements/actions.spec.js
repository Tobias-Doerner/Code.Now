import actions from '@/store/measurements/actions'

describe('VUEX actions of the measurements module', () => {
  const commit = jest.fn()

  beforeEach(() => {
    commit.mockClear()
  })

  describe('Action GET_CITIES', () => {
    it('should retrieve cities from API and making a commit to the store', async () => {
      actions.$axios = {
        get: () => {
          return Promise.resolve({
            status: 200,
            data: {
              meta: {
                name: 'openaq-api',
                license: 'CC BY 4.0',
                website: 'https://docs.openaq.org/',
                page: 1,
                limit: 100,
                found: 3269
              },
              results: [
                {
                  country: 'AD',
                  name: 'Escaldes-Engordany',
                  city: 'Escaldes-Engordany',
                  count: 202609,
                  locations: 2
                },
                {
                  country: 'AD',
                  name: 'unused',
                  city: 'unused',
                  count: 16301,
                  locations: 1
                },
                {
                  country: 'AE',
                  name: 'Abu Dhabi',
                  city: 'Abu Dhabi',
                  count: 418940,
                  locations: 1
                }
              ]
            }
          })
        }
      }

      await actions.GET_CITIES({ commit })

      expect(commit).toHaveBeenCalledWith('SET_CITIES', [
        {
          country: 'AD',
          name: 'Escaldes-Engordany',
          city: 'Escaldes-Engordany',
          count: 202609,
          locations: 2
        },
        {
          country: 'AD',
          name: 'unused',
          city: 'unused',
          count: 16301,
          locations: 1
        },
        {
          country: 'AE',
          name: 'Abu Dhabi',
          city: 'Abu Dhabi',
          count: 418940,
          locations: 1
        }
      ])
    })

    it('should handle response with empty result when calling API', async () => {
      actions.$axios = {
        get: () => {
          return Promise.resolve({
            status: 200,
            data: {
              meta: {
                name: 'openaq-api',
                license: 'CC BY 4.0',
                website: 'https://docs.openaq.org/',
                page: 1,
                limit: 100,
                found: 0
              },
              results: []
            }
          })
        }
      }

      await actions.GET_CITIES({ commit })

      expect(commit).toHaveBeenCalledTimes(0)
    })

    it('should handle network errors when calling API', async () => {
      actions.$axios = {
        get: () => {
          return Promise.reject(new Error('Network Error'))
        }
      }

      await actions
        .GET_CITIES({ commit })
        .catch((err) => expect(err).toBeDefined())

      expect(commit).toHaveBeenCalledTimes(0)
    })
  })

  describe('Action GET_COUNTRIES', () => {
    it('should retrieve countries from API and making a commit to the store', async () => {
      actions.$axios = {
        get: () => {
          return Promise.resolve({
            status: 200,
            data: {
              meta: {
                name: 'openaq-api',
                license: 'CC BY 4.0',
                website: 'https://docs.openaq.org/',
                page: 1,
                limit: 100,
                found: 110
              },
              results: [
                {
                  code: 'AD',
                  count: 218910,
                  locations: 3,
                  cities: 2,
                  name: 'Andorra'
                },
                {
                  code: 'AE',
                  count: 882058,
                  locations: 4,
                  cities: 3,
                  name: 'United Arab Emirates'
                },
                {
                  code: 'AF',
                  count: 219726,
                  locations: 2,
                  cities: 2,
                  name: 'Afghanistan'
                }
              ]
            }
          })
        }
      }

      await actions.GET_COUNTRIES({ commit })

      expect(commit).toHaveBeenCalledWith('SET_COUNTRIES', [
        {
          code: 'AD',
          count: 218910,
          locations: 3,
          cities: 2,
          name: 'Andorra'
        },
        {
          code: 'AE',
          count: 882058,
          locations: 4,
          cities: 3,
          name: 'United Arab Emirates'
        },
        {
          code: 'AF',
          count: 219726,
          locations: 2,
          cities: 2,
          name: 'Afghanistan'
        }
      ])
    })

    it('should handle response with empty result when calling API', async () => {
      actions.$axios = {
        get: () => {
          return Promise.resolve({
            status: 200,
            data: {
              meta: {
                name: 'openaq-api',
                license: 'CC BY 4.0',
                website: 'https://docs.openaq.org/',
                page: 1,
                limit: 100,
                found: 0
              },
              results: []
            }
          })
        }
      }

      await actions.GET_COUNTRIES({ commit })

      expect(commit).toHaveBeenCalledTimes(0)
    })

    it('should handle network errors when calling API', async () => {
      actions.$axios = {
        get: () => {
          return Promise.reject(new Error('Network Error'))
        }
      }

      await actions
        .GET_COUNTRIES({ commit })
        .catch((err) => expect(err).toBeDefined())

      expect(commit).toHaveBeenCalledTimes(0)
    })
  })

  describe('Action GET_MEASUREMENTS', () => {
    it('should retrieve measurements from API and making a commit to the store', async () => {
      actions.$axios = {
        get: () => {
          return Promise.resolve({
            status: 200,
            data: {
              meta: {
                name: 'openaq-api',
                license: 'CC BY 4.0',
                website: 'https://docs.openaq.org/',
                page: 1,
                limit: 100,
                found: 868886424
              },
              results: [
                {
                  location: 'DEBY118',
                  parameter: 'no2',
                  date: {
                    utc: '2018-01-01T00:00:00Z',
                    local: '2018-01-01T01:00:00+01:00'
                  },
                  value: 26.13,
                  unit: 'µg/m³',
                  coordinates: {
                    latitude: 48.573629,
                    longitude: 13.422039
                  },
                  country: 'DE',
                  city: 'Bayern'
                },
                {
                  location: 'תחנה:ניידת חיפה',
                  parameter: 'o3',
                  date: {
                    utc: '2018-01-01T00:00:00Z',
                    local: '2018-01-01T02:00:00+02:00'
                  },
                  value: 0.0278,
                  unit: 'ppm',
                  coordinates: {
                    latitude: 31.14502,
                    longitude: 34.82837
                  },
                  country: 'IL',
                  city: 'צפון הנגב'
                },
                {
                  location: 'DEST090',
                  parameter: 'so2',
                  date: {
                    utc: '2018-01-01T00:00:00Z',
                    local: '2018-01-01T01:00:00+01:00'
                  },
                  value: 21.83,
                  unit: 'µg/m³',
                  coordinates: {
                    latitude: 51.321364,
                    longitude: 12.032141
                  },
                  country: 'DE',
                  city: 'Sachsen-Anhalt'
                }
              ]
            }
          })
        }
      }

      await actions.GET_MEASUREMENTS({ commit }, { page: 1 })

      expect(commit).toHaveBeenCalledWith('APPEND_MEASUREMENTS', [
        {
          location: 'DEBY118',
          parameter: 'no2',
          date: {
            utc: '2018-01-01T00:00:00Z',
            local: '2018-01-01T01:00:00+01:00'
          },
          value: 26.13,
          unit: 'µg/m³',
          coordinates: {
            latitude: 48.573629,
            longitude: 13.422039
          },
          country: 'DE',
          city: 'Bayern'
        },
        {
          location: 'תחנה:ניידת חיפה',
          parameter: 'o3',
          date: {
            utc: '2018-01-01T00:00:00Z',
            local: '2018-01-01T02:00:00+02:00'
          },
          value: 0.0278,
          unit: 'ppm',
          coordinates: {
            latitude: 31.14502,
            longitude: 34.82837
          },
          country: 'IL',
          city: 'צפון הנגב'
        },
        {
          location: 'DEST090',
          parameter: 'so2',
          date: {
            utc: '2018-01-01T00:00:00Z',
            local: '2018-01-01T01:00:00+01:00'
          },
          value: 21.83,
          unit: 'µg/m³',
          coordinates: {
            latitude: 51.321364,
            longitude: 12.032141
          },
          country: 'DE',
          city: 'Sachsen-Anhalt'
        }
      ])
    })

    it('should not send API request when no page index is in paras defined', async () => {
      await actions.GET_MEASUREMENTS({ commit }, {})
      await actions.GET_MEASUREMENTS({ commit }, { page: 0 })
      await actions.GET_MEASUREMENTS({ commit }, { page: null })

      expect(commit).toHaveBeenCalledTimes(0)
    })

    it('should set request params correctly', async () => {
      actions.$axios = {
        get: (url) => {
          expect(url).toBe(
            '/api.openaq.org/v1/measurements?page=1&country=CH&city=Aargau&order_by[]=country&order_by[]=city&sort[]=desc&sort[]=asc'
          )
          return Promise.resolve({ status: 204 })
        }
      }

      await actions.GET_MEASUREMENTS(
        { commit },
        {
          page: 1,
          country: 'CH',
          city: 'Aargau',
          sortedBy: ['country', 'city'],
          sortedDesc: [true, false]
        }
      )

      expect(commit).toHaveBeenCalledTimes(0)
    })

    it('should handle response with empty result when calling API', async () => {
      actions.$axios = {
        get: () => {
          return Promise.resolve({
            status: 200,
            data: {
              meta: {
                name: 'openaq-api',
                license: 'CC BY 4.0',
                website: 'https://docs.openaq.org/',
                page: 1,
                limit: 100,
                found: 0
              },
              results: []
            }
          })
        }
      }

      await actions.GET_MEASUREMENTS({ commit }, { page: 1 })

      expect(commit).toHaveBeenCalledTimes(0)
    })

    it('should handle network errors when calling API', async () => {
      actions.$axios = {
        get: () => {
          return Promise.reject(new Error('Network Error'))
        }
      }

      await actions
        .GET_MEASUREMENTS({ commit }, { page: 1 })
        .catch((err) => expect(err).toBeDefined())

      expect(commit).toHaveBeenCalledTimes(0)
    })
  })

  describe('Action GET_PARAMETERS', () => {
    it('should retrieve parameters from API and making a commit to the store', async () => {
      actions.$axios = {
        get: () => {
          return Promise.resolve({
            status: 200,
            data: {
              meta: {
                name: 'openaq-api',
                license: 'CC BY 4.0',
                website: 'https://docs.openaq.org/'
              },
              results: [
                {
                  id: 'bc',
                  name: 'BC',
                  description: 'Black Carbon',
                  preferredUnit: 'µg/m³'
                },
                {
                  id: 'co',
                  name: 'CO',
                  description: 'Carbon Monoxide',
                  preferredUnit: 'ppm'
                },
                {
                  id: 'no2',
                  name: 'NO2',
                  description: 'Nitrogen Dioxide',
                  preferredUnit: 'ppm'
                },
                {
                  id: 'o3',
                  name: 'O3',
                  description: 'Ozone',
                  preferredUnit: 'ppm'
                },
                {
                  id: 'pm10',
                  name: 'PM10',
                  description:
                    'Particulate matter less than 10 micrometers in diameter',
                  preferredUnit: 'µg/m³'
                },
                {
                  id: 'pm25',
                  name: 'PM2.5',
                  description:
                    'Particulate matter less than 2.5 micrometers in diameter',
                  preferredUnit: 'µg/m³'
                },
                {
                  id: 'so2',
                  name: 'SO2',
                  description: 'Sulfur Dioxide',
                  preferredUnit: 'ppm'
                }
              ]
            }
          })
        }
      }

      await actions.GET_PARAMETERS({ commit })

      expect(commit).toHaveBeenCalledWith('SET_PARAMETERS', [
        {
          id: 'bc',
          name: 'BC',
          description: 'Black Carbon',
          preferredUnit: 'µg/m³'
        },
        {
          id: 'co',
          name: 'CO',
          description: 'Carbon Monoxide',
          preferredUnit: 'ppm'
        },
        {
          id: 'no2',
          name: 'NO2',
          description: 'Nitrogen Dioxide',
          preferredUnit: 'ppm'
        },
        {
          id: 'o3',
          name: 'O3',
          description: 'Ozone',
          preferredUnit: 'ppm'
        },
        {
          id: 'pm10',
          name: 'PM10',
          description:
            'Particulate matter less than 10 micrometers in diameter',
          preferredUnit: 'µg/m³'
        },
        {
          id: 'pm25',
          name: 'PM2.5',
          description:
            'Particulate matter less than 2.5 micrometers in diameter',
          preferredUnit: 'µg/m³'
        },
        {
          id: 'so2',
          name: 'SO2',
          description: 'Sulfur Dioxide',
          preferredUnit: 'ppm'
        }
      ])
    })

    it('should handle response with empty result when calling API', async () => {
      actions.$axios = {
        get: () => {
          return Promise.resolve({
            status: 200,
            data: {
              meta: {
                name: 'openaq-api',
                license: 'CC BY 4.0',
                website: 'https://docs.openaq.org/',
                page: 1,
                limit: 100,
                found: 0
              },
              results: []
            }
          })
        }
      }

      await actions.GET_PARAMETERS({ commit })

      expect(commit).toHaveBeenCalledTimes(0)
    })

    it('should handle network errors when calling API', async () => {
      actions.$axios = {
        get: () => {
          return Promise.reject(new Error('Network Error'))
        }
      }

      await actions
        .GET_PARAMETERS({ commit })
        .catch((err) => expect(err).toBeDefined())

      expect(commit).toHaveBeenCalledTimes(0)
    })
  })
})
