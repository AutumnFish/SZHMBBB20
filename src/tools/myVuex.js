// 导入Vue
import  Vue from 'vue';
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
    isLogin: false
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
    updateGoodsNum(state, goodInfo) {
      // 直接替换即可
      state.cartDate[goodInfo.goodId] = goodInfo.goodNum;
    },
    // 额外的增加一个删除的方法
    // goodId就是 商品的id
    deleteGoods(state, goodId) {
      // 如何删除对象中的属性
      // delete 删除对象中的属性
      // delete state.cartDate[goodId];
      // delete 删除的属性不会触发视图更新
      // 需要调用Vue.delete方法才可以
      Vue.delete(state.cartDate, goodId);
    },
    // 修改登陆状态
    changeLogin(state, isLogin) {
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
        num += state.cartDate[key]
      }
      // 累加总数
      // 返回总数
      return num;
    }
  }
})

// 浏览器页面关闭(刷新时)保存到localStorage中
window.onbeforeunload = function () {
  window.localStorage.setItem('goodKey', JSON.stringify(store.state.cartDate))
  // window.localStorage.setItem('goodKey',JSON.stringify(cartDate))
}

// 暴露store出去
export default store;