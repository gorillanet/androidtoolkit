<template>
    <v-container>
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
        }
    },
    methods: {
        updScrcpyOptions(key, value){
            console.log(value)
            this.$store.commit('updScrcpyOptions', [key, value.toString()])
        },
    },
    mounted: function(){
    },
    computed: {
      ...mapState({})
    }
  }
</script>
