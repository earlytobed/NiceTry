<template>
  <v-app>
    <transition mode="out-in">
      <router-view />
    </transition>
  </v-app>
</template>

<script>
export default {
  name: "LoginHome",
  created() {
    this.$store.state.sidebarItems = [
      { icon: "mdi-account-outline", text: "Login", route: "/" },
      {
        icon: "mdi-account-plus-outline",
        text: "Register",
        route: "/register",
      },
      { icon: "mdi-cog-outline", text: "Preference", route: "/settings" },
    ];
  },
};
</script>
