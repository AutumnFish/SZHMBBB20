// 导入Vue
import Vue from 'vue';

// 导入 elementui 按需导入
// import ElementUI from 'element-ui';
import {
  Carousel,
  CarouselItem,
  InputNumber,
  Switch,
  Button,
  Form,
  FormItem,
  Input,
  Radio,
  Pagination
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
// 记得要use一下 才会把Elementui中的内容注册到Vue上面
// Vue.use(ElementUI);

Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(InputNumber)
Vue.use(Switch)
Vue.use(Button)
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Radio);
Vue.use(Pagination);

// 导入iView
// import iView from 'iview';
// import Message from 'iview/src/components/message';
import {
  Affix,
  Page,
  BackTop,
  Message,
  Notice
} from 'iview';

import 'iview/dist/styles/iview.css';
// 记得use一下
// Vue.use(iView);
// Vue.use(Message);
Vue.component('Affix',Affix);
Vue.component('Page',Page);
Vue.component('BackTop',BackTop);
// 挂载到Vue的原型上
Vue.prototype.$Message = Message;
Vue.prototype.$Notice = Notice;


// 导入放大镜
import ProductZoomer from 'vue-product-zoomer';
Vue.use(ProductZoomer);


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
  loading: require('../assets/img/loadingDog.gif'),
  attempt: 1
})

// 因为已经挂载 这里不需要暴露任何的东西