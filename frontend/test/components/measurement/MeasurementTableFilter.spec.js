import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import { setupI18n } from '@/test/i18n'
import { setupVuetify } from '@/test/vuetify'

import MeasurementTableFilter from '@/components/measurement/MeasurementTableFilter'

Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(Vuex)
const i18n = setupI18n(localVue)
const vuetify = setupVuetify(localVue)

describe('MeasurementTableFilter.vue', () => {
  const state = {}
  const getters = {
    'measurements/getCities': () => (code) => {
      if (code === 'CH') {
        return [
          { city: 'Bern', name: 'Bern' },
          { city: 'Genève', name: 'Genève' },
          { city: 'Lucerne', name: 'Lucerne' }
        ]
      } else {
        return []
      }
    },
    'measurements/getCountries': () => {
      return [
        { code: 'BE', name: 'Belgium' },
        { code: 'BG', name: 'Bulgaria' },
        { code: 'BH', name: 'Bahrain' }
      ]
    }
  }
  const mutations = {}
  const actions = {}
  const store = new Vuex.Store({ state, actions, getters, mutations })

  const cmp = shallowMount(MeasurementTableFilter, {
    localVue,
    store,
    i18n,
    vuetify
  })

  describe('computed', () => {
    describe('cities', () => {
      it('should return array of cities', () => {
        cmp.vm.selectedCountry = {
          code: 'CH',
          name: 'Switzerland'
        }
        expect(cmp.vm.cities).toEqual([
          { city: 'Bern', name: 'Bern' },
          { city: 'Genève', name: 'Genève' },
          { city: 'Lucerne', name: 'Lucerne' }
        ])
      })

      it('should return empty array of cities', () => {
        cmp.vm.selectedCountry = {
          code: 'DE',
          name: 'Germany'
        }
        expect(cmp.vm.cities).toEqual([])
      })
    })

    describe('countries', () => {
      it('should return array of countries', () => {
        expect(cmp.vm.countries).toEqual([
          { code: 'BE', name: 'Belgium' },
          { code: 'BG', name: 'Bulgaria' },
          { code: 'BH', name: 'Bahrain' }
        ])
      })
    })
  })

  describe('methods', () => {
    describe('emitFilterChange', () => {
      it('should emit filter:changed event with payload', async () => {
        cmp.vm.selectedCity = null
        cmp.vm.selectedCountry = {
          code: 'CH',
          name: 'Switzerland'
        }
        cmp.vm.emitFilterChange()

        await cmp.vm.$nextTick()

        expect(cmp.emitted('filter:changed')[0]).toEqual([
          { city: null, country: 'CH' }
        ])
      })

      it('should emit filter:changed event with payload', async () => {
        cmp.vm.selectedCity = { city: 'Lucerne', name: 'Lucerne' }
        cmp.vm.selectedCountry = null
        cmp.vm.emitFilterChange()

        await cmp.vm.$nextTick()

        expect(cmp.emitted('filter:changed')[1]).toEqual([
          { city: 'Lucerne', country: null }
        ])
      })

      it('should emit filter:changed event with payload', async () => {
        cmp.vm.selectedCity = { city: 'Lucerne', name: 'Lucerne' }
        cmp.vm.selectedCountry = {
          code: 'CH',
          name: 'Switzerland'
        }
        cmp.vm.emitFilterChange()

        await cmp.vm.$nextTick()

        expect(cmp.emitted('filter:changed')[2]).toEqual([
          { city: 'Lucerne', country: 'CH' }
        ])
      })

      it('should emit filter:changed event with payload', async () => {
        cmp.vm.selectedCity = null
        cmp.vm.selectedCountry = null
        cmp.vm.emitFilterChange()

        await cmp.vm.$nextTick()

        expect(cmp.emitted('filter:changed')[3]).toEqual([
          { city: null, country: null }
        ])
      })
    })

    describe('handleCityChange', () => {
      it('should call emitFilterChange method', async () => {
        cmp.vm.selectedCity = null
        cmp.vm.selectedCountry = null
        cmp.vm.handleCityChange()

        await cmp.vm.$nextTick()

        expect(cmp.emitted('filter:changed')[4]).toEqual([
          { city: null, country: null }
        ])
      })
    })

    describe('handleCountryChange', () => {
      it('should call handleCountryChange method', async () => {
        cmp.vm.selectedCity = { city: 'Lucerne', name: 'Lucerne' }
        cmp.vm.selectedCountry = {
          code: 'CH',
          name: 'Switzerland'
        }
        cmp.vm.handleCountryChange()

        await cmp.vm.$nextTick()

        expect(cmp.emitted('filter:changed')[5]).toEqual([
          { city: 'Lucerne', country: 'CH' }
        ])
      })

      it('should call handleCountryChange method', async () => {
        cmp.vm.selectedCity = { city: 'Lucerne', name: 'Lucerne' }
        cmp.vm.selectedCountry = null
        cmp.vm.handleCountryChange()

        await cmp.vm.$nextTick()

        expect(cmp.emitted('filter:changed')[6]).toEqual([
          { city: null, country: null }
        ])
      })
    })
  })

  describe('snapshot', () => {
    it('should match snapshot', () => {
      const wrapper = mount(MeasurementTableFilter, {
        localVue,
        store,
        i18n,
        vuetify
      })

      expect(wrapper.element).toMatchSnapshot()
    })
  })
})
