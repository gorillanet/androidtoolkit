<template>
    <v-container>  
      <v-container>
        <h3>Proxy</h3>
        <v-row>
          <v-col
          cols=6>
            <v-text-field
              label="IP Address"
              placeholder="127.0.0.1"
              value="127.0.0.1"
            ></v-text-field>
          </v-col>
          <v-col
          cols=2>
            <v-text-field
              label="Port"
              placeholder="8081"
              value="8081"
            ></v-text-field>
          </v-col>
          <v-col
          cols=2>
            <v-btn
              justify-center
              v-bind:disabled="this.$store.getters.isDeviceInactive"
              dark
              color="primary"
              @click="launch_app_setting()"
              >APPLY
            </v-btn>
          </v-col>
          <v-col
          cols=2>
            <v-btn
              justify-center
              v-bind:disabled="this.$store.getters.isDeviceInactive"
              dark
              color="error"
              @click="launch_app_setting()"
              >REMOVE
            </v-btn>
          </v-col>
        </v-row>
      </v-container>

      
      <v-container>
        <h3>Forward</h3>
        <v-row>
          <v-col
          cols=4>
            <v-text-field
              label="Host TCP Port"
              placeholder="8081"
              value="8081"
            ></v-text-field>
          </v-col>
          <v-col
          cols=4>
            <v-text-field
              label="Device TCP Port"
              placeholder="8081"
              value="8081"
            ></v-text-field>
          </v-col>
          <v-col
          cols=4>
            <v-btn
              justify-center
              v-bind:disabled="this.$store.getters.isDeviceInactive"
              dark
              color="primary"
              @click="launch_app_setting()"
              >APPLY
            </v-btn>
          </v-col>
        </v-row>
      </v-container>

      
      <v-container>
        <h3>Reverse</h3>
        <v-row>
          <v-col
          cols=4>
            <v-text-field
              label="Device TCP Port"
              placeholder="8081"
              value="8081"
            ></v-text-field>
          </v-col>
          <v-col
          cols=4>
            <v-text-field
              label="Host TCP Port"
              placeholder="8081"
              value="8081"
            ></v-text-field>
          </v-col>
          <v-col
          cols=4>
            <v-btn
              justify-center
              v-bind:disabled="this.$store.getters.isDeviceInactive"
              dark
              color="primary"
              @click="launch_app_setting()"
              >APPLY
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
</template>

<script>
import { mapState } from 'vuex'

  export default {
    name: 'Network',
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
    },
    mounted: function(){
    },
    computed: {
      ...mapState({}),
    }
  }
</script>
