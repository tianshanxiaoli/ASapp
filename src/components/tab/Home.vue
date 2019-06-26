<template>
  <div class="homeContainer">
    <!-- 这里是轮播图 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in swipeList" :key="item.id">
        <img :src="item.img_url" alt>
      </mt-swipe-item>
    </mt-swipe>
    <!-- 这里是九宫格 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="/home/newslist">
          <img src="../../images/menu1.png" alt>
          <div class="mui-media-body">安师新闻</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="/home/imagelist">
          <img src="../../images/menu2.png" alt>
          <div class="mui-media-body">光影安师</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="/home/goodslist">
          <img src="../../images/menu3.png" alt>
          <div class="mui-media-body">安师商城</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to>
          <img src="../../images/menu4.png" alt>
          <div class="mui-media-body">记录安师</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to>
          <img src="../../images/menu5.png" alt>
          <div class="mui-media-body">一卡通</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to>
          <img src="../../images/menu6.png" alt>
          <div class="mui-media-body">校园社团</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to>
          <img src="../../images/menu7.png" alt>
          <div class="mui-media-body">户外出行</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to>
          <img src="../../images/menu8.png" alt>
          <div class="mui-media-body">休闲娱乐</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to>
          <img src="../../images/menu9.png" alt>
          <div class="mui-media-body">考研交流</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      swipeList: []
    };
  },
  methods: {
    getSwipeData() {
      //使用axios发出ajax请求
      //1.cnpm i axios -S
      //2.import 导入axios
      //3.把axios对象，挂载到Vue.prototype身上，因为它不支持Vue.use()的语法挂载
      this.$ajax({
        method: "get",
        url: "/sliderlist"
      })
        .then(response => {
          // console.log(response);
          var data = response.data;
          if (data.Status == 0) {
            //服务端正确响应，并发回了数据
            this.swipeList = data.Data;
          } else {
            Toast("无法加载轮播图数据");
          }
        })
        .catch(err => {});
    }
  },
  created() {
    //调用获取轮播图数据的函数
    this.getSwipeData();
  }
};
</script>
<style lang="less">
.homeContainer {
  .mint-swipe {
    height: 240px;
    background-color: #369;
    .mint-swipe-item {
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .mui-table-view-cell img {
    width: 3.3rem;
  }
}
</style>