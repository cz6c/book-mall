import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引入全局css
import 'assets/css/base.css'
import 'assets/css/normalize.css'
import 'assets/css/fonts/iconfont.css'

//引入element ui库
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

//引入vant库
import {
    Toast,
    Lazyload,
    Form,
    Field,
    Button,
    Icon,
    AddressList,
    AddressEdit,
    SubmitBar
} from 'vant';
import 'vant/lib/index.css';

createApp(App)
    .use(store)
    .use(router)
    .use(ElementPlus)
    .use(Toast)
    .use(Form)
    .use(Field)
    .use(Button)
    .use(Icon)
    .use(AddressList)
    .use(AddressEdit)
    .use(SubmitBar)
    .use(Lazyload, {
        loading: require('./assets/img/cz6.png')
    }).mount('#app')