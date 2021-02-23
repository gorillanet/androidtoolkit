<template>
    <v-container>
      <v-container>
        <h3>Install APK</h3>
        <v-file-input
          truncate-length="30"
          id="filebox_apk"
          prepend-icon="mdi-desktop-mac"
        ></v-file-input>
        <v-btn
          v-bind:disabled="this.$store.getters.isDeviceInactive"
          elevation="2"
          color="primary"
          @click="install_apk"
        >Dispatch</v-btn>
      </v-container>
        <v-divider></v-divider>
      <v-container>
        <h3>Push File</h3>
        <v-file-input
          truncate-length="30"
          id="filebox_file"
          prepend-icon="mdi-desktop-mac"
        ></v-file-input>
        <v-layout justify-center>
          <v-btn
            v-bind:disabled="this.$store.getters.isDeviceInactive"
            elevation="2"
            color="primary"
            @click="push_file"
          >
            <v-icon
              x-large
            >mdi-arrow-down-bold</v-icon>
          </v-btn>
        </v-layout>
        <v-text-field
            value="/sdcard/"
            id="filebox_dev"
            prepend-icon="mdi-android"
        ></v-text-field>
      </v-container>
        <v-divider></v-divider>
      <v-container>
        <h3>Pull File</h3>
        <v-text-field
          value="/sdcard/"
          id="pullfile_dev"
          prepend-icon="mdi-android"
        ></v-text-field>
        <v-layout justify-center>
          <v-btn
            v-bind:disabled="this.$store.getters.isDeviceInactive"
            elevation="2"
            color="primary"
            @click="pull_file"
          >
            <v-icon
              x-large
              class="text-center"
            >mdi-arrow-down-bold</v-icon>
          </v-btn>
          
        </v-layout>
        <v-text-field
          value="%USERPROFILE%\"
          id="pullfile_host"
          prepend-icon="mdi-desktop-mac"
        ></v-text-field>
      </v-container>
    </v-container>
</template>

<script>
import { mapState } from 'vuex'

  export default {
    name: 'File',
    created () {
    },
    data() {
        return {
        }
    },
    methods: {
        updScrcpyOptions(key, value){
            this.$store.commit('updScrcpyOptions', [key, value.toString()])
        },
        install_apk(){
          if(document.getElementById("filebox_apk").files[0] !== undefined){
            this.$store.commit("show_loading")
            let path = document.getElementById("filebox_apk").files[0].path
            this.$store.dispatch("INSTALL_APK", path)
          }
        },
        push_file(){
          if(document.getElementById("filebox_file").files[0] !== undefined){
            this.$store.commit("show_loading")
            let path = document.getElementById("filebox_file").files[0].path
            let devpath = document.getElementById("filebox_dev").value
            this.$store.dispatch("PUSH_FILE", [path, devpath])
          }
        },
        pull_file(){
          this.$store.commit("show_loading")
          let path = document.getElementById("pullfile_host").value
          let devpath = document.getElementById("pullfile_dev").value
          this.$store.dispatch("PULL_FILE", [path, devpath])
        }
    },
    mounted: function(){
    },
    computed: {
      ...mapState({}),
    }
  }
</script>
