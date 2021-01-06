<template>
  <v-app>
    <v-app-bar
      :clipped-left="drawer.left.clipped"
      color="heading"
      app
      dense
      fixed
    >
      <v-app-bar-nav-icon
        v-show="isMobile"
        aria-label="Menu"
        @click="drawer.left.model = !drawer.left.model"
      >
        <v-icon color="white">mdi-menu</v-icon>
      </v-app-bar-nav-icon>

      <v-spacer />

      <div class="title white--text">{{ $t('appbar.title') }}</div>

      <v-spacer />

      <v-btn
        aria-label="Settings"
        icon
        @click="drawer.right.model = !drawer.right.model"
      >
        <v-icon color="white">mdi-cog</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer.left.model"
      :clipped="drawer.left.clipped"
      :expand-on-hover="!isMobile"
      :mini-variant="drawer.left.miniVariant"
      :permanent="!isMobile"
      color="menus"
      app
      fixed
      left
    >
      <nav-menu-list />
    </v-navigation-drawer>

    <v-navigation-drawer
      v-model="drawer.right.model"
      :clipped="drawer.right.clipped"
      color="menus"
      app
      right
      temporary
    >
      <nav-menu-settings />
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>

    <the-footer />
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      appBar: {},
      drawer: {
        left: {
          clipped: true,
          miniVariant: false,
          model: false
        },
        right: {
          clipped: false,
          model: false
        }
      }
    }
  },
  computed: {
    isMobile() {
      if (this.$vuetify.breakpoint.mobile) return true
      if (this.$vuetify.breakpoint.name === 'xs') return true

      return false
    }
  }
}
</script>
