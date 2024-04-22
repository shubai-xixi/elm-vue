import './assets/main.css'
import './components/font-awesome/css/font-awesome.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import qs from "qs";
import {
    getCurDate,
    setSessionStorage,
    getSessionStorage,
    removeSessionStorage,
    setLocalStorage,
    getLocalStorage,
    removeLocalStorage
} from './common.js'
//import './components/font-awesome/css'

axios.defaults.baseURL = "http://localhost:9087"

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

app.config.globalProperties.$axios = axios;
app.config.globalProperties.$qs = qs;
app.config.globalProperties.$getCurDate = getCurDate;
app.config.globalProperties.$setSessionStorage = setSessionStorage;
app.config.globalProperties.$getSessionStorage = getSessionStorage;
app.config.globalProperties.$removeSessionStorage = removeSessionStorage;
app.config.globalProperties.$setLocalStorage = setLocalStorage;
app.config.globalProperties.$getLocalStorage = getLocalStorage;
app.config.globalProperties.$removeLocalStorage = removeLocalStorage;

//全局路由守护
router.beforeEach((to, from, next) => {
    const user = sessionStorage.getItem('user')
    // 除了登录、注册、首页、商家列表、商家信息之外，都需要判断是否登录
    if (!(to.path === '/' || to.path === '/index' || to.path === '/businessList' || to.path === '/businessInfo' || to.path === '/login' || to.path === '/register')) {
        if (user === null) {
            next('/login')
            //location.reload()
            return
        }
    }
    next();
})