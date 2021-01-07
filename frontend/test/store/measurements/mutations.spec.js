import mutations from '@/store/measurements/mutations'

describe('VUEX mutations of the measurements module', () => {
  describe('Mutation APPEND_MEASUREMENTS', () => {
    it('should append measurements to the store', () => {
      const state = {
        measurements: [
          {
            location: 'DEBY118',
            parameter: 'no2',
            date: '2018-01-01T01:00:00+01:00',
            value: 26.13,
            unit: 'µg/m³',
            latitude: 48.573629,
            longitude: 13.422039,
            country: 'DE',
            city: 'Bayern'
          },
          {
            location: 'תחנה:ניידת חיפה',
            parameter: 'o3',
            date: '2018-01-01T02:00:00+02:00',
            value: 0.0278,
            unit: 'ppm',

            latitude: 31.14502,
            longitude: 34.82837,
            country: 'IL',
            city: 'צפון הנגב'
          },
          {
            location: 'DEST090',
            parameter: 'so2',
            date: '2018-01-01T01:00:00+01:00',
            value: 21.83,
            unit: 'µg/m³',

            latitude: 51.321364,
            longitude: 12.032141,
            country: 'DE',
            city: 'Sachsen-Anhalt'
          }
        ]
      }

      const payload = [
        {
          location: 'Kembla Grange',
          parameter: 'o3',
          date: {
            utc: '2018-01-01T00:00:00Z',
            local: '2018-01-01T11:00:00+11:00'
          },
          value: 0.021,
          unit: 'ppm',
          coordinates: {
            latitude: -34.4763889,
            longitude: 150.8175
          },
          country: 'AU',
          city: 'Illawarra'
        },
        {
          location: 'DEBE051',
          parameter: 'pm10',
          date: {
            utc: '2018-01-01T00:00:00Z',
            local: '2018-01-01T01:00:00+01:00'
          },
          value: 59.15,
          unit: 'µg/m³',
          country: 'DE',
          city: 'Berlin'
        }
      ]

      mutations.APPEND_MEASUREMENTS(state, payload)

      expect(state.measurements).toEqual([
        {
          location: 'DEBY118',
          parameter: 'no2',
          date: '2018-01-01T01:00:00+01:00',
          value: 26.13,
          unit: 'µg/m³',
          latitude: 48.573629,
          longitude: 13.422039,
          country: 'DE',
          city: 'Bayern'
        },
        {
          location: 'תחנה:ניידת חיפה',
          parameter: 'o3',
          date: '2018-01-01T02:00:00+02:00',
          value: 0.0278,
          unit: 'ppm',
          latitude: 31.14502,
          longitude: 34.82837,
          country: 'IL',
          city: 'צפון הנגב'
        },
        {
          location: 'DEST090',
          parameter: 'so2',
          date: '2018-01-01T01:00:00+01:00',
          value: 21.83,
          unit: 'µg/m³',
          latitude: 51.321364,
          longitude: 12.032141,
          country: 'DE',
          city: 'Sachsen-Anhalt'
        },
        {
          location: 'Kembla Grange',
          parameter: 'o3',
          date: '2018-01-01T11:00:00+11:00',
          value: 0.021,
          unit: 'ppm',
          latitude: -34.4763889,
          longitude: 150.8175,
          country: 'AU',
          city: 'Illawarra'
        },
        {
          location: 'DEBE051',
          parameter: 'pm10',
          date: '2018-01-01T01:00:00+01:00',
          value: 59.15,
          unit: 'µg/m³',
          country: 'DE',
          city: 'Berlin'
        }
      ])
    })

    it('should not append measurements to the store when payload is not an array or an empty array', () => {
      const state = {
        measurements: []
      }

      mutations.APPEND_MEASUREMENTS(state, {})
      mutations.APPEND_MEASUREMENTS(state, [])
      mutations.APPEND_MEASUREMENTS(state, 'test')

      expect(state.measurements).toEqual([])
    })
  })

  describe('Mutation CLEAR', () => {
    it('should set the store items cities, countries, parameters to initial value', () => {
      const state = {
        cities: [
          {
            country: 'CH',
            name: 'Aargau',
            city: 'Aargau',
            count: 4173,
            locations: 1
          },
          {
            country: 'CH',
            name: 'Basel-Landschaft',
            city: 'Basel-Landschaft',
            count: 177117,
            locations: 1
          },
          {
            country: 'CH',
            name: 'Basel-Stadt',
            city: 'Basel-Stadt',
            count: 167551,
            locations: 2
          }
        ],
        countries: [
          {
            code: 'BD',
            count: 235915,
            locations: 2,
            cities: 1,
            name: 'Bangladesh'
          },
          {
            code: 'BE',
            count: 1961062,
            locations: 198,
            cities: 14,
            name: 'Belgium'
          },
          {
            code: 'BG',
            count: 1294059,
            locations: 25,
            cities: 17,
            name: 'Bulgaria'
          }
        ],
        parameters: [
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

      mutations.CLEAR(state)

      expect(state.cities).toEqual([])
      expect(state.countries).toEqual([])
      expect(state.parameters).toEqual([])
    })
  })

  describe('Mutation RESET_MEASUREMENTS', () => {
    it('should clear the measurements from store', () => {
      const state = {
        measurements: [
          {
            location: 'DEBY118',
            parameter: 'no2',
            date: '2018-01-01T01:00:00+01:00',
            value: 26.13,
            unit: 'µg/m³',
            latitude: 48.573629,
            longitude: 13.422039,
            country: 'DE',
            city: 'Bayern'
          },
          {
            location: 'תחנה:ניידת חיפה',
            parameter: 'o3',
            date: '2018-01-01T02:00:00+02:00',
            value: 0.0278,
            unit: 'ppm',
            latitude: 31.14502,
            longitude: 34.82837,
            country: 'IL',
            city: 'צפון הנגב'
          },
          {
            location: 'DEST090',
            parameter: 'so2',
            date: '2018-01-01T01:00:00+01:00',
            value: 21.83,
            unit: 'µg/m³',
            latitude: 51.321364,
            longitude: 12.032141,
            country: 'DE',
            city: 'Sachsen-Anhalt'
          },
          {
            location: 'Kembla Grange',
            parameter: 'o3',
            date: '2018-01-01T11:00:00+11:00',
            value: 0.021,
            unit: 'ppm',
            latitude: -34.4763889,
            longitude: 150.8175,
            country: 'AU',
            city: 'Illawarra'
          },
          {
            location: 'DEBE051',
            parameter: 'pm10',
            date: '2018-01-01T01:00:00+01:00',
            value: 59.15,
            unit: 'µg/m³',
            country: 'DE',
            city: 'Berlin'
          }
        ]
      }

      mutations.RESET_MEASUREMENTS(state)

      expect(state.measurements).toEqual([])
    })
  })

  describe('Mutation SET_CITIES', () => {
    it('should set cities to the store', () => {
      const state = {
        cities: []
      }

      const payload = [
        {
          country: 'CH',
          name: 'Aargau',
          city: 'Aargau',
          count: 4173,
          locations: 1
        },
        {
          country: 'CH',
          name: 'Basel-Landschaft',
          city: 'Basel-Landschaft',
          count: 177117,
          locations: 1
        },
        {
          country: 'CH',
          name: 'Basel-Stadt',
          city: 'Basel-Stadt',
          count: 167551,
          locations: 2
        }
      ]

      mutations.SET_CITIES(state, payload)

      expect(state.cities).toEqual([
        {
          country: 'CH',
          name: 'Aargau',
          city: 'Aargau',
          count: 4173,
          locations: 1
        },
        {
          country: 'CH',
          name: 'Basel-Landschaft',
          city: 'Basel-Landschaft',
          count: 177117,
          locations: 1
        },
        {
          country: 'CH',
          name: 'Basel-Stadt',
          city: 'Basel-Stadt',
          count: 167551,
          locations: 2
        }
      ])
    })

    it('should not set cities to the store when payload is not an array or an empty array', () => {
      const state = {
        cities: []
      }

      mutations.SET_CITIES(state, {})
      mutations.SET_CITIES(state, [])
      mutations.SET_CITIES(state, 'test')

      expect(state.cities).toEqual([])
    })
  })

  describe('Mutation SET_COUNTRIES', () => {
    it('should set countries to the store', () => {
      const state = {
        countries: []
      }

      const payload = [
        {
          code: 'BD',
          count: 235915,
          locations: 2,
          cities: 1,
          name: 'Bangladesh'
        },
        {
          code: 'BE',
          count: 1961062,
          locations: 198,
          cities: 14,
          name: 'Belgium'
        },
        {
          code: 'BG',
          count: 1294059,
          locations: 25,
          cities: 17,
          name: 'Bulgaria'
        }
      ]

      mutations.SET_COUNTRIES(state, payload)

      expect(state.countries).toEqual([
        {
          code: 'BD',
          count: 235915,
          locations: 2,
          cities: 1,
          name: 'Bangladesh'
        },
        {
          code: 'BE',
          count: 1961062,
          locations: 198,
          cities: 14,
          name: 'Belgium'
        },
        {
          code: 'BG',
          count: 1294059,
          locations: 25,
          cities: 17,
          name: 'Bulgaria'
        }
      ])
    })

    it('should not set countries to the store when payload is not an array or an empty array', () => {
      const state = {
        countries: []
      }

      mutations.SET_COUNTRIES(state, {})
      mutations.SET_COUNTRIES(state, [])
      mutations.SET_COUNTRIES(state, 'test')

      expect(state.countries).toEqual([])
    })
  })

  describe('Mutation SET_PARAMETERS', () => {
    it('should set parameters to the store', () => {
      const state = {
        parameters: []
      }

      const payload = [
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

      mutations.SET_PARAMETERS(state, payload)

      expect(state.parameters).toEqual([
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

    it('should not set parameters to the store when payload is not an array or an empty array', () => {
      const state = {
        parameters: []
      }

      mutations.SET_PARAMETERS(state, {})
      mutations.SET_PARAMETERS(state, [])
      mutations.SET_PARAMETERS(state, 'test')

      expect(state.parameters).toEqual([])
    })
  })
})
