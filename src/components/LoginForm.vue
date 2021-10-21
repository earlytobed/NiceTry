<template>
  <v-main>
    <BackgroundImage />
    <v-container fill-height fluid>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <ValidationObserver ref="obs">
            <v-card class="elevation-12" slot-scope="{ invalid, validated }">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login Form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <ValidationProvider
                    name="Username"
                    rules="required|minmax:0, 20"
                  >
                    <v-text-field
                      slot-scope="{ errors, valid }"
                      prepend-icon="mdi-account"
                      v-model="user.username"
                      :counter="20"
                      :error-messages="errors"
                      :success="valid"
                      label="Username"
                      required
                    ></v-text-field>
                  </ValidationProvider>
                  <ValidationProvider
                    name="Password"
                    rules="required|minmax:1, 30"
                  >
                    <v-text-field
                      slot-scope="{ errors, valid }"
                      prepend-icon="mdi-lock"
                      v-model="user.password"
                      :error-messages="errors"
                      :success="valid"
                      :counter="30"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show1 ? 'text' : 'password'"
                      label="Password"
                      @click:append="show1 = !show1"
                      required
                    ></v-text-field>
                  </ValidationProvider>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" @click="register">Register</v-btn>
                <v-spacer></v-spacer>
                <v-btn @click="clear">Clear</v-btn>
                <v-btn
                  color="primary"
                  @click="submit"
                  :disabled="invalid || !validated"
                  >Login</v-btn
                >
              </v-card-actions>
            </v-card>
          </ValidationObserver>
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script>
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";

import { required, email } from "vee-validate/dist/rules";

import BackgroundImage from "./BackgroundImage.vue";

import User from "../models/user";

extend("email", email);

extend("minmax", {
  validate(value, { min, max }) {
    return value.length >= min && value.length <= max;
  },
  params: ["min", "max"],
});

extend("required", {
  ...required,
  message: "This field is required",
});

export default {
  data: () => ({
    show1: false,
    user: new User("", ""),
  }),
  created() {
    if (this.userStatus) {
      this.$router.push("/torrents");
    }
  },
  components: {
    ValidationProvider,
    ValidationObserver,
    BackgroundImage,
  },
  computed: {
    userStatus() {
      return this.$store.getters["auth/authorized"];
    },
  },
  methods: {
    register() {
      this.$router.push("/register");
      this.snackbar = true;
    },
    async clear() {
      this.username = this.password = "";
      this.$nextTick(() => {
        this.$refs.obs.reset();
      });
    },
    submit() {
      this.$store.dispatch("auth/login", this.user).then(
        () => {
          this.$router.push("/torrents");
        },
        (error) => {
          this.message =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
};
</script>
