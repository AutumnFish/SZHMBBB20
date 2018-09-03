import Vue from 'vue'
// 导入 自己封装的 路由
import router from './tools/myRouter';
// 导入 第三方插件 因为没有暴露
// 直接引入 不是用变量接收 等同于 吧那份代码 拷贝 复制 到这个位置
import './tools/libs';
// 导入 仓库
import store from './tools/myVuex';
// 导入 App根组件 (最外面的组件)
import App from './App.vue'

// 注册全局过滤器
// 依赖于 moment.js
import moment from 'moment';
// 注册 这个过滤器 只能格式化固定的内容
// 可以接受参数
Vue.filter('filterDate', function (val,formatStr) {
  console.log(formatStr);
  // 如果你传入了格式化字符串 就用 传入的
  if(formatStr!=undefined){
    return moment(val).format(formatStr);
  }else{
    // 没有传入个格式化字符串 就用 默认的
    return moment(val).format("YYYY年MM月DD日");
  }
})

// 挂在到 Vue示例上面
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 路由对象
  router,
  // 仓库对象 属性的名字 叫做 store
  store,
  // 最外层的 Vue容器的生命周期中判断登陆
  beforeCreate(){
    this.$axios.get('site/account/islogin').then(response=>{
      if(response.data.code=='logined'){
        // 修改vuex的状态
        store.commit('changeLogin',true);
      }
    })
  }
}).$mount('#app')