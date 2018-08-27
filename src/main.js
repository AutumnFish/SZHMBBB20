import Vue from 'vue'
// 导入路由
import VueRouter from 'vue-router'
// 导入 App根组件 (最外面的组件)
import App from './App.vue'
// 导入首页的组件
import Index from './components/01.index.vue';
// 导入详情页的组件
import Detail from './components/02.productDetail.vue';

// 导入 elementui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 记得要use一下 才会把Elementui中的内容注册到Vue上面
Vue.use(ElementUI);

// 导入iView
import iView from 'iview';
import 'iview/dist/styles/iview.css';
// 记得use一下
Vue.use(iView);

// 全局导入axios
import axios from 'axios';
// 配置全局基地址
axios.defaults.baseURL = 'http://47.106.148.205:8899';
// 增加到Vue的原型中
Vue.prototype.$axios = axios;


// 导入放大镜
import ProductZoomer from 'vue-product-zoomer';
Vue.use(ProductZoomer);


// 注册VueRouter(类似于Express的中间件语法)
// 传送门:https://router.vuejs.org/zh/guide/#html JavaScript分类的第0行
Vue.use(VueRouter);

// 导入 懒加载 vue插件
import VueLazyload from 'vue-lazyload'
// 注册到Vue上
// or with options
Vue.use(VueLazyload, {
  preLoad: 1.3,
  // 错误
  // error: 'dist/error.png',
  // 加载中
  // 图片也要当做模块导入
  loading: require('./assets/img/loadingDog.gif'),
  attempt: 1
})


// 注册全局过滤器
// 依赖于 moment.js
import moment from 'moment';
// 注册
Vue.filter('filterDate', function(val){
  return moment(val).format("YYYY年MM月DD日");
})


// 定义路由规则
let routes = [
  // 默认首页 也打开 index
  // 使用重定向来解决 传送门:https://router.vuejs.org/zh/guide/essentials/redirect-and-alias.html#%E9%87%8D%E5%AE%9A%E5%90%91
  {
    path: '/',
    // component: Index,
    // 解析到/ 直接修改路由地址为/index
    redirect: '/index'
  },
  // 首页规则
  {
    path: '/index',
    component: Index,
  },
  // 详情页则
  // 动态路由匹配:https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html
  {
    path: '/detail/:id',
    component: Detail,
  },
]

// 实例化路由对象
// routes key 是固定的 
// 所以我们才可以用这种快速赋值
let router = new VueRouter({
  routes: routes
})

// 挂在到 Vue示例上面

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 路由对象
  router
}).$mount('#app')