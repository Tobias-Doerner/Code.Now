import Vue from 'vue'
import Vuetify from 'vuetify'
import { createLocalVue, mount } from '@vue/test-utils'
import { setupI18n } from '@/test/i18n'
import { setupVuetify } from '@/test/vuetify'

import Index from '@/pages/index.vue'

Vue.use(Vuetify)
const localVue = createLocalVue()
const i18n = setupI18n(localVue)
const vuetify = setupVuetify(localVue)

describe('index', () => {
  it('snapshot test', () => {
    const cmp = mount(Index, {
      localVue,
      i18n,
      vuetify
    })

    expect(cmp.element).toMatchSnapshot()
  })
})
