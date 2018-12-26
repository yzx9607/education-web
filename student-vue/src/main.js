import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import './assets/theme/theme-0099cb/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import routes from './routes'
//打包时候注意把MOCK删除
 //import Mock from './mock'
 //Mock.bootstrap()
import 'font-awesome/css/font-awesome.min.css'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

//NProgress.configure({ showSpinner: false }); 

const router = new VueRouter({
    routes
})
router.beforeEach((to, from, next) => {
        let stu = JSON.parse(sessionStorage.getItem('stu'));
        if(to.path == '/login' && stu != null){
             if (stu.rememberMe == true) {
               next({ path: '/home' });
            }else{
                sessionStorage.removeItem("stu");
                next({ path: '/login' });
            }
        }
        if (stu == null && to.path != '/login') {
            next({ path: '/login' })
        } else {
            next()
        }
    })
new Vue({
    //el: '#app',
    //template: '<App/>',
    router,
    store,
    //components: { App }
    render: h => h(App)
}).$mount('#app')