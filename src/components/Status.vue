<template>
    <v-container>
        <v-simple-table>
            <tbody>
                <tr>
                    <td width="30%">モデル名</td>
                    <td width="70%">{{this.$store.state.currentDevice.model}}</td>
                </tr>
                <tr>
                    <td>デバイスID</td>
                    <td>{{this.$store.state.currentDevice.id}}</td>
                </tr>
                <tr>
                    <td>AndroidOSバージョン</td>
                    <td>{{this.$store.state.currentDevice.osver}}</td>
                </tr>
                <tr>
                    <td>SDKバージョン</td>
                    <td>{{this.$store.state.currentDevice.sdkver}}</td>
                </tr>
                <tr>
                    <td>バッテリーレベル</td>
                    <td>{{this.$store.state.currentDevice.battery}}%<v-progress-linear v-model="this.$store.state.currentDevice.battery"></v-progress-linear></td>
                </tr>
            </tbody>
        </v-simple-table>
        <v-divider
        ></v-divider>
        <v-container>
            <v-btn
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
                    mdi-cellphone-wireless
                </v-icon>
            </v-btn>
            <v-btn
                class="mx-2"
                dark
                color="error"
                @click="asyncTest()"
                >
                test
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
    data: () => ({
        reboot_overlay: false,
    }),
    methods: {
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
    },
    mounted: function(){
    },
    computed: {
      ...mapState({})
    }
  }
</script>
