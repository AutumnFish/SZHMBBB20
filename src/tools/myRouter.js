// 导入Vue
import Vue from 'vue';
// 导入路由
import VueRouter from 'vue-router'

// 导入首页的组件
import Index from '../components/01.index.vue';
// 导入详情页的组件
import Detail from '../components/02.productDetail.vue';
// 导入购物车的组件
import ShoppingCart from '../components/03.shoppingCart.vue';
// 导入登陆组件
import Login from '../components/04.login.vue';
// 导入订单组件
import Order from '../components/05.order.vue';
// 导入支付订单组件
import PayOrder from '../components/06.payOrder.vue';
// 导入支付成功组件
import PaySuccess from '../components/07.paySuccess.vue';
// 导入会员中心
import VipCenter from '../components/08.vipCenter.vue';
// 导入订单列表组件
import OrderList from '../components/09.orderList.vue';
// 导入支付订单详情组件 
import OrderDetail from '../components/10.orderDetail.vue';

// axios相关
// 全局导入axios
import axios from 'axios';
// 配置全局基地址(所有跟插件 框架相关的设置 去对应的文档找)
// 一般来说接口 是在一台服务器上的 一系列地址
// 抽取出来还有一个好处 如果服务器更换地址 只需要调整一个位置
// 开发环境地址
// axios.defaults.baseURL = 'http://47.106.148.205:8899';
// 生产环境地址
axios.defaults.baseURL = 'http://111.230.232.110:8899/';
// 增加设置 跨域带cookie
axios.defaults.withCredentials = true;
// 增加到Vue的原型中 学习了 iView this.$Message
Vue.prototype.$axios = axios;


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
    // 登录
    {
        path: '/login',
        component: Login,
    },
    // 订单 接收数据
    {
        path: '/order/:ids',
        component: Order,
        // 路由元信息 可以随意加 
        meta: {
            checkLogin: true
            // panduan:true
        }
    },
    // 订单支付
    {
        path: '/payOrder/:orderid',
        component: PayOrder,
        // 路由元信息 可以随意加  订单支付页 也必须登陆才可以访问
        meta: {
            checkLogin: true
        }
    },
    // 订单支付
    {
        path: '/paySuccess/:id',
        component: PaySuccess,
        // 路由元信息 可以随意加  订单支付页 也必须登陆才可以访问
        meta: {
            checkLogin: true
        }
    },
    // 会员中心
    {
        path: '/vipCenter',
        component: VipCenter,
        // 路由元信息 可以随意加  订单支付页 也必须登陆才可以访问
        meta: {
            checkLogin: true
        }
    },
    // 订单中心
    {
        path: '/orderList',
        component: OrderList,
        // 路由元信息 可以随意加  订单支付页 也必须登陆才可以访问
        meta: {
            checkLogin: true
        }
    },
    // 支付订单详情
    {
        path: '/orderDetail/:id',
        component: OrderDetail,
        // 路由元信息 可以随意加  订单支付页 也必须登陆才可以访问
        meta: {
            checkLogin: true
        }
    }

]

// 实例化路由对象
// routes key 是固定的 
// 所以我们才可以用这种快速赋值
let router = new VueRouter({
    routes: routes
})

// 导航守卫
router.beforeEach((to, from, next) => {
    // 特殊情况登陆判断
    // console.log(to);
    if (to.meta.checkLogin == true) {
        // 登陆状态判断
        axios.get('site/account/islogin').then(response => {
            // console.log(response);
            if (response.data.code == 'logined') {
                // 登录了放行
                next()
            } else {
                // 没有登陆 去登录页
                next('/login')
            }
        })
    } else {
        // 不阻止
        next();
    }
})

// 暴露出去 把 router暴露出去了
export default router;