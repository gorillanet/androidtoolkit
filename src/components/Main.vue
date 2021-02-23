<template>
<v-main>
  <v-container>
    <v-row
      no-gutters
    >
      <v-col
        md="8"
      >
        <v-select
          v-model="selectDevice"
          :items="this.$store.state.devices"
          label="接続デバイスを選択"
          background-color="#424242"
          hide-details
          item-text="model"
          item-value="device"
          no-data-text="利用可能なデバイスが見つかりませんでした"
          solo
          dense
          prepend-icon="mdi-connection"
          @change="change_currtent_device"
        >
        </v-select>
      </v-col>
      

      <v-col
        md="4"
      >
        <v-btn
          color="primary"
          @click="refresh_adb()"
          v-bind:disabled="this.$store.state.isloading"
        >refresh
          <v-icon
            right
            dark
          >
            mdi-refresh
          </v-icon>
        </v-btn>
        <v-btn
        color="secondary"
        >EDIT
        
          <v-icon
            right
            dark
          >
            mdi-pencil-outline
          </v-icon>

        </v-btn>
      </v-col>
      
    </v-row>
  </v-container>
  <v-progress-linear
    indeterminate
    color="primary"
    size="38"
    v-show="this.$store.state.isloading"
  ></v-progress-linear>
  <v-tabs
    v-model="tab"
    background-color="#424242"
    show-arrows
    height=30
    centered
  >
    <v-tab
      v-for="item in this.$store.state.items"
      :key="item.tab"
    >
      {{ item.tab }}
    </v-tab>
  </v-tabs>

  <v-tabs-items v-model="tab"
  >
    <v-tab-item
      v-show="tab === 0"
      transition="fade-transition"
    >
      <Status/>
    </v-tab-item>
    
    <v-tab-item
      v-show="tab === 1"
      transition="fade-transition"
    >
      <Packages/>
    </v-tab-item>
    
    <v-tab-item
      v-show="tab === 2"
      transition="fade-transition"
    >
      <File/>
    </v-tab-item>
    
    <v-tab-item
      v-show="tab === 3"
      transition="fade-transition"
    >
      <Network/>
    </v-tab-item>
    
    <v-tab-item
      v-show="tab === 4"
      transition="fade-transition"
    >
    content5
    </v-tab-item>

    <v-tab-item
      v-show="tab === 5"
      transition="fade-transition"
    >
    content6
    </v-tab-item>
  </v-tabs-items>
  <v-overlay
    :absolute="this.$store.state.absolute"
    :value="this.$store.state.overlay"
    opcity="0.9"
  >
    <v-btn
      color="error"
      @click="hide_overlay"
    >
      コード実行に失敗しました
    </v-btn>
    <p class="text-center">デバイスが接続されているか確認してください</p>
    <p class="text-center">REFRESHしてデバイス情報を更新してください</p>
  </v-overlay>
</v-main>
</template>

<script>
import { mapState } from 'vuex'
import Status from './Status';
import Packages from './Packages';
import File from './File';
import Network from './Network';


  export default {
    name: 'Main',
    created () {
      
    },
    components: {
      Status,
      Packages,
      File,
      Network,
    },
    data: () => ({
        tab: null,
        selectDevice: null,
    }),
    methods: {
      hide_overlay(){
        this.$store.commit("hide_overlay")
      },
      change_currtent_device(){
        this.$store.commit("show_loading")
        this.$store.dispatch("CHANGE_CURRENT_DEVICE",this.selectDevice)
      },
      show_error(){
        this.$store.commit("show_overlay")
      },
      show_loading_component(){
        this.$store.commit("show_loading")
      },
      refresh_adb(){
        this.selectDevice = null
        this.$store.commit("show_loading")
        this.$store.dispatch("RESET_ADB")
      }
    },
    mounted: async function(){
      this.$store.commit("show_loading")
      this.$nextTick(() => {
        this.$store.dispatch("GET_DEVCELIST")
      })
    },
    computed: {
      ...mapState({})
    }
  }
</script>
