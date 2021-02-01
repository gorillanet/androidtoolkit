<template>
  <v-app :style="{background: '#1E1E1E'}">
      <Main/>
  </v-app>
</template>

<script>
import Main from './components/Main';

export default {
  name: 'App',

  components: {
    Main,
  },

  data: () => ({
    //
  }),
};
</script>
