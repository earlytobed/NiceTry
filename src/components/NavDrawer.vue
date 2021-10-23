<template>
  <v-navigation-drawer
    v-model="drawer"
    :clipped="$vuetify.breakpoint.lgAndUp"
    app
  >
    <v-list dense>
      <v-list-item v-if="currentUser" three-line id="user-tile">
        <v-badge
          bordered
          bottom
          color="green accent-4"
          dot
          offset-x="25"
          offset-y="55"
        >
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/men/81.jpg" />
          </v-list-item-avatar>
        </v-badge>

        <v-list-item-content>
          <v-list-item-title
            >{{ currentUser.username }} (Insane)</v-list-item-title
          >
          <v-list-item-subtitle>
            <v-icon x-small>fa-balance-scale</v-icon> 1926.8
            <v-icon x-small>fa-magic</v-icon> 1926.8 M
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            <v-icon small>mdi-arrow-up-bold-circle-outline</v-icon>
            {{ currentUser.uploaded }}
            <v-icon small>mdi-arrow-down-bold-circle-outline</v-icon>
            {{ currentUser.downloaded }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <template v-for="item in items">
        <v-row v-if="item.heading" :key="item.heading" align="center">
          <v-col cols="6">
            <v-subheader v-if="item.heading">
              {{ item.heading }}
            </v-subheader>
          </v-col>
          <v-col cols="6" class="text-center">
            <a href="#!" class="body-2 black--text">EDIT</a>
          </v-col>
        </v-row>
        <v-list-group
          v-else-if="item.children"
          :key="item.text"
          v-model="item.model"
          :prepend-icon="item.model ? item.icon : item['icon-alt']"
          append-icon=""
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item v-for="(child, i) in item.children" :key="i" link>
            <v-list-item-action v-if="child.icon">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ child.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item v-else :key="item.text" :to="item.route" link>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  computed: {
    drawer: {
      get() {
        return this.$store.state.sidebar;
      },
      set(val) {
        this.$store.commit("sidebar", val);
      },
    },
    currentUser() {
      return JSON.parse(this.$store.state.auth.userinfo);
    },
    items: {
      get() {
        return this.$store.state.sidebarItems;
      },
      set(val) {
        this.$store.commit("sidebarItems", val);
      },
    },
  },
};
</script>

<style>
#user-tile {
  padding: 0 16px 0 0;
}
</style>
