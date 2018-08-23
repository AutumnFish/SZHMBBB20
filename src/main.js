import Vue from 'vue'
// 导入路由
import VueRouter from 'vue-router'
// 导入 App根组件 (最外面的组件)
import App from './App.vue'
// 导入首页的组件
import Index from './components/01.index.vue';

// 注册VueRouter(类似于Express的中间件语法)
// 传送门:https://router.vuejs.org/zh/guide/#html JavaScript分类的第0行
Vue.use(VueRouter);

// 定义路由规则
let routes = [
  // 默认首页 也打开 index
  // 使用重定向来解决 传送门:https://router.vuejs.org/zh/guide/essentials/redirect-and-alias.html#%E9%87%8D%E5%AE%9A%E5%90%91
  {
    path: '/',
    // component: Index,
    // 解析到/ 直接修改路由地址为/index
    redirect:'/index'
  },
  // 首页规则
  {
    path: '/index',
    component: Index,
  },
]

// 实例化路由对象
// routes key 是固定的 
// 所以我们才可以用这种快速赋值
let router = new VueRouter({
  routes:routes
})

// 挂在到 Vue示例上面

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 路由对象
  router
}).$mount('#app')