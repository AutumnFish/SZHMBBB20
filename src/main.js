import Vue from 'vue'
// 导入路由
import VueRouter from 'vue-router'
// 导入 App根组件 (最外面的组件)
import App from './App.vue'
// 导入首页的组件
import Index from './components/01.index.vue';
// 导入详情页的组件
import Detail from './components/02.productDetail.vue';
// 导入购物车的组件
import ShoppingCart from './components/03.shoppingCart.vue';
// 导入登陆组件
import Login from './components/04.login.vue';

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
// 配置全局基地址(所有跟插件 框架相关的设置 去对应的文档找)
// 一般来说接口 是在一台服务器上的 一系列地址
// 抽取出来还有一个好处 如果服务器更换地址 只需要调整一个位置
axios.defaults.baseURL = 'http://47.106.148.205:8899';
// 增加到Vue的原型中 学习了 iView this.$Message
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
Vue.filter('filterDate', function (val) {
  return moment(val).format("YYYY年MM月DD日");
})

// 整合 Vuex 统一进行数据管理
import Vuex from 'vuex'
Vue.use(Vuex)
// 实例化一个仓库 用来保存数据
// 实例化Vue的时候 也需要传入 仓库对象
const store = new Vuex.Store({
  // 这里就是我们的数据
  state: {
    // count: 998
    // 尝试读取数据 有使用读取的数据 没有 使用 空对象 [Object object]
    cartDate: JSON.parse(window.localStorage.getItem('goodKey')) || {},
    // 是否登陆
    isLogin:false
  },
  // 这个是暴露的修改方法
  mutations: {
    // 增加购物车数据获取到 id 以及数量
    // 传入的数据是一个对象 格式{goodId:商品id,goodNum:数量}
    addGoods(state, goodInfo) {
      // 保存数据[]只有用中括号对象取值 才可以 传入变量 用.语法是固定的属性名
      if (state.cartDate[goodInfo.goodId] == undefined) {
        // 传过来的id 不存在 新增这个id作为属性
        // 直接增加这个属性即可 这种方法增加的属性 Vue不会跟踪修改
        // state.cartDate[goodInfo.goodId] = goodInfo.goodNum;
        // 为了要让Vue检测到数据的改变同步修改页面显示 需要调用Vue.set方法
        Vue.set(state.cartDate, goodInfo.goodId, goodInfo.goodNum);
      } else {
        // 传过来的id 已经存在 累加
        state.cartDate[goodInfo.goodId] += goodInfo.goodNum;
      }
    },
    // 额外的增加一个修改的方法
    // 逻辑是 直接把传入的 数量 替换掉 默认的数量
    // 格式约定 格式{goodId:商品id,goodNum:数量}
    updateGoodsNum(state,goodInfo){
      // 直接替换即可
      state.cartDate[goodInfo.goodId] = goodInfo.goodNum;
    },
    // 额外的增加一个删除的方法
    // goodId就是 商品的id
    deleteGoods(state,goodId){
      // 如何删除对象中的属性
      // delete 删除对象中的属性
      // delete state.cartDate[goodId];
      // delete 删除的属性不会触发视图更新
      // 需要调用Vue.delete方法才可以
      Vue.delete(state.cartDate,goodId);
    },
    // 修改登陆状态
    changeLogin(state,isLogin){
      state.isLogin = isLogin;
    }
  },
  // getters vuex的计算属性
  getters: {
    goodsCount: state => {
      // 临时num
      let num = 0;
      //  循环数据对象
      for (const key in state.cartDate) {
          // console.log(key);
          num +=state.cartDate[key]
      }
      // 累加总数
      // 返回总数
      return num;
    }
  }
})

// 浏览器页面关闭(刷新时)保存到localStorage中
window.onbeforeunload = function(){
  window.localStorage.setItem('goodKey',JSON.stringify(store.state.cartDate))
  // window.localStorage.setItem('goodKey',JSON.stringify(cartDate))
}


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
  // 购物车路由
  {
    path: '/cart',
    component: ShoppingCart,
  },
  // 购物车路由
  {
    path: '/login',
    component: Login,
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
  router,
  // 仓库对象 属性的名字 叫做 store
  store
}).$mount('#app')