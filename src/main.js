// 导入vue包
import Vue from 'vue';
// 导入根组件
import App from './App.vue';

// 导入mui样式包
import './lib/mui/css/mui.css';
// 导入mui的扩展图标的样式文件
import './lib/mui/css/icons-extra.css';

// 导入路由包
import VueRouter from 'vue-router';
// 安装路由
Vue.use(VueRouter);
// 导入路由模块
import router from './router.js';

//导入mint-ui
import MintUI from 'mint-ui';
//导入mint-ui的样式
import 'mint-ui/lib/style.css'
//把mint-ui挂载到vue身上
Vue.use(MintUI);

//导入axios
import axios from 'axios';
// 把axios对象挂载到Vue.prototype身上
Vue.prototype.$ajax = axios;
//配置请求的的url地址的根路径
axios.defaults.baseURL='http://www.barteam.cn:8086'

// 导入moment日期组件
import Moment from 'moment'
// 创建日期格式化过滤器
Vue.filter('dateFormat',function(dateStr,pattern = 'YYYY--MM--DD HH:MM'){
    return Moment(dateStr).format(pattern);
})


var vm = new Vue({
    el:'#app',
    render:c => c(App),
    router
})