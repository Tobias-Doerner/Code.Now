import actions from '@/store/measurements/actions'
// eslint-disable-next-line no-unused-vars
import { V2Api, MeasOrder, Sort } from 'openaq-api'

jest.mock('openaq-api', () => {
  return {
    MeasOrder: jest.fn(),
    Sort: jest.fn(),
    V2Api: jest.fn()
  }
})

describe('VUEX actions of the measurements module', () => {
  const commit = jest.fn()

  beforeEach(() => {
    commit.mockClear()
  })

  describe('Action GET_CITIES', () => {
    it('should retrieve cities from API and making a commit to the store', async () => {
      V2Api.mockImplementation(() => {
        return {
          citiesGetV2CitiesGet(limit) {
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
                results: [
                  {
                    country: 'US',
                    city: 'ALEXANDER',
                    count: 41224,
                    locations: 1,
                    firstUpdated: '2016-03-28T21:00:00+00:00',
                    lastUpdated: '2020-11-03T15:00:00+00:00',
                    parameters: ['o3', 'pm10']
                  },
                  {
                    country: 'IT',
                    city: 'ALFONSINE',
                    count: 36472,
                    locations: 1,
                    firstUpdated: '2017-11-01T23:00:00+00:00',
                    lastUpdated: '2020-05-05T23:00:00+00:00',
                    parameters: ['no2', 'o3', 'pm25']
                  },
                  {
                    country: 'DZ',
                    city: 'Algiers',
                    count: 33544143,
                    locations: 1,
                    firstUpdated: '2019-06-15T22:00:00+00:00',
                    lastUpdated: '2021-02-01T11:00:00+00:00',
                    parameters: ['pm25']
                  }
                ]
              }
            })
          }
        }
      })

      await actions.GET_CITIES({ commit })

      expect(commit).toHaveBeenCalledWith('SET_CITIES', [
        {
          country: 'US',
          city: 'ALEXANDER',
          count: 41224,
          locations: 1,
          firstUpdated: '2016-03-28T21:00:00+00:00',
          lastUpdated: '2020-11-03T15:00:00+00:00',
          parameters: ['o3', 'pm10']
        },
        {
          country: 'IT',
          city: 'ALFONSINE',
          count: 36472,
          locations: 1,
          firstUpdated: '2017-11-01T23:00:00+00:00',
          lastUpdated: '2020-05-05T23:00:00+00:00',
          parameters: ['no2', 'o3', 'pm25']
        },
        {
          country: 'DZ',
          city: 'Algiers',
          count: 33544143,
          locations: 1,
          firstUpdated: '2019-06-15T22:00:00+00:00',
          lastUpdated: '2021-02-01T11:00:00+00:00',
          parameters: ['pm25']
        }
      ])
    })

    it('should handle response with empty result when calling API', async () => {
      V2Api.mockImplementation(() => {
        return {
          citiesGetV2CitiesGet(limit) {
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
      })

      await actions.GET_CITIES({ commit })

      expect(commit).toHaveBeenCalledTimes(0)
    })

    it('should handle network errors when calling API', async () => {
      V2Api.mockImplementation(() => {
        return {
          citiesGetV2CitiesGet(limit) {
            return Promise.reject(new Error('Network Error'))
          }
        }
      })

      await actions
        .GET_CITIES({ commit })
        .catch((err) => expect(err).toBeDefined())

      expect(commit).toHaveBeenCalledTimes(0)
    })
  })

  describe('Action GET_COUNTRIES', () => {
    it('should retrieve countries from API and making a commit to the store', async () => {
      V2Api.mockImplementation(() => {
        return {
          countriesGetV2CountriesGet(limit) {
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
      })

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
      V2Api.mockImplementation(() => {
        return {
          countriesGetV2CountriesGet(limit) {
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
      })

      await actions.GET_COUNTRIES({ commit })

      expect(commit).toHaveBeenCalledTimes(0)
    })

    it('should handle network errors when calling API', async () => {
      V2Api.mockImplementation(() => {
        return {
          countriesGetV2CountriesGet(limit) {
            return Promise.reject(new Error('Network Error'))
          }
        }
      })

      await actions
        .GET_COUNTRIES({ commit })
        .catch((err) => expect(err).toBeDefined())

      expect(commit).toHaveBeenCalledTimes(0)
    })
  })

  describe('Action GET_MEASUREMENTS', () => {
    it('should retrieve measurements from API and making a commit to the store', async () => {
      V2Api.mockImplementation(() => {
        return {
          measurementsGetV2MeasurementsGet() {
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
                results: [
                  {
                    locationId: 73447,
                    location: 'CO State Univ',
                    parameter: 'um010',
                    value: 0.332,
                    date: {
                      utc: '2021-02-21T12:26:01+00:00',
                      local: '2021-02-21T05:26:01-07:00'
                    },
                    unit: 'particles/cm³',
                    coordinates: {
                      latitude: 40.0347,
                      longitude: -105.2525
                    },
                    country: 'US',
                    city: null,
                    isMobile: false,
                    isAnalysis: false,
                    entity: 'community',
                    sensorType: 'low-cost sensor'
                  },
                  {
                    locationId: 71049,
                    location: '#2',
                    parameter: 'pm10',
                    value: 0,
                    date: {
                      utc: '2021-02-21T12:26:01+00:00',
                      local: '2021-02-21T04:26:01-08:00'
                    },
                    unit: 'µg/m³',
                    coordinates: {
                      latitude: 47.1902,
                      longitude: -122.178
                    },
                    country: 'US',
                    city: null,
                    isMobile: false,
                    isAnalysis: false,
                    entity: 'community',
                    sensorType: 'low-cost sensor'
                  },
                  {
                    locationId: 71608,
                    location: '834 N Claremont St',
                    parameter: 'pm10',
                    value: 3.9,
                    date: {
                      utc: '2021-02-21T12:26:01+00:00',
                      local: '2021-02-21T04:26:01-08:00'
                    },
                    unit: 'µg/m³',
                    coordinates: {
                      latitude: 37.5792,
                      longitude: -122.3342
                    },
                    country: 'US',
                    city: null,
                    isMobile: false,
                    isAnalysis: false,
                    entity: 'community',
                    sensorType: 'low-cost sensor'
                  }
                ]
              }
            })
          }
        }
      })

      await actions.GET_MEASUREMENTS(
        { commit },
        { page: 1, sortedBy: ['date'], sortedDesc: [true] }
      )

      expect(commit).toHaveBeenCalledWith('APPEND_MEASUREMENTS', [
        {
          locationId: 73447,
          location: 'CO State Univ',
          parameter: 'um010',
          value: 0.332,
          date: {
            utc: '2021-02-21T12:26:01+00:00',
            local: '2021-02-21T05:26:01-07:00'
          },
          unit: 'particles/cm³',
          coordinates: {
            latitude: 40.0347,
            longitude: -105.2525
          },
          country: 'US',
          city: null,
          isMobile: false,
          isAnalysis: false,
          entity: 'community',
          sensorType: 'low-cost sensor'
        },
        {
          locationId: 71049,
          location: '#2',
          parameter: 'pm10',
          value: 0,
          date: {
            utc: '2021-02-21T12:26:01+00:00',
            local: '2021-02-21T04:26:01-08:00'
          },
          unit: 'µg/m³',
          coordinates: {
            latitude: 47.1902,
            longitude: -122.178
          },
          country: 'US',
          city: null,
          isMobile: false,
          isAnalysis: false,
          entity: 'community',
          sensorType: 'low-cost sensor'
        },
        {
          locationId: 71608,
          location: '834 N Claremont St',
          parameter: 'pm10',
          value: 3.9,
          date: {
            utc: '2021-02-21T12:26:01+00:00',
            local: '2021-02-21T04:26:01-08:00'
          },
          unit: 'µg/m³',
          coordinates: {
            latitude: 37.5792,
            longitude: -122.3342
          },
          country: 'US',
          city: null,
          isMobile: false,
          isAnalysis: false,
          entity: 'community',
          sensorType: 'low-cost sensor'
        }
      ])
    })

    it('should not send API request when no page index is in paras defined', async () => {
      await actions.GET_MEASUREMENTS({ commit }, {})
      await actions.GET_MEASUREMENTS({ commit }, { page: 0 })
      await actions.GET_MEASUREMENTS({ commit }, { page: null })

      expect(commit).toHaveBeenCalledTimes(0)
    })

    it('should handle response with empty result when calling API', async () => {
      V2Api.mockImplementation(() => {
        return {
          measurementsGetV2MeasurementsGet() {
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
      })

      await actions.GET_MEASUREMENTS(
        { commit },
        { page: 1, sortedBy: ['date'], sortedDesc: [true] }
      )

      expect(commit).toHaveBeenCalledTimes(0)
    })

    it('should handle network errors when calling API', async () => {
      V2Api.mockImplementation(() => {
        return {
          measurementsGetV2MeasurementsGet() {
            return Promise.reject(new Error('Network Error'))
          }
        }
      })

      await actions
        .GET_MEASUREMENTS({ commit }, { page: 1 })
        .catch((err) => expect(err).toBeDefined())

      expect(commit).toHaveBeenCalledTimes(0)
    })
  })

  describe('Action GET_PARAMETERS', () => {
    it('should retrieve parameters from API and making a commit to the store', async () => {
      V2Api.mockImplementation(() => {
        return {
          parametersGetV2ParametersGet(limit) {
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
                    id: 1,
                    name: 'pm10',
                    displayName: 'PM10',
                    description:
                      'Particulate matter less than 10 micrometers in diameter mass concentration',
                    preferredUnit: 'µg/m³',
                    isCore: true,
                    maxColorValue: 275.0
                  },
                  {
                    id: 2,
                    name: 'pm25',
                    displayName: 'PM2.5',
                    description:
                      'Particulate matter less than 2.5 micrometers in diameter mass concentration',
                    preferredUnit: 'µg/m³',
                    isCore: true,
                    maxColorValue: 110.0
                  },
                  {
                    id: 3,
                    name: 'o3',
                    displayName: 'O₃ mass',
                    description: 'Ozone mass concentration',
                    preferredUnit: 'µg/m³',
                    isCore: false,
                    maxColorValue: null
                  },
                  {
                    id: 4,
                    name: 'co',
                    displayName: 'CO mass',
                    description: 'Carbon Monoxide mass concentration',
                    preferredUnit: 'µg/m³',
                    isCore: false,
                    maxColorValue: null
                  }
                ]
              }
            })
          }
        }
      })

      await actions.GET_PARAMETERS({ commit })

      expect(commit).toHaveBeenCalledWith('SET_PARAMETERS', [
        {
          id: 1,
          name: 'pm10',
          displayName: 'PM10',
          description:
            'Particulate matter less than 10 micrometers in diameter mass concentration',
          preferredUnit: 'µg/m³',
          isCore: true,
          maxColorValue: 275.0
        },
        {
          id: 2,
          name: 'pm25',
          displayName: 'PM2.5',
          description:
            'Particulate matter less than 2.5 micrometers in diameter mass concentration',
          preferredUnit: 'µg/m³',
          isCore: true,
          maxColorValue: 110.0
        },
        {
          id: 3,
          name: 'o3',
          displayName: 'O₃ mass',
          description: 'Ozone mass concentration',
          preferredUnit: 'µg/m³',
          isCore: false,
          maxColorValue: null
        },
        {
          id: 4,
          name: 'co',
          displayName: 'CO mass',
          description: 'Carbon Monoxide mass concentration',
          preferredUnit: 'µg/m³',
          isCore: false,
          maxColorValue: null
        }
      ])
    })

    it('should handle response with empty result when calling API', async () => {
      V2Api.mockImplementation(() => {
        return {
          parametersGetV2ParametersGet(limit) {
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
      })

      await actions.GET_PARAMETERS({ commit })

      expect(commit).toHaveBeenCalledTimes(0)
    })

    it('should handle network errors when calling API', async () => {
      V2Api.mockImplementation(() => {
        return {
          parametersGetV2ParametersGet(limit) {
            return Promise.reject(new Error('Network Error'))
          }
        }
      })

      await actions
        .GET_PARAMETERS({ commit })
        .catch((err) => expect(err).toBeDefined())

      expect(commit).toHaveBeenCalledTimes(0)
    })
  })
})
