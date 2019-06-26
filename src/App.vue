<template>
  <div class="appContainer">
    <!-- 这里是header -->
    <header id="header" class="mui-bar mui-bar-nav">
      <a v-if="showBack" @click="goBack" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
      <h1 class="mui-title">安师生活——爱安师爱生活</h1>
    </header>
    <!-- 这里是内容区 -->
    <div class="mui-content">
      <transition mode="out-in">
        <keep-alive include="newsList">
            <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
    <!-- 这里是footer -->
    <div class="footer">
      <nav class="mui-bar mui-bar-tab">
        <router-link class="mui-tab-item" to="/home">
          <span class="mui-icon mui-icon-home"></span>
          <span class="mui-tab-label">首页</span>
        </router-link>
        <router-link class="mui-tab-item" to="/classes">
          <span class="mui-icon mui-icon-extra mui-icon-extra-class"></span>
          <span class="mui-tab-label">分类</span>
        </router-link>
        <router-link class="mui-tab-item" to="/find">
          <span class="mui-icon mui-icon-extra mui-icon-extra-find"></span>
          <span class="mui-tab-label">发现</span>
        </router-link>
        <router-link class="mui-tab-item" to="/cart">
          <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
            <span class="mui-badge">0</span>
          </span>
          <span class="mui-tab-label">购物车</span>
        </router-link>
        <router-link class="mui-tab-item" to="/user">
          <span class="mui-icon mui-icon-extra mui-icon-extra-peoples"></span>
          <span class="mui-tab-label">我的</span>
        </router-link>
      </nav>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      showBack:false,//是否显示回退箭头，默认不显示
    }
  },
  methods: {
    goBack(){
      // $route：管路由和传参
      // $router：管url
      this.$router.go(-1)
    }
  },
  created(){
    //回退箭头
    if(this.$router.path=='/home'){
        this.showBack = false;
      }else{
        this.showBack = true;
      }
  },
  watch: {
    //监听路由，如果是/home，则不显示回退箭头，否则显示
    '$route.path':function(newValue,oldValue){
      if(newValue == '/home'){
        this.showBack = false;
      }else{
        this.showBack = true;
      }
    }
  },
};
</script>
<style lang="less">
.appContainer {
  padding-bottom: 50px;
  overflow: hidden;
  // 导航栏箭头样式
  #header{
    a{
      color: white;
    }
  }
  // 导航栏样式
  .mui-bar-nav {
    background: #ca0000;
    .mui-title {
      color: #eeeeee;
      font-size: 20px;
      font-weight: bold;
      font-family: "微软雅黑";
    }
  }
  // 底部导航样式
  .footer {
    .mui-bar {
      .mui-active {
        color: #ca0000;
      }
    }
  }
  .v-enter {
    opacity: 0;
    transform: translateX(100%);
  }
  .v-leave-to {
    opacity: 0;
    transform: translateX(-100%);
  }
  .v-enter-active,
  .v-leave-active {
    transition: all 0.3s ease;
  }
}
</style>

