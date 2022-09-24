import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Axios from "./plugins/axiosInstance";
//导入模拟数据mock
import './mock/'


const app = createApp(App);   //建立一个vue3app
app.config.globalProperties.$axios = Axios // 使用globalProperties挂载
app.use(router).mount('#app')
