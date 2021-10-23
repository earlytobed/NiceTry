<template>
  <v-main>
    <v-app> </v-app>
  </v-main>
</template>

<script>
import AuthService from "@/services/auth.service.js";

export default {
  name: "TorrentsView",
  created() {
    this.$store.state.sidebarItems = [
      { icon: "mdi-home", text: "Home Page", route: "/torrents" },
      {
        icon: "mdi-vector-polygon",
        text: "Torrents",
        children: [
          { icon: "mdi-movie-outline", text: "Movies" },
          { icon: "mdi-music-outline", text: "Musics" },
        ],
      },
      { icon: "mdi-help-circle-outline", text: "FAQ" },
      { icon: "mdi-settings", text: "User Settings", route: "/settings" },
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
