<template>
  <v-app>
    <transition mode="out-in">
        <router-view/>
    </transition>
  </v-app>
</template>

<script>
export default {
  name: 'LoginHome',
  created () {
      this.$store.state.sidebarItems = [
          { icon: 'mdi-account', text: 'Login', route: '/' },
          { icon: 'mdi-settings', text: 'Preference', route: '/register' },
      ]
  }
}
</script>
