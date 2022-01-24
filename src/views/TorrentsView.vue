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
      {
        icon: "mdi-vector-polygon",
        text: "Torrents",
        children: [
          { icon: "mdi-movie-outline", text: "Movies" },
          { icon: "mdi-music-note-outline", text: "Musics" },
        ],
      },
      { icon: "mdi-help-circle-outline", text: "FAQ", route: "/faq" },
      { icon: "mdi-cog-outline", text: "User Settings", route: "/settings" },
      {
        icon: "mdi-file-upload-outline",
        text: "Submit Torrent",
        route: "/submit",
      },
    ];
  },
  computed: {
    currentUser() {
      return AuthService.getUser();
    },
    getCategories() {
      return AuthService.getCategories();
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/");
    }
    this.getCategories;
  },
  methods: {},
};
</script>
