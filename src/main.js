import Vue from 'vue'
import App from './App.vue'
// import echarts from 'echarts'
import VCharts from 'v-charts'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
// Vue.prototype.$echarts = echarts
Vue.use(VCharts)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')


