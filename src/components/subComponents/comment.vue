<template>
    <div class="commentContainer">
        <div class="cmtHeader">
            <h3>观点</h3>
        </div>
        <div class="cmtList">
            <ul>
                <li v-for="item in list" :key="item.id">
                    <p>
                        <span class="mui-icon mui-icon-contact"></span>
                        <span class="user">匿名用户</span>
                        <span class="add_time">{{item.add_time | dateFormat }}</span>
                    </p>
                    <p class="content">
                        {{item.content}}
                    </p>
                </li>
            </ul>
            <button type="button" class="mui-btn mui-btn-danger mui-btn-block mui-btn-outlined"
             @click="loadMoreComment">加载更多评论</button>
        </div>
        <div class="postCmt">
            <p>
                <span>发表我的观点</span>
                <span @click="postComment">发送</span>
            </p>
            <textarea rows="3" class="txtMsg" placeholder="优质观点将在前排展示" v-model="msg"></textarea>
        </div>
    </div>
</template>
<script>
//import '..'
import {Toast} from 'mint-ui';
export default {
    data(){
        return{
           pageindex: 1,
           pagesize: 10,
           list: [],
           msg: ''
        }
    },
    created(){
        this.getComments();
    },
    methods: {
        getComments(){
            this.$ajax({
                method: 'get',
                url: '/comment',
                params: {
                    srcid:this.id,
                    pageindex: this.pageindex,
                    pagesize: this.pagesize
                }
            }).
            then(response => {
                var data = response.data;
                if(data.Status == 0){
                    if(data.Data.length > 0){
                        this.list = this.list.concat(data.Data);
                    }else{
                        Toast({
                            message: '没有更多评论了',
                            duration: 3000
                        })
                    }
                }else{
                    Toast({
                            message: '请求评论失败',
                            duration: 3000
                        })
                }
            })
        },
        loadMoreComment(){
            this.pageindex++;
            this.getComments();
        },
        postComment(){
            if(this.msg.length > 0){
                this.$ajax({
                    method:'post',
                    url: '/comment',
                    //如果是get请求传参，使用params属性
                    //如果是post请求传参，使用data属性
                    data:qs.stringify({
                        srcId: this.id, //被评论的对象的主键id
                        content: this.msg,
                        add_time: new Date(),
                    })
                }).
                then(response => {
                    //如果post请求正确响应了，我们就可以直接把新发表的评论，组织成一个对象，然后添加到list数组中
                    var key = new Date().getMilliseconds();
                    this.list.unshift({id: new Date(), content:this.msg, srcId:this.id,add_time:new Date()})
                    this.msg = '';
                })
            }else{
                Toast({
                    message:'不能发表空评论',
                    duration: 3000,
                    position: 'buttom'
                })
            }
        }
    },
    props: ["id"] //从父组件传递过来服务端要传递的srcid参数值
}
</script>
<style lang="less">
.commentContainer{
    .cmtHeader{
        padding: 10px 0;
        border-bottom: 1px solid #ddd;
        h3{
            border-left: 5px solid #ce000;
            padding-left: 10px;
            font-size: 18px;
            font-family: '微软雅黑';
            font-weight: bold;
            color: #333;
        }
    }
    .cmtList{
        ul{
            letter-spacing: none;
            padding: 0;
            li{
                padding: 0;
                margin: 0;
                p{
                    padding: 5px 0;
                    margin: 0;
                    font-size: 14px;
                    .user{
                        color: darkgoldenrod;
                        padding-right: 20px;
                    }
                }
                p.content{
                    padding-left: 28px;
                    font-size: 16px;
                }
            }
        }
    }
    .postCmt{
        p{
            display: flex;
            justify-content: space-between;
            span{
                padding: 5px;
            }
        }
        .txtMsg{
            color: #444;
            font-size: 14px;
        }
    }
}
</style>
