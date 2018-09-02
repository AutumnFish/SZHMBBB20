<template>
    <div class="center">
        <div class="el-row">
            <div class="el-col el-col-24">
                <div class="comp">
                    <div class="goodsinfo routeanimate">
                        <div class="section">
                            <div class="location">
                                <span>当前位置：</span>
                                <router-link to="/index">首页&gt;</router-link>  
                                <a href="javascript:;">支付中心</a>
                            </div>
                        </div>
                        <div class="section">
                            <div class="wrapper">
                                <div class="bg-wrap">
                                    <div class="nav-tit pay">
                                        <a href="javascript:;" class="selected">支付中心</a>
                                    </div>
                                    <div class="msg-tips">
                                        <div class="icon">
                                            <i class="iconfont icon-check"></i>
                                        </div>
                                        <div class="info">
                                            <strong>订单已支付成功！</strong><span><span style='color:yellowgreen;font-size:30px'>{{time}}</span>秒后去订单详情页</span>
                                            <p>您可以点击这里进入
                                                <router-link to="/vipCenter" style="font-size:30px">会员中心</router-link>
                                                查看订单状态！</p>
                                            <p>如有其它问题，请立即与我们客服人员联系。</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'paySuccess',
    data:function(){
        return {
            time:5
        }
    },
    // 创建之前 
    beforeCreate() {
        
    },
    // Vue组件创建之后
    created() {
        
    },
    // 渲出来之后
    mounted() {
        // 定时器 间隔 跳转
        let interId = setInterval(()=>{
            // 组件中的
            this.time--;
            if(this.time==0){
                // 清除定时器
                clearInterval(interId);
                // 跳转页面
                // this.$router.push('/VipCenter');
                // 返回上一页 上上一页
                // this.$router.go(-2);
                
                // 直接跳转到 订单详情页
                this.$router.push('/orderDetail/'+this.$route.params.id);
            }
        },1000)
    },
};
</script>
<style>
</style>


