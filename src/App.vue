<template>
  <v-app id="inspire">
    <NavDrawer />
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-app-bar-nav-icon @click.stop="switchDrawer()" />
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">蝴蝶（HUDBT）</span>
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn v-if="currentUser" @click="handleLogout()" icon>
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>
    <router-view />
  </v-app>
</template>

<script>
import NavDrawer from "@/components/NavDrawer.vue";

export default {
  name: "app",
  props: {
    source: String,
  },
  computed: {
    currentUser() {
      return JSON.parse(this.$store.state.auth.userinfo);
    },
  },
  methods: {
    switchDrawer() {
      this.$store.state.sidebar = !this.$store.state.sidebar;
    },
    handleLogout() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/");
    },
  },
  data: () => ({
    dialog: false,
  }),
  components: {
    NavDrawer,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Inter, "SF Pro Display", Roboto, "Ping Fang SC", "Sarasa UI SC",
    "Noto Sans CJK", "Source Han Sans SC", "Source Han Sans CN", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
