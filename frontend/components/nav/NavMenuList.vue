<template>
  <v-list dense>
    <v-list-item
      v-for="item in items"
      :key="item.id"
      :to="item.route"
      color="accent"
      exact
      router
    >
      <v-list-item-action>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>
          <span class="font-weight-bold">{{ item.text }}</span>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  computed: {
    items() {
      return [
        {
          icon: 'mdi-home',
          id: '1',
          route: '/',
          text: this.$t('common.home')
        }
      ]
    }
  }
}
</script>
