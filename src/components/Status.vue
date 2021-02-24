<template>
    <v-container>
        <v-simple-table>
            <tbody>
                <tr>
                    <td width="30%">Model Name</td>
                    <td width="70%">{{this.$store.state.currentDevice.model}}</td>
                </tr>
                <tr>
                    <td>Device ID</td>
                    <td>{{this.$store.state.currentDevice.id}}</td>
                </tr>
                <tr>
                    <td>AndroidOS Version</td>
                    <td>{{this.$store.state.currentDevice.osver}}</td>
                </tr>
                <tr>
                    <td>SDK Version</td>
                    <td>{{this.$store.state.currentDevice.sdkver}}</td>
                </tr>
                <tr>
                    <td>Battery Level</td>
                    <td>{{this.$store.state.currentDevice.battery}}%<v-progress-linear v-model="this.$store.state.currentDevice.battery"></v-progress-linear></td>
                </tr>
                <tr>
                    <td>WiFi IP Address</td>
                    <td>{{this.$store.state.currentDevice.ipaddr}}</td>
                </tr>
                <tr>
                    <td>WiFi Mac Address</td>
                    <td>{{this.$store.state.currentDevice.macaddr}}</td>
                </tr>
            </tbody>
        </v-simple-table>
        <v-divider
        ></v-divider>
        <v-container>
            <v-btn
            class="mx-2"
            color="primary"
            @click="reboot_overlay = !reboot_overlay"
            v-bind:disabled="this.$store.getters.isDeviceInactive"
            >REBOOT
            <v-icon
                right
                dark
            >
                mdi-reload-alert
            </v-icon>
            </v-btn>
            <v-btn
                class="mx-2"
                v-bind:disabled="this.$store.getters.isDeviceInactive"
                dark
                color="green"
                @click="launch_app_setting()"
                >SETTING
                <v-icon dark>
                    mdi-cog
                </v-icon>
            </v-btn>
            <v-btn
                class="mx-2"
                v-bind:disabled="this.$store.getters.isDeviceInactive"
                dark
                color="green"
                @click="launch_app_wireless()"
                >
                WIRELESS
                <v-icon dark>
                    mdi-wifi
                </v-icon>
            </v-btn>
            <v-btn
                class="mx-2"
                v-bind:disabled="this.$store.getters.isDeviceInactive"
                dark
                color="green"
                @click="screenshot()"
                >
                SCREENSHOT
                <v-icon dark>
                    mdi-cellphone-screenshot
                </v-icon>
            </v-btn>
            
        </v-container>
            <v-divider></v-divider>
        <v-container>
            <h3
                style="display: inline;">
                Remote Control
            </h3>
            <a  style="text-decoration: none;"
                target="_blank"
                href="https://github.com/Genymobile/scrcpy">
                <v-icon>
                    mdi-help-circle
                </v-icon>
            </a>
            <v-form
                ref="form"
                lazy-validation
            >
                <v-slider
                v-bind:value="this.$store.state.scrcpy['length']"
                @change = "updScrcpyOptions('length', $event)"
                label="Vertical length (pixel)"
                hint="The horizontal length is adjusted according to the vertical length"
                persistent-hint
                max="1080"
                min="580"
                step="100"
                thumb-label
                ticks
                ></v-slider>

                <v-slider
                v-bind:value="this.$store.state.scrcpy['bitrate']"
                @change = "updScrcpyOptions('bitrate', $event)"
                label="Transfer bitrate (Mbps)"
                hint="Increasing the value will improve the video quality, but more delay and load"
                persistent-hint
                max="10"
                min="1"
                step="1"
                thumb-label
                ticks
                ></v-slider>
                <v-row>
                    <v-col
                    cols="4">

                        <v-checkbox
                        v-bind:value="this.$store.state.scrcpy['stayawake']"
                        @change = "updScrcpyOptions('stayawake', $event)"
                        label="Stay awake"
                        hint="Prevent the device to sleep"
                        persistent-hint
                        ></v-checkbox>
                    </v-col>
                    <v-col
                    cols="4">
                        <v-checkbox
                        v-bind:value="this.$store.state.scrcpy['offscreen']"
                        @change = "updScrcpyOptions('offscreen', $event)"
                        label="Turn off screen"
                        hint="The device screen off while remote control"
                        persistent-hint
                        ></v-checkbox>
                    </v-col>
                </v-row>
            </v-form>
        </v-container>
        <v-container>

                <v-btn
                    class="mx-2"
                    v-bind:disabled="this.$store.getters.isDeviceInactive"
                    dark
                    color="primary"
                    @click="launch_scrcpy()"
                    >
                    REMOTE
                    <v-icon dark>
                        mdi-remote
                    </v-icon>
                </v-btn>

        </v-container>

        <v-overlay
          :absolute="true"
          :value="reboot_overlay"
          opacity="0.9"
        >
          <br>本当に再起動しますか？<br>実行中タスクや処理が強制的に終了します。<br>
          <v-btn
            color="error"
            small
            @click="reboot_overlay = false;reboot_device()"
          >
            REBOOT
          </v-btn>
          <v-btn
            small
            color="primary"
            @click="reboot_overlay = false"
            >
              やめる
          </v-btn>
        </v-overlay>
    </v-container>
</template>

<script>
import { mapState } from 'vuex'
let vm ={}

  export default {
    name: 'Status',
    created () {
      vm = this;
    },
    data() {
        return {
            reboot_overlay: false,
        }
    },
    methods: {
        updScrcpyOptions(key, value){
            this.$store.commit('updScrcpyOptions', [key, value])
        },
        reboot_device(){
            vm.$store.dispatch("REBOOT_DEVICE")
            .then(()=>{
                vm.$store.dispatch("GET_DEVCELIST").then(()=>{
                    vm.$store.commit("empty_devices")
                    vm.$store.commit("hide_loading")
                })
            })
        },
        launch_app_setting(){
            vm.$store.dispatch("LAUNCH_APP_SETTING")
        },
        launch_app_wireless(){
            vm.$store.dispatch("LAUNCH_APP_WIRELESS")
        },
        stayontoggle(){
            vm.$store.dispatch("TOGGLE_POWERSTAY")
        },
        asyncTest(){
            vm.$store.commit("show_loading")
            setTimeout(()=>{
                vm.$store.commit("hide_loading")
            },3000)
        },
        launch_scrcpy(){
            this.$store.commit("show_loading")
            vm.$store.dispatch("LAUNCH_SCRCPY")
        },
        screenshot(){
            this.$store.commit("show_loading")
            vm.$store.dispatch("SCREENSHOT")
        },
    },
    mounted: function(){
    },
    computed: {
      ...mapState({})
    }
  }
</script>
