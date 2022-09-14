import { createApp } from 'vue'
import App from './App.vue'
import { Dialog } from 'vant';
import { Notify } from 'vant';

const app = createApp(App)
app.config.globalProperties.$notify = Notify;
app.use(Dialog).use(Notify)
    .mount('#app');




