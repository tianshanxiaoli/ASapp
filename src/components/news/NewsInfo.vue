<template>
    <div class="newsinfoContainer">
        <!-- 标题部分 -->
        <section class="title">
            <h2>{{this.news.title}}</h2>
        </section>
        <!-- 编辑 日期 点击量 部分 -->
        <section class="des">
            <p>
                <span class="author">编辑：{{this.news.author}}</span>
                <span class="add_time">日期：{{this.news.add_time | dateFormat}}</span>
                <span class="click_count">阅读：{{this.news.click_count}}</span>
            </p>
        </section>
        <!-- 图片 部分 -->
        <section class="img">
            <img :src="this.news.img_url" alt="">
        </section>
        <!-- 新闻正文 部分 -->
        <section class="content">
            <div v-html="this.news.content"></div>
        </section>
        <!-- 评论 部分 -->
        <section class="comment">
            <!-- 封装一个评论组件 -->
            <comment :id="this.newsid"></comment>
        </section>
    </div>
</template>
<script>
//1.导入评论组件
//2.把comment挂载到NewInfo身上
//3.通过标签的形式,插入到newsinfo的template中
import comment from '../subComponents/comment.vue';

export default {
    data(){
        return {
            newsid : this.$route.params.id, //第一步，获取路由传递过来的参数
            news:{}//保存通过ajax请求，获取到的新闻数据，由此来做数据绑定
        }
    },
    created(){
        this.loadNewsInfo();
    },
    methods: {
        //第二步,通过ajax获取到新闻详情
        loadNewsInfo(){
            this.$ajax({
                method: 'get',
                url: '/news/newsinfo/',
                params: {
                    newsid: this.newsid,
                }
            }).
            then(response => {
                var data = response.data;
                if(data.Status == 0){
                    this.news = data.Data[0];
                }else{
                    this.news='';
                }
            })
        }
    },
    components:{
        comment
    }
}
</script>

<style lang="less">
.newsinfoContainer{
    padding: 15px;
    .title{
        padding: 5px 0;
        font-size: 24px;
        color: #333;
    }
    .des{
        font-size: 12px;
        color: #aaa;
        padding-bottom: 20px;
        p{
            display: flex;
            justify-content: space-between;
        }
    }
    .img{
        img{
            width: 100%;
        }
        padding-bottom: 10px;
    }
    .content{
        font-size: 14px;
        color: #444;
        P{
            text-indent: 20px;
        }
    }
}
</style>
