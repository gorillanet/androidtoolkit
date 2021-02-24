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
              v-model="ip_proxy"
            ></v-text-field>
          </v-col>
          <v-col
          cols=2>
            <v-text-field
              label="Port"
              placeholder="8081"
              value="8081"
              v-model="port_proxy"
            ></v-text-field>
          </v-col>
          <v-col
          cols=2>
            <v-btn
              justify-center
              v-bind:disabled="this.$store.getters.isDeviceInactive"
              dark
              color="primary"
              @click="apply_proxy()"
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
              @click="remove_proxy()"
              >REMOVE
            </v-btn>
          </v-col>
        </v-row>
        
        <v-simple-table>
            <tbody>
                <tr>
                    <td width="30%">Current Proxy Setting</td>
                    <td width="70%">{{this.$store.state.currentDevice.proxy}}</td>
                </tr>
            </tbody>
        </v-simple-table>
      </v-container>

      <v-divider></v-divider>

      <v-container>
        <h3>Forward</h3>
        <v-row>
          <v-col
          cols=4>
            <v-text-field
              label="Host TCP Port"
              placeholder="8081"
              v-model="forward_port1"
            ></v-text-field>
          </v-col>
          <v-col
          cols=4>
            <v-text-field
              label="Device TCP Port"
              placeholder="8081"
              v-model="forward_port2"
            ></v-text-field>
          </v-col>
          <v-col
          cols=4>
            <v-btn
              justify-center
              v-bind:disabled="this.$store.getters.isDeviceInactive"
              dark
              color="primary"
              @click="addtcpforward()"
              >APPLY
            </v-btn>
          </v-col>
        </v-row>
        <v-simple-table>
            <tbody>
                <tr>
                  <th>Host Port</th>
                  <th></th>
                  <th>Device Port</th>
                  <th></th>
                </tr>
                <tr
                  v-for="item in this.$store.state.currentDevice.tcpforward"
                  :key="item.deviceport">
                    <td>tcp:{{item.hostport}}</td>
                    <td><v-icon>mdi-arrow-right-thick</v-icon></td>
                    <td>tcp:{{item.deviceport}}</td>
                    <td><v-icon
                    @click="removetcpforward(item.hostport)"
                    >mdi-delete-forever</v-icon></td>
                </tr>
            </tbody>
        </v-simple-table>
      </v-container>

      
      <v-container>
        <h3>Reverse</h3>
        <v-row>
          <v-col
          cols=4>
            <v-text-field
              label="Device TCP Port"
              placeholder="8081"
              v-model="reverse_port1"
            ></v-text-field>
          </v-col>
          <v-col
          cols=4>
            <v-text-field
              label="Host TCP Port"
              placeholder="8081"
              v-model="reverse_port2"
            ></v-text-field>
          </v-col>
          <v-col
          cols=4>
            <v-btn
              justify-center
              v-bind:disabled="this.$store.getters.isDeviceInactive"
              dark
              color="primary"
              @click="addtcpreverse()"
              >APPLY
            </v-btn>
          </v-col>
        </v-row>
        <v-simple-table>
            <tbody>
                <tr>
                  <th>Device Port</th>
                  <th></th>
                  <th>Host Port</th>
                  <th></th>
                </tr>
                <tr
                  v-for="item in this.$store.state.currentDevice.tcpreverse"
                  :key="item.deviceport">
                    <td>tcp:{{item.deviceport}}</td>
                    <td><v-icon>mdi-arrow-right-thick</v-icon></td>
                    <td>tcp:{{item.hostport}}</td>
                    <td><v-icon
                    @click="removetcpreverse(item.deviceport)"
                    >mdi-delete-forever</v-icon></td>
                </tr>
            </tbody>
        </v-simple-table>
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
          ip_proxy: "127.0.0.1",
          port_proxy: "8081",
          forward_port1: "18881",
          forward_port2: "18882",
          reverse_port1: "19991",
          reverse_port2: "19992",
        }
    },
    methods: {
        updScrcpyOptions(key, value){
            this.$store.commit('updScrcpyOptions', [key, value.toString()])
        },
        apply_proxy(){
          this.$store.commit("show_loading")
          this.$store.dispatch("APPLY_PROXY", [this.ip_proxy, this.port_proxy, this.$store.state.currentDevice.id])
        },
        remove_proxy(){
          this.$store.commit("show_loading")
          this.$store.dispatch("APPLY_PROXY", ["", "0", this.$store.state.currentDevice.id])
        },
        removetcpforward(port){
          this.$store.commit("show_loading")
          this.$store.dispatch("REMOVE_TCP_FORWARD", port)
        },
        addtcpforward(){
          this.$store.commit("show_loading")
          this.$store.dispatch("ADD_TCP_FORWARD", [this.forward_port1, this.forward_port2])
        },
        removetcpreverse(port){
          this.$store.commit("show_loading")
          this.$store.dispatch("REMOVE_TCP_REVERSE", port)
        },
        addtcpreverse(){
          this.$store.commit("show_loading")
          this.$store.dispatch("ADD_TCP_REVERSE", [this.reverse_port1, this.reverse_port2])
        },
    },
    mounted: function(){
    },
    computed: {
      ...mapState({}),
    }
  }
</script>
