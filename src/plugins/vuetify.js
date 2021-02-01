import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        dark: true,
        themes: {
          light: {
            primary: "#3f51b5",
            secondary: "#2196f3",
            accent: "#e91e63",
            error: "#f44336",
            warning: "#ffc107",
            info: "#607d8b",
            success: "#8bc34a",
            }
        }
      },
});
