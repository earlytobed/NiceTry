<template>
  <v-app>
    <transition mode="out-in">
      <router-view />
    </transition>
  </v-app>
</template>

<script>
import AuthService from "@/services/auth.service.js";

export default {
  name: "TorrentsView",
  created() {
    this.$store.state.sidebarItems = [
      { icon: "mdi-home-outline", text: "Home Page", route: "/torrents" },
    ];
  },
  computed: {
    currentUser() {
      return AuthService.getUser();
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/");
    }
  },
  methods: {},
};
</script>
