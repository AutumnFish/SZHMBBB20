<template>
    <!-- 基础结构 从静态资源目录下 02.商品列表下 拷贝 -->
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <!-- 循环生成 -->
                                <li v-for="item in catelist" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="itemSon in item.subcates" :key="itemSon.id">
                                                {{itemSon.title}}&nbsp;
                                            </span>
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>
                                            <dd>
                                                <a v-for="itemSon in item.subcates" :key="itemSon.id" href="/goods/43.html">{{itemSon.title}}</a>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--幻灯片-->
                    <div class="left-705">
                        <el-carousel height="341px">
                            <el-carousel-item v-for="item in sliderlist" :key="item.id">
                                <a href="#">
                                    <img :src="item.img_url" alt="">
                                </a>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    <!--/幻灯片-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(item, index) in toplist" :key="item.id">
                                <div class="img-box">
                                    <label>{{index+1}}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{item.title}}</a>
                                    <!-- 管道符 -->
                                    <span>{{item.add_time | filterDate}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="section" v-for="item in groupDate" :key="item.catetitle">
            <!-- 标题 -->
            <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p>
                    <a href="/goods/43.html" v-for="itemSon in item.level2catelist" :key="itemSon.subcateid">{{itemSon.subcatetitle}}</a>
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <!-- 商品列表 -->
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="itemSon in item.datas" :key="itemSon.artID">
                            <router-link :to="'/detail/'+itemSon.artID">
                                <div class="img-box">
                                    <!-- 使用懒加载属性 -->
                                    <!-- <img :src="itemSon.img_url" > -->
                                    <img v-lazy="itemSon.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{itemSon.artTitle}}</h3>
                                    <p class="price">
                                        <b>{{itemSon.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{itemSon.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>{{itemSon.market_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            </router-link>

                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// 导入 axios
import axios from "axios";

// 引入 moment.js
// import moment from "moment";

export default {
  // 设置名字validation
  name: "index",
  data: function() {
    return {
      //   info: "我是一条信息"
      catelist: [], // 分类数据
      sliderlist: [], // 轮播图数据
      toplist: [], // 热卖排行,
      groupDate: [] // 底部的分类数据
    };
  },
  // 生命周期函数
  // 创建之前
  beforeCreate() {
    // console.log("beforeCreate");
    // console.log(this.info);
  },
  // 创建完毕
  created() {
    // 网络数据获取 顶部数据
    axios
      .get("http://47.106.148.205:8899/site/goods/gettopdata/goods")
      .then(response => {
        // 把获取到的数据 设置给 当前这个组件的 data属性
        this.catelist = response.data.message.catelist;
        this.sliderlist = response.data.message.sliderlist;
        this.toplist = response.data.message.toplist;
        // 打印数据
        // console.log(this.catelist);
      });

    // 网络数据获取 底部的分类数据
    axios
      .get("http://47.106.148.205:8899/site/goods/getgoodsgroup")
      .then(response => {
        //   console.log(response);
        this.groupDate = response.data.message;
      });
  },
  // 过滤器 抽取到 main.js 为全局过滤器了
//   filters: {
//     //   过滤日期
//     filterDate(val) {
//       return moment(val).format("YYYY年MM月DD日");
//     }
//   }
};
</script>
<style>
/* 设置轮播图 图片的大小 */
.el-carousel__item img {
  width: 100%;
  height: 100%;
}
.el-carousel__item h3 {
  /* position:absolute;
        bottom: 0;
        left: 0; */
}
</style>



