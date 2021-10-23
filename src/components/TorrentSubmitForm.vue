<template>
  <v-main>
    <v-container fill-height fluid>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md10>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Torrent Submit</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-stepper v-model="e1">
                <v-stepper-header>
                  <v-stepper-step :complete="e1 > 1" step="1">
                    Upload Torrent File
                  </v-stepper-step>

                  <v-divider></v-divider>

                  <v-stepper-step :complete="e1 > 2" step="2">
                    Torrent Detail
                  </v-stepper-step>

                  <v-divider></v-divider>

                  <v-stepper-step step="3">
                    Result
                  </v-stepper-step>
                </v-stepper-header>

                <v-stepper-items>
                  <ValidationObserver ref="obs1">
                    <v-stepper-content
                      step="1"
                      slot-scope="{ invalid, validated }"
                    >
                      <v-form>
                        <ValidationProvider
                          rules="required|mimes:application/x-bittorrent"
                        >
                          <v-file-input
                            :disabled="uploaded"
                            slot-scope="{ errors, valid }"
                            v-model="torrentfile"
                            :error-messages="errors"
                            :success="valid"
                            accept="application/x-bittorrent"
                            label="Please upload your torrent file"
                          ></v-file-input>
                        </ValidationProvider>
                      </v-form>

                      <!-- <v-card-actions>
                      <v-btn color="primary" @click="login">Login</v-btn>
                      <v-spacer></v-spacer>
                      <v-btn @click="clear">Clear</v-btn>
                      <v-btn
                        color="primary"
                        @click="submit"
                        :disabled="invalid || !validated"
                        >Register</v-btn
                      >
                    </v-card-actions> -->
                      <!-- TODO: Better Implementation -->
                      <div class: buttonGroup>
                        <v-btn
                          color="primary"
                          v-if="!uploaded"
                          @click="submitFile()"
                          :loading="uploading"
                          :disabled="invalid || !validated || uploading"
                        >
                          Upload
                        </v-btn>
                        <v-btn
                          color="primary"
                          v-if="uploaded"
                          @click="e1 = 2"
                          :disabled="invalid || !validated"
                        >
                          Next
                        </v-btn>
                        <!-- TODO: Notify server delete file id and cache -->
                        <v-btn
                          v-if="uploaded"
                          @click="clearFile()"
                          color="error"
                        >
                          Clear
                        </v-btn>
                      </div>
                    </v-stepper-content>
                  </ValidationObserver>

                  <v-stepper-content step="2">
                    <ValidationObserver ref="obs2">
                      <v-form>
                        <ValidationProvider name="Title" rules="required">
                          <v-text-field
                            slot-scope="{ errors, valid }"
                            prepend-icon="mdi-email"
                            v-model="torrent.name"
                            :error-messages="errors"
                            :success="valid"
                            label="Title"
                            required
                          ></v-text-field>
                        </ValidationProvider>
                        <ValidationProvider name="Sub-Title" rules="required">
                          <v-text-field
                            slot-scope="{ errors, valid }"
                            prepend-icon="mdi-account"
                            v-model="torrent.subname"
                            :counter="20"
                            :error-messages="errors"
                            :success="valid"
                            label="Sub-Title"
                            required
                          ></v-text-field>
                        </ValidationProvider>
                        <!-- TODO: Regex for IMDB link match -->
                        <ValidationProvider name="IMDB Link">
                          <v-text-field
                            slot-scope="{ errors, valid }"
                            prepend-icon="mdi-lock"
                            v-model="torrent.imdb_link"
                            :error-messages="errors"
                            :success="valid"
                            :counter="30"
                            label="IMDB Link"
                          ></v-text-field>
                        </ValidationProvider>
                      </v-form>
                      <div justify-space-around class: buttonGroup>
                        <v-btn color="primary" @click="submitTorrent()">
                          Submit
                        </v-btn>

                        <v-btn text @click="e1 = 1">
                          Back
                        </v-btn>
                      </div>
                    </ValidationObserver>

                  </v-stepper-content>

                  <v-stepper-content step="3">
                    <v-card
                      class="mb-12"
                      color="grey lighten-1"
                      height="200px"
                    >
                      {{ result }}
                    </v-card>

                    <v-btn color="primary" @click="e1 = 1">
                      Continue
                    </v-btn>

                    <v-btn text @click="e1 = 2">
                      Back
                    </v-btn>
                  </v-stepper-content>
                </v-stepper-items>
              </v-stepper>
            </v-card-text>
          </v-card>

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

import { required, email, confirmed, mimes } from "vee-validate/dist/rules";

import Torrent from "../models/torrent";

import UploadService from "../services/upload.service";
import AuthService from "../services/auth.service";

const USERNAME_REGEX = /^[a-zA-Z0-9_]+$/;
const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).+$/;

extend("email", email);

extend("mimes", {
  ...mimes,
  message: "Please select a valid torrent file.",
});

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
    e1: 1,
    torrent: new Torrent("", "", "", "", 0, "", ""),
    torrentfile: "",
    dialog: false,
    error_message: "",
    uploaded: false,
    uploading: false,
    result: "",
  }),
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  methods: {
    async submitFile() {
      await this.$refs.obs1.validate();
      let torrentFile = new FormData();
      torrentFile.append("file", this.torrentfile);
      this.uploading = true;
      UploadService.upload(torrentFile).then((response) => {
        this.torrent.name = response.name;
        this.torrent.file_id = response.id;
        this.uploaded = true;
        this.uploading = false;
        this.e1 = 2;
      }).catch((error) => {
        if (error) {
          this.uploading = false;
          this.uploaded = false;
          return;
        }
      });
    },
    async clearFile() {
      this.torrentfile = "";
      this.uploaded = false;
      this.torrent = new Torrent("", "", "", "", "", "", "");
    },
    async submitTorrent() {
      await this.$refs.obs2.validate();
      AuthService.session.post("/api/torrent/create_torrent", this.torrent, {})
      // TODO: Torrent already exists
      .then(response => {
          if (response.status == 200) {
            console.log(response);
            AuthService.session.get("/api/torrent/torrent_detail/" + response.data.id).then(response => {
              this.result = JSON.stringify(response.data);
            })
            this.e1 = 3;
          }
      })
      .catch(error => {
        console.log(error);
      });
    },
  },
};
</script>

<style scoped>
  .buttonGroup {
    justify-content: space-around;
    display: flex;
    margin: auto;
    max-width: 200pt;
  }
</style>
