<template>
  <v-autocomplete
    v-model="select"
    append-icon="mdi-magnify"
    :loading="loading"
    :items="items"
    :search-input.sync="search"
    class="mx-4"
    flat
    hide-details
    :label="hottest"
    solo-inverted
  >
    <template v-slot:no-data>
      <v-list-item>
        <v-list-item-title>
          Searching for
          <strong>{{ search }}</strong
          >...
        </v-list-item-title>
      </v-list-item>
    </template>
    <template v-slot:item="{ item }">
      <v-list-item-content>
        <v-list-item-title v-text="item.text"></v-list-item-title>
      </v-list-item-content>
      <v-list-item-action class="hot">
        <v-icon color="red">mdi-fire-circle</v-icon>
        <div class="mx-1">
          {{ item.hot }}
        </div>
      </v-list-item-action>
    </template>
  </v-autocomplete>
</template>

<script>
import AuthService from "../services/auth.service";
export default {
  data() {
    return {
      loading: false,
      items: [],
      search: null,
      select: null,
      states: [],
      hottest: "",
    };
  },
  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
    },
  },
  methods: {
    querySelections(v) {
      this.loading = true;
      setTimeout(() => {
        AuthService.getTrending(v).then((response) => {
          this.items = [];
          response.map((item) => {
            this.items.push({ text: item[0], value: item[0], hot: item[1] });
          });
          this.loading = false;
        });
      }, 500);
    },
  },
  mounted() {
    this.querySelections("");
    setInterval(() => {
      if (this.items.length) {
        this.hottest =
          "Trending: " +
          this.items.at(Math.floor(Math.random() * this.items.length)).text;
      }
    }, 3000);
  },
};
</script>

<style scoped>
.hot {
  width: 60px;
  display: flex;
  flex-direction: row;
}
</style>
