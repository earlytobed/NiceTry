<template>
  <v-main class="display-page">
    <v-container fill-height fluid>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="mx-auto" max-width="1344">
            <v-card-text>
              <div v-html="PageData"></div>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="deep-purple accent-4"> Learn More </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script>
import AuthService from "@/services/auth.service";
export default {
  data() {
    return {
      PageData: "",
    };
  },
  methods: {
    queryPageData() {
      AuthService.getFAQ().then((response) => {
        this.PageData = response.FAQ;
      });
    },
  },
  mounted() {
    this.queryPageData();
  },
};
</script>

<style scoped>
.display-page {
  text-align: left;
}
</style>
