// 导入路由的包
import VueRouter from 'vue-router'

// 导入子组件
import Home from './components/tab/Home.vue'
import Classes from './components/tab/Classes.vue'
import Find from './components/tab/Find.vue'
import Cart from './components/tab/Cart.vue'
import User from './components/tab/User.vue'
import NewsList from './components/news/NewsList.vue'
import ImageList from './components/photo/ImageList.vue'
import GoodsList from './components/shop/GoodsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
// 创建路由对象
const router = new VueRouter({
    routes: [//路由规则
        { path: '/', redirect: '/home' },
        { path: '/home', component: Home },
        { path: '/classes', component: Classes },
        { path: '/find', component: Find },
        { path: '/cart', component: Cart },
        { path: '/user', component: User },
        { path: '/home/newslist', component: NewsList },
        { path: '/home/newsinfo/:id', component: NewsInfo },
        { path: '/home/imagelist', component: ImageList },
        { path: '/home/goodslist', component: GoodsList },
    ],
    //自定义类名
    linkActiveClass: 'mui-active'
});

//把路由对象暴露出去
export default router