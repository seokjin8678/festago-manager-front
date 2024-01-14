import 'vuetify/styles'
import { createVuetify } from 'vuetify';
import { ko } from 'vuetify/locale';

export default createVuetify({
  ssr: true,
  locale: {
    locale: 'ko',
    fallback: 'en',
    messages: { ko }
  }
});
