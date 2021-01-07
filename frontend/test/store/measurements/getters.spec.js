import getters from '@/store/measurements/getters'

describe('VUEX getters of the measurements module', () => {
  describe('Getter getCities', () => {
    it('should return the cities belonging to a country', () => {
      const state = {
        cities: [
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

      expect(getters.getCities(state)('AD')).toEqual([
        {
          city: 'Escaldes-Engordany',
          name: 'Escaldes-Engordany'
        },
        {
          city: 'unused',
          name: 'unused'
        }
      ])

      expect(getters.getCities(state)('CH')).toEqual([])
    })
  })

  describe('Getter getCountries', () => {
    it('should return the countries', () => {
      const state = {
        countries: [
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

      expect(getters.getCountries(state)).toEqual([
        {
          code: 'AD',
          name: 'Andorra'
        },
        {
          code: 'AE',
          name: 'United Arab Emirates'
        },
        {
          code: 'AF',
          name: 'Afghanistan'
        }
      ])
    })
  })

  describe('Getter getMeasurements', () => {
    it('should return the measurements', () => {
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

      expect(getters.getMeasurements(state)).toEqual([
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
  })

  describe('Getter getParameter', () => {
    it('should return the parameter for a given id', () => {
      const state = {
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

      expect(getters.getParameter(state)('no2')).toEqual({
        id: 'no2',
        name: 'NO2',
        description: 'Nitrogen Dioxide',
        preferredUnit: 'ppm'
      })

      expect(getters.getParameter(state)('notdefined')).toBeNull()
    })
  })
})
