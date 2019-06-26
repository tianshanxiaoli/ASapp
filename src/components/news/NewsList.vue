<template>
  <div class="newslistContainer">
    <!-- 使用Mint-UI提供的 Infinite Scroll 实现上滑加载第二页 -->
    <!-- 
        v-infinite-scroll="loadMore" 此属性用来设置AJAX请求数据的方法 
        infinite-scroll-disabled="loading" 此属性用来设置该组件是否还继续响应上滑请求的动作，类型是bool类型，true表示已经加载完成所有数据
        infinite-scroll-distance="10" 此属性用来设置当组件距离底部多远的时候触发 loadmore 事件
    -->
    <ul class="newslist"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="isLoading"
      infinite-scroll-distance="100"
      style="max-height: 100vh; overflow-y:auto;"
    >
      <li v-for="item in newsList" :key="item.id">
        <router-link :to="'/home/newsinfo/' + item.id">
          <p class="news_title">{{item.title}}</p>
          <p class="news_des">
            <span class="author">{{item.author}}</span>
            <span class="add_time">{{item.add_time | dateFormat}}</span>
            <span class="click_count">阅读:{{item.click_count}}</span>
          </p>
        </router-link>
      </li>
      <!-- 页面加载动画部分 -->
      <li class="more_loading">
        <mt-spinner type="fading-circle" v-show="is_loading_more"></mt-spinner>
        <span v-show="finished">已经全部加载</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name:"newsList",
  data() {
    return {
      newsList: [], //新闻列表
      isLoading: false, // 默认是要响应上滑动作
      pageIndex: 1, // 默认是第一页
      pageSize: 10, // 默认每页加载10个新闻
      is_loading_more: false, //控制是否显示加载动画图案
      finished: false //控制是否显示 已经全部加载 这一行字
    };
  },
  created() {},
  methods: {
    loadMore() {
      // 设置上滑动作响应节流，上滑一次之后，不在响应上滑动作，数据加载过后再次响应
      this.isLoading = true;
      this.is_loading_more = true;
      this.finished = false;
      this.$ajax({
        method: "GET",
        url: "/news/newslist",
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      }).then(response => {
        var data = response.data;
        if (data.Status == 0) {
          data.Data.forEach(item => {
            item.add_time = new Date();
          });
          //把请求过来的数据和上次的数据进行拼接，而不能直接给数组赋值，否则会把上一次的数据更新掉
          this.newsList = this.newsList.concat(data.Data);
          // 把页数+1
          this.pageIndex++;
          // 允许再响应上滑动作
          this.isLoading = false;
          // 关闭上滑显示动画图标
          this.is_loading_more = false;
          //如果请求过来的数据长度，小于每一页默认加载的个数，则认为是加载到了最后一页
          if (data.Data.length < this.pageSize) {
            this.isLoading = true;
            this.finished = true;
          }
        } else {
          // 如果数据没有请求到
          this.finished = true;
        }
      });
    }
  }
};
</script>

<style lang="less">
.newslistContainer {
  .newslist {
    list-style: none;
    padding: 0 16px;
    li {
      border-bottom: 1px solid #ddd;
      padding: 10px 0;
      p {
        margin: 0;
      }
      p.news_title {
        font-size: 16px;
        color: #333;
      }
      p.news_des {
        font-size: 12px;
        color: #aaa;
        padding-top: 5px;
        display: flex;
        justify-content: space-between;
      }
    }
    .more_loading {
      font-size: 12px;
      color: #aaa;
      text-align: center;
      border: none;
      .mint-spinner-fading-circle {
        position: relative;
        left: 45%;
      }
    }
  }
}
</style>
