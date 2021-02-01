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
          :items="devices"
          label="接続デバイスを選択"
          background-color="#424242"
          hide-details
          item-text="name"
          item-value="id"
          no-data-text="利用可能なデバイスが見つかりませんでした"
          solo
          dense
          prepend-icon="mdi-connection"
        >
        </v-select>
      </v-col>

      <v-col
        md="4"
      >
        <v-btn
        color="primary"
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


  <v-tabs
    v-model="tab"
    background-color="#424242"
    show-arrows
    height=30
    centered
  >
    <v-tab
      v-for="item in items"
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
    ここにコンポーネント(status)
    </v-tab-item>
    
    <v-tab-item
      v-show="tab === 1"
      transition="fade-transition"
    >
    content2
    </v-tab-item>
    
    <v-tab-item
      v-show="tab === 2"
      transition="fade-transition"
    >
    content3
    </v-tab-item>
    
    <v-tab-item
      v-show="tab === 3"
      transition="fade-transition"
    >
    </v-tab-item>
    
    <v-tab-item
      v-show="tab === 4"
      transition="fade-transition"
    >
    </v-tab-item>

    <v-tab-item
      v-show="tab === 5"
      transition="fade-transition"
    >
    </v-tab-item>
  </v-tabs-items>
  <v-overlay
    :absolute="absolute"
    :value="overlay"
  >
    <v-btn
      color="error"
      @click="overlay = false"
    >
      コード実行に失敗しました
    </v-btn>
  </v-overlay>
</v-main>
</template>

<script>
var ERROR = "Command execution error"
var commandProsessor = require('../command');
var cp = new commandProsessor.Command()

  export default {
    name: 'Main',

    data: () => ({
        absolute: true,
        overlay: false,
        devices: [], 
        tab: null,
        items: [
          { index: 0, tab: 'status'},
          { index: 1, tab: 'packages'},
          { index: 2, tab: 'files'},
          { index: 3, tab: 'network'},
          { index: 4, tab: 'remote'},
          { index: 5, tab: 'config'},
        ]
    }),
    mounted: function(){
      if(cp.list_devices() === ERROR){
        this.overlay = true
      }
    },
  }
</script>
