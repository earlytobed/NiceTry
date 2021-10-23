<template>
  <v-main>
    <BackgroundImage />
    <v-container fill-height fluid>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <ValidationObserver ref="obs">
            <v-card class="elevation-12" slot-scope="{ invalid, validated }">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Register Form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <ValidationProvider name="Email" rules="required|email">
                    <v-text-field
                      slot-scope="{ errors, valid }"
                      prepend-icon="mdi-email"
                      v-model="user.email"
                      :error-messages="errors"
                      :success="valid"
                      label="Email"
                      required
                    ></v-text-field>
                  </ValidationProvider>
                  <ValidationProvider
                    name="Username"
                    rules="required|min:3|max:20|name"
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
                    rules="required|min:6|max:30|pass"
                    vid="password"
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
                  <ValidationProvider
                    name="PasswordConfirmation"
                    rules="required|confirmed:password"
                  >
                    <v-text-field
                      slot-scope="{ errors, valid }"
                      prepend-icon="mdi-lock"
                      v-model="password_confirmation"
                      :error-messages="errors"
                      :success="valid"
                      :counter="30"
                      :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show2 ? 'text' : 'password'"
                      label="Password Confirmation"
                      @click:append="show2 = !show2"
                      required
                    ></v-text-field>
                  </ValidationProvider>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" @click="login">Login</v-btn>
                <v-spacer></v-spacer>
                <v-btn @click="clear">Clear</v-btn>
                <v-btn
                  color="primary"
                  @click="submit"
                  :disabled="invalid || !validated"
                  >Register</v-btn
                >
              </v-card-actions>
            </v-card>
          </ValidationObserver>
          <v-dialog v-model="dialog" width="500">
            <v-card>
              <v-card-title class="text-h5 red white--text elevation-5">
                Error
              </v-card-title>

              <v-card-text>
                {{ error_message }}
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="dialog = false">
                  I accept
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script>
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";

import { required, email, confirmed } from "vee-validate/dist/rules";

import BackgroundImage from "./BackgroundImage.vue";

import User from "../models/user";

const USERNAME_REGEX = /^[a-zA-Z0-9_]+$/;
const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).+$/;

extend("email", email);

extend("confirmed", {
  ...confirmed,
  message: "Two passwords aren't consistent.",
});

extend("min", {
  validate(value, { min }) {
    return value.length >= min;
  },
  params: ["min"],
  message: "The {_field_} must have at least {min} characters",
});

extend("max", {
  validate(value, { max }) {
    return value.length <= max;
  },
  params: ["max"],
  message: "The {_field_} must have at most {max} characters",
});

extend("name", {
  validate(value) {
    return USERNAME_REGEX.test(value);
  },
  message:
    "The {_field_} should only contain upper / lower letters / digit / underscore",
});

extend("pass", {
  validate(value) {
    return PASSWORD_REGEX.test(value);
  },
  message:
    "The {_field_} must contain at least a upper letter, a lower letter and a digit",
});

extend("required", {
  ...required,
  message: "This field is required",
});

export default {
  data: () => ({
    show1: false,
    show2: false,
    user: new User("", ""),
    password_confirmation: "",
    dialog: false,
    error_message: "",
  }),
  components: {
    ValidationProvider,
    ValidationObserver,
    BackgroundImage,
  },
  methods: {
    login() {
      this.$router.push("/");
      this.snackbar = true;
    },
    async clear() {
      this.user.username = this.user.password = this.user.email = this.password_confirmation =
        "";
      this.$nextTick(() => {
        this.$refs.obs.reset();
      });
    },
    async submit() {
      await this.$refs.obs.validate();
      this.$store.dispatch("auth/register", this.user).then(
        () => {
          this.$router.push("/");
        },
        (error) => {
          if (error.response.status === 422) {
            return;
          } else if (error.response.status === 409) {
            this.error_message = error.response.data.detail;
            this.dialog = true;
            this.user.username = this.user.email = "";
            return;
          }
        }
      );
    },
  },
};
</script>
