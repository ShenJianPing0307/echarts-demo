<template>
    <div>
        <ve-histogram  :toolbox="toolbox" :data="chartData"  width="300px" :settings="chartSettings" :extend="chartExtend" :events="chartEvent"></ve-histogram>

        <p></p>
        <ve-bar :data="chartData1" :settings="chartSettings1" ref="chart"></ve-bar>
    </div>
    <!--<HelloWorld :tableData="tableData" v-if="tableData"></HelloWorld>-->
</template>

<script>
  // import HelloWorld from './HelloWorld.vue'
  export default {

    data(){
      this.chartSettings1 =  {
        stack: {
          'xxx': ['访问用户', '下单用户']
        }
      },
        this.toolbox = {
          feature: {
            magicType: {type: ['line', 'bar']},
            saveAsImage: {}
          }
        }

      this.chartSettings = {
        // axisSite: { right: ['下单率'] },
        yAxisType: ['KMB', 'percent'],
        yAxisName: ['数值', '比率'],
        showLine:['下单率'],
        axisSite:{right:['下单率']},
        stack: { '用户': ['访问用户', '下单用户'] }

      }
      this.chartExtend = {
        // title:{
        //   show:false,
        //   text:'实时数据'
        // },
        // legend:{
        //   show:false
        // },
        // xAxis:[
        //   {
        //     type:'category',
        //     data:['1月','2月'],
        //     axisPointer:{
        //       type:'shadow'
        //     }
        //   }
        // ],
        // yAxis:[
        //   {
        //     type:'value',
        //     name:'水量',
        //     min:0,
        //     max:250,
        //     interval:50,
        //     axisLabel:{
        //       formatter:'{value}ml'
        //     }
        //   },
        //   {
        //     type:'value',
        //     name:'温度',
        //     min:0,
        //     max:25,
        //     interval:5,
        //     axisLabel:{
        //       formatter:'{value}c'
        //     }
        //   }
        // ],
        // series:[
        //   {
        //     name:'蒸发量',
        //     type:'bar',
        //     data:[2.0,4,0]
        //   },
        //   {
        //     name:'降水量',
        //     type:'bar',
        //     data:[2.6,4,8]
        //   },
        //   {
        //     name:'平均温度',
        //     type:'line',
        //     yAxisIndex:1,
        //     data:[2.0,2.2]
        //   },
        // ]
        // 纵坐标
        // yAxis(item) {
        //   item[0].splitLine = Object.assign({}, {
        //     lineStyle: {
        //       color: ['#3755DA'],
        //     }
        //   });
        //   item[0].axisLabel = Object.assign( {},{
        //     color: 'white'
        //   });
        //   item[0].nameTextStyle = Object.assign( {},{
        //     color: 'white',//正常是不用添加
        //   });
        //   item[1].splitLine = Object.assign({}, {
        //     show: false,
        //     lineStyle: {
        //       color: ['#3755DA'],
        //     }
        //   });
        //   item[1].axisLabel = Object.assign( {},{
        //     color: 'white'
        //   });
        //   item[1].nameTextStyle = Object.assign( {},{
        //     color: 'white',//正常是不用添加
        //   });
        //   return item
        // }

        yAxis(item){
          // item[0].nameTextStyle = {
          //   padding: [0, 10, 0, 0]
          // }
          // // 坐标轴线设置
          // item[0].axisLine = {
          //   show: true,
          //     lineStyle: {
          //     color: '#ccc'
          //   }
          // }

          /* 右轴 */
          // 坐标轴名称的文字样式
          item[1].nameTextStyle = {
            padding: [0, 10, 0, 0]
          }
          // 坐标轴线设置
          // 坐标轴线设置
          // item[1].axisLine = {
          //   show: true,
          //     lineStyle: {
          //     color: '#ccc'
          //   }
          // }
          item[1].scale=true
          item[1].min=0
          item[1].max=1

          return item



        }

      }

      var self = this
      this.chartEvent = {
        click:function (e) {
          self.name = e.name
          console.log(e)
        }
      }
        return{



          // tableData: [{
          //   date: '2016-05-02',
          //   name: '<a offeringIdList="[]">0</a>',
          //   address: '上海市普陀区金沙江路 1518 弄'
          // }, {
          //   date: '2016-05-04',
          //   name: '<a offeringIdList="[1,2,3,4,5]">5</a>',
          //   address: '上海市普陀区金沙江路 1517 弄'
          // }, {
          //   date: '2016-05-01',
          //   name: 'None',
          //   address: '上海市普陀区金沙江路 1519 弄'
          // }, {
          //   date: '2016-05-03',
          //   name: '王小虎',
          //   address: '上海市普陀区金沙江路 1516 弄'
          // }],
          chartData: {
            columns: ['日期', '访问用户', '下单用户', '下单率'],
            rows: [
              { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.5 },
              { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.32 },
              { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.8 },
              { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.28 },
              { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323},
              { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.74 }
            ]
          },
          chartData1: {
            columns: ['日期', '访问用户', '下单用户', '下单率'],
            rows: [
              { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
              { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
              { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
              { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
              { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
              { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
            ]
          }




        }

    },
    name: "father",
    components: {
      // HelloWorld
    },

    mounted(){
      this.$nextTick(_ => {
        // this.$refs[`chart${v}`].echarts.resize()
        console.log(this.$refs['chart'])
      })

    },
    methods:{



    }
  }
</script>

<style scoped>

</style>
