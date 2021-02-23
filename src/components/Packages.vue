<template>
    <v-container>

        <v-btn
            @click="getpackages()"
            v-bind:disabled="this.$store.getters.isDeviceInactive"
        >GET PACKAGES
          <v-icon
          >
            mdi-package-variant
          </v-icon>
        </v-btn>
        <v-text-field
            solo
            label="Search Packages 開発中"
            clearable
            v-model="searchtxt"
            @change="search"
            disabled
        ></v-text-field>
        <v-list>
            <template v-for="(item) in this.$store.state.packages">
                <v-list-item
                :key='item.id'>
                <v-list-item-content
                style="padding: 4px 10px">
                <v-divider></v-divider>
                  <v-list-item-title>{{ item.pkg }}</v-list-item-title>
                  <!--v-list-item-subtitle>
                    <v-icon 
                    @click="pkg_open_app(item.pkg)"
                    >mdi-open-in-app</v-icon>
                    <v-icon 
                    @click="dummy"
                    >mdi-close-circle</v-icon>
                    <v-icon 
                    @click="dummy"
                    >mdi-delete-forever</v-icon>
                  </v-list-item-subtitle-->
                </v-list-item-content>
                </v-list-item>
            </template>
        </v-list>
    </v-container>
</template>

<script>
import { mapState } from 'vuex'

  export default {
    name: 'Packages',
    created () {
    },
    data() {
        return {
            reboot_overlay: false,
            searchtxt: ""
        }
    },
    methods: {
        updScrcpyOptions(key, value){
            this.$store.commit('updScrcpyOptions', [key, value.toString()])
        },
        getpackages(){
        this.$store.commit("show_loading")
        this.$store.dispatch("GET_PACKAGES")
        },
        dummy(){},
        pkg_open_app(app){
          this.$store.dispatch("PKG_OPEN_APP", app)
        },
    },
    mounted: function(){
    },
    computed: {
      ...mapState({}),
      search: function(){
        return ""
        /*
        return this.$store.state.packages.filter((el) => {
          return el.pkg.includes(this.searchtxt)
        }, this)
        */
      }
    }
  }
</script>
