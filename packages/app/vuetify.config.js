import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';

export default {
  ssr: false,
  theme: {
    defaultTheme: 'light'
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  }
};
