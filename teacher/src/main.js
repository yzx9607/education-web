import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
//import 'element-ui/lib/theme-default/index.css'
//import './assets/theme/theme-darkblue/index.css'
import './assets/theme/theme-0099cb/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
//import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'
import routes from './routes'
//打包时候注意把MOCK删除
//import Mock from './mock'
//Mock.bootstrap();
import 'font-awesome/css/font-awesome.min.css'
//import 'font-awesome/css/font-awesome.min.css'


Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

//NProgress.configure({ showSpinner: false });

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
        let user = JSON.parse(sessionStorage.getItem('user'));
        // NProgress.start();
        if (to.path == '/login') {
            if (user != null) {
                if (user.rememberMe == true) {
                    next({ path: '/home' })
                }
            }
        }
        if (!user && to.path != '/login') {
            next({ path: '/login' })
        } else {
            if (to.path != '/login') {
                router == filter(routes, (user.roleId - 0) + 1);
                next();
            }
        }
        next();
    })
    //循环过滤路由
function filter(filerounte, role) {
    for (var index in filerounte) {
        var myrouterole = filerounte[index].meta.requiresAuth
        if (myrouterole != role && myrouterole != 0) {
            filerounte[index].hidden = true;
        } else if (myrouterole == role) {
            filerounte[index].hidden = false;
        }
    }
    return filerounte;
}
//router.afterEach(transition => {
//NProgress.done();
//});
new Vue({
    //el: '#app',
    //template: '<App/>',
    router,
    store,
    //components: { App }
    render: h => h(App)
}).$mount('#app')