<template>
  <div class="hello">
    <!--<button @click="hh">切换</button>-->
    <!--<div  v-show="flag" id="myChart" :style="{width: '500px', height: '400px'}">图表</div>-->
    <!--<div  v-show="!flag">-->
    <!--<div>-->
    <div class="export">
      <el-button @click="exportExcel" style="margin-top: 2px;" size="medium" type="success">导出</el-button>
    </div>
    <el-table
            id="rebateSetTable"
            :data="tableData"
            @cell-click="handle"
            border
            row-key="id"
    >
      <el-table-column
              align="center"
              prop="date"
              label="日期"
              width="180">
      </el-table-column>
      <el-table-column
              align="center"
              prop="name"
              label="姓名"
              width="180">
        <template slot-scope="scope">
          <el-tooltip  content="hello" :disabled="scope.row.name.length !== 28 ? true : false ">
          <div v-html="scope.row.name.length"></div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
              align="center"
              prop="address"
              label="地址"
      >

      </el-table-column>

    </el-table>
      <el-pagination
              @current-change="currentchange"
              @prev-click="prevclick"
              @next-click="nextclick"
              :page-size="currentpage1"
              background
              layout="prev, pager, next"
              :total="getTotal"
      >
      </el-pagination>
    </div>
  <!--</div>-->
</template>

<script>
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'
  import 'echarts-liquidfill/src/liquidFill.js';
  // import Sortable from 'sortablejs'
export default {

  data(){
    return {
      // flag:true,
      currentpage1:1,
      flags:true,
      // active: "",
    }
  },
  name: 'HelloWorld',
  props: {
    tableData:{
      type:Array
    }
  },

  computed:{
    getTotal(){
      return this.tableData.length
    }
  },
  mounted(){
    // this.rowDrop();
    // this.columnDrop();
  },

  // watch:{
  //   tableData:{
  //     deep:true,
  //     // immediate:true,
  //     handler(newValue,oldValue){
  //       for(let i=0;i<newValue.length;i++){
  //         if(newValue[i]!=oldValue[i]){
  //           console.log(newValue)
  //           console.log(oldValue)
  //         }
  //       }
  //
  //     }
  //   }
  // },

  // watch(){
  //
  //   tableData:{
  //     handler(newValue,oldValue){
  //       deep:true,
  //
  //     }
  //   },
  //
  //   // tableDATA:{
  //   //   handler(newValue, oldValue){
  //   //     console.log('obj.a changed');
  //   //                         },
  //   //        // immediate:true,
  //   //           deep:true
  //   // }
  // },
  //
  // mounted() {
  //   this.setValue()
  //   // this.draw()
  // },
  // computed:{
  //   gettotal(){
  //     return this.tableData.length
  //   }
  // },
  methods:{
    // 行拖拽
    // rowDrop () {
    //   //此时找到的元素是要拖拽元素的父容器
    //   const tbody = document.querySelector('.el-table__body-wrapper tbody');
    //   const _this = this;
    //   Sortable.create(tbody, {
    //     //  指定父元素下可被拖拽的子元素
    //     draggable: ".el-table__row",
    //     onEnd ({ newIndex, oldIndex }) {
    //       const currRow = _this.tableData.splice(oldIndex, 1)[0];
    //       _this.tableData.splice(newIndex, 0, currRow);
    //     }
    //   });
    //   // // 表格中需要实现行拖动，所以选中tr的父级元素
    //   // const table = document.querySelector('.el-table__body-wrapper tbody')
    //   // const self = this
    //   // Sortable.create(table, {
    //   //   onEnd({ newIndex, oldIndex }) {
    //   //     console.log(newIndex, oldIndex)
    //   //     const targetRow = self.resourceList.splice(oldIndex, 1)[0]
    //   //     self.resourceList.splice(newIndex, 0, targetRow)
    //   //   }
    //   // })
    // },
    // 列拖拽
    // columnDrop () {
    //   const _this = this;
    //   const wrapperTr = document.querySelector('.el-table__header-wrapper tr');
    //   this.sortable = Sortable.create(wrapperTr, {
    //     animation: 180,
    //     delay: 0,
    //     onEnd: evt => {
    //       // const oldItem = this.dropCol[evt.oldIndex];
    //       // _this.tableData.splice(evt.oldIndex, 1)
    //       // this.dropCol.splice(evt.oldIndex, 1);
    //       // this.dropCol.splice(evt.newIndex, 0, oldItem);
    //     }
    //   });
    // },

    exportExcel () {
      /* generate workbook object from table */
      let wb = XLSX.utils.table_to_book(document.querySelector('#rebateSetTable'));
      /* get binary string as output */
      let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '用户提交返利表.xlsx');
      } catch (e)
      {
        if (typeof console !== 'undefined')
          console.log(e, wbout)
      }
      return wbout
    },

      handle(row,column,event,cell){
        console.log('row',row)
        console.log('column',column)
        console.log('event',typeof event.getElementsByTagName('a')[0].getAttribute('offeringIdList'))
        let str = event.getElementsByTagName('a')[0].getAttribute('offeringIdList')
        console.log(typeof event.getElementsByTagName('a')[0].innerHTML)
        console.log(JSON.parse(str))
        console.log('cell',cell)
      }
    ,
    currentchange(val){
      console.log(val)
    },
    prevclick(val){
      console.log(val)
    },
    nextclick(val){
      console.log(val)
    },


    setValue(){
      this.tableList = this.tableDATA
    },

    prepage(val){
      console.log('prepage',val)
      this.tableData = this.tableData.slice((val-1)*2,2*val)
    },
    nextpage(val){
      console.log('nextpage',val)
      this.tableData = this.tableData.slice((val-1)*2,2*val)
    },
    //
    // hh(){
    //   if(this.flag === true){
    //     console.log(this.flag)
    //     this.flag=false
    //     console.log(this.flag)
    //   }else {
    //     this.flag=true
    //   }
    // },
    // draw(){
    //   let myChart = this.$echarts.init(document.getElementById('myChart'))
    //   // myChart.setOption({
    //   //   title: { text: '在Vue中使用echarts' },
    //   //   tooltip: {},
    //   //   xAxis: {
    //   //     data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
    //   //   },
    //   //   yAxis: {},
    //   //   series: [{
    //   //     name: '销量',
    //   //     type: 'bar',
    //   //     data: [5, 20, 36, 10, 10, 20]
    //   //   }]
    //   // });
    //   // var option = {
    //   //   backgroundColor: '#1b2735',
    //   //   title: {
    //   //     text: 'CPU使用率',
    //   //     textStyle: {
    //   //       fontWeight: 'normal',
    //   //       fontSize: 25,
    //   //       color: 'rgb(97, 142, 205)'
    //   //     }
    //   //   },
    //   //   series: [{
    //   //     type: 'liquidFill',
    //   //     radius: '80%',
    //   //     data: data,
    //   //     backgroundStyle: {
    //   //       borderWidth: 5,
    //   //       borderColor: 'rgb(255,0,255,0.9)',
    //   //       color: 'rgb(255,0,255,0.01)'
    //   //     },
    //   //     label: {
    //   //       normal: {
    //   //         formatter: (value * 100).toFixed(2) + '%',
    //   //         textStyle: {
    //   //           fontSize: 50
    //   //         }
    //   //       }
    //   //     }
    //   //   }]
    //   // }
    //   //流量统计
    //   // var value = 0.3;
    //   // var data = [value, value, value, ];
    //   // var option = {
    //   //   backgroundColor: new this.$echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
    //   //     offset: 0,
    //   //     color: '#431ab8'
    //   //   }, {
    //   //     offset: 1,
    //   //     color: '#471bba'
    //   //   }]),
    //   //   title: {
    //   //     text: (value * 100).toFixed(0) + '{a|%}',
    //   //     textStyle: {
    //   //       fontSize: 50,
    //   //       fontFamily: 'Microsoft Yahei',
    //   //       fontWeight: 'normal',
    //   //       color: '#bcb8fb',
    //   //       rich: {
    //   //         a: {
    //   //           fontSize: 28,
    //   //         }
    //   //       }
    //   //     },
    //   //     x: 'center',
    //   //     y: '35%'
    //   //   },
    //   //   graphic: [{
    //   //     type: 'group',
    //   //     left: 'center',
    //   //     top: '60%',
    //   //     children: [{
    //   //       type: 'text',
    //   //       z: 100,
    //   //       left: '10',
    //   //       top: 'middle',
    //   //       style: {
    //   //         fill: '#aab2fa',
    //   //         text: '流量统计',
    //   //         font: '20px Microsoft YaHei'
    //   //       }
    //   //     }]
    //   //   }],
    //   //   series: [{
    //   //     type: 'liquidFill',
    //   //     radius: '80%',
    //   //     center: ['50%', '50%'],
    //   //     //  shape: 'roundRect',
    //   //     data: data,
    //   //     backgroundStyle: {
    //   //       color: {
    //   //         type: 'linear',
    //   //         x: 1,
    //   //         y: 0,
    //   //         x2: 0.5,
    //   //         y2: 1,
    //   //         colorStops: [{
    //   //           offset: 1,
    //   //           color: 'rgba(68, 145, 253, 0)'
    //   //         }, {
    //   //           offset: 0.5,
    //   //           color: 'rgba(68, 145, 253, .25)'
    //   //         }, {
    //   //           offset: 0,
    //   //           color: 'rgba(68, 145, 253, 1)'
    //   //         }],
    //   //         globalCoord: false
    //   //       },
    //   //     },
    //   //     outline: {
    //   //       borderDistance: 0,
    //   //       itemStyle: {
    //   //         borderWidth: 20,
    //   //         borderColor: {
    //   //           type: 'linear',
    //   //           x: 0,
    //   //           y: 0,
    //   //           x2: 0,
    //   //           y2: 1,
    //   //           colorStops: [{
    //   //             offset: 0,
    //   //             color: 'rgba(69, 73, 240, 0)'
    //   //           }, {
    //   //             offset: 0.5,
    //   //             color: 'rgba(69, 73, 240, .25)'
    //   //           }, {
    //   //             offset: 1,
    //   //             color: 'rgba(69, 73, 240, 1)'
    //   //           }],
    //   //           globalCoord: false
    //   //         },
    //   //         shadowBlur: 10,
    //   //         shadowColor: '#000',
    //   //       }
    //   //     },
    //   //     color: {
    //   //       type: 'linear',
    //   //       x: 0,
    //   //       y: 0,
    //   //       x2: 0,
    //   //       y2: 1,
    //   //       colorStops: [{
    //   //         offset: 1,
    //   //         color: 'rgba(58, 71, 212, 0)'
    //   //       }, {
    //   //         offset: 0.5,
    //   //         color: 'rgba(31, 222, 225, .2)'
    //   //       }, {
    //   //         offset: 0,
    //   //         color: 'rgba(31, 222, 225, 1)'
    //   //       }],
    //   //       globalCoord: false
    //   //     },
    //   //     label: {
    //   //       normal: {
    //   //         formatter: '',
    //   //       }
    //   //     }
    //   //   }, ]
    //   // };
    //
    //   //渐变柱状图
    //   // var option = {
    //   //   backgroundColor:'#323a5e',
    //   //   tooltip: {
    //   //     trigger: 'axis',
    //   //     axisPointer: { // 坐标轴指示器，坐标轴触发有效
    //   //       type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    //   //     }
    //   //   },
    //   //   grid: {
    //   //     left: '2%',
    //   //     right: '4%',
    //   //     bottom: '14%',
    //   //     top:'16%',
    //   //     containLabel: true
    //   //   },
    //   //   legend: {
    //   //     data: ['1', '2', '3'],
    //   //     right: 10,
    //   //     top:12,
    //   //     textStyle: {
    //   //       color: "#fff"
    //   //     },
    //   //     itemWidth: 12,
    //   //     itemHeight: 10,
    //   //     // itemGap: 35
    //   //   },
    //   //   xAxis: {
    //   //     type: 'category',
    //   //     data: ['2012','2013','2014','2015','2016','2017','2018','2019'],
    //   //     axisLine: {
    //   //       lineStyle: {
    //   //         color: 'white'
    //   //
    //   //       }
    //   //     },
    //   //     axisLabel: {
    //   //       // interval: 0,
    //   //       // rotate: 40,
    //   //       textStyle: {
    //   //         fontFamily: 'Microsoft YaHei'
    //   //       }
    //   //     },
    //   //   },
    //   //
    //   //   yAxis: {
    //   //     type: 'value',
    //   //     max:'1200',
    //   //     axisLine: {
    //   //       show: false,
    //   //       lineStyle: {
    //   //         color: 'white'
    //   //       }
    //   //     },
    //   //     splitLine: {
    //   //       show: true,
    //   //       lineStyle: {
    //   //         color: 'rgba(255,255,255,0.3)'
    //   //       }
    //   //     },
    //   //     axisLabel: {}
    //   //   },
    //   //   "dataZoom": [{
    //   //     "show": true,
    //   //     "height": 12,
    //   //     "xAxisIndex": [
    //   //       0
    //   //     ],
    //   //     bottom:'8%',
    //   //     "start": 10,
    //   //     "end": 90,
    //   //     handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
    //   //     handleSize: '110%',
    //   //     handleStyle:{
    //   //       color:"#d3dee5",
    //   //
    //   //     },
    //   //     textStyle:{
    //   //       color:"#fff"},
    //   //     borderColor:"#90979c"
    //   //   }, {
    //   //     "type": "inside",
    //   //     "show": true,
    //   //     "height": 15,
    //   //     "start": 1,
    //   //     "end": 35
    //   //   }],
    //   //   series: [{
    //   //     name: '1',
    //   //     type: 'bar',
    //   //     barWidth: '15%',
    //   //     itemStyle: {
    //   //       normal: {
    //   //         color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
    //   //           offset: 0,
    //   //           color: '#fccb05'
    //   //         }, {
    //   //           offset: 1,
    //   //           color: '#f5804d'
    //   //         }]),
    //   //         barBorderRadius: 12,
    //   //       },
    //   //     },
    //   //     data: [400, 400, 300, 300, 300, 400, 400, 400, 300]
    //   //   },
    //   //     {
    //   //       name: '2',
    //   //       type: 'bar',
    //   //       barWidth: '15%',
    //   //       itemStyle: {
    //   //         normal: {
    //   //           color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
    //   //             offset: 0,
    //   //             color: '#8bd46e'
    //   //           }, {
    //   //             offset: 1,
    //   //             color: '#09bcb7'
    //   //           }]),
    //   //           barBorderRadius: 11,
    //   //         }
    //   //
    //   //       },
    //   //       data: [400, 500, 500, 500, 500, 400,400, 500, 500]
    //   //     },
    //   //     {
    //   //       name: '3',
    //   //       type: 'bar',
    //   //       barWidth: '15%',
    //   //       itemStyle: {
    //   //         normal: {
    //   //           color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
    //   //             offset: 0,
    //   //             color: '#248ff7'
    //   //           }, {
    //   //             offset: 1,
    //   //             color: '#6851f1'
    //   //           }]),
    //   //           barBorderRadius: 11,
    //   //         }
    //   //       },
    //   //       data: [400, 600, 700, 700, 1000, 400, 400, 600, 700]
    //   //     }]
    //   // };
    //   //
    //   // var app = {
    //   //   currentIndex: -1,
    //   // };
    //   // setInterval(function () {
    //   //   var dataLen = option.series[0].data.length;
    //   //
    //   //   // 取消之前高亮的图形
    //   //   myChart.dispatchAction({
    //   //     type: 'downplay',
    //   //     seriesIndex: 0,
    //   //     dataIndex: app.currentIndex
    //   //   });
    //   //   app.currentIndex = (app.currentIndex + 1) % dataLen;
    //   //   //console.log(app.currentIndex);
    //   //   // 高亮当前图形
    //   //   myChart.dispatchAction({
    //   //     type: 'highlight',
    //   //     seriesIndex: 0,
    //   //     dataIndex: app.currentIndex,
    //   //   });
    //   //   // 显示 tooltip
    //   //   myChart.dispatchAction({
    //   //     type: 'showTip',
    //   //     seriesIndex: 0,
    //   //     dataIndex: app.currentIndex
    //   //   });
    //   //
    //   //
    //   // }, 1000);
    //
    //
    //   // var option = {
    //   //   backgroundColor: '#0e202d',
    //   //   tooltip: {},
    //   //   xAxis: {
    //   //     data: ["企业", "农专", "个体"],
    //   //     axisTick: {
    //   //       show: false
    //   //     },
    //   //     axisLine: {
    //   //       show: false
    //   //     },
    //   //     axisLabel: {
    //   //       show: false,
    //   //       textStyle: {
    //   //         color: '#e54035'
    //   //       }
    //   //     }
    //   //   },
    //   //   yAxis: {
    //   //     splitLine: {
    //   //       show: false
    //   //     },
    //   //     axisTick: {
    //   //       show: false
    //   //     },
    //   //     axisLine: {
    //   //       show: false
    //   //     },
    //   //     axisLabel: {
    //   //       show: false
    //   //     }
    //   //   },
    //   //   series: [{
    //   //     name: '年报上报率3',
    //   //     type: 'pictorialBar',
    //   //     symbolSize: [100, 45],
    //   //     symbolOffset: [0, -20],
    //   //     z: 12,
    //   //     itemStyle: {
    //   //       normal: {
    //   //         color: '#14b1eb'
    //   //       }
    //   //     },
    //   //     data: [{
    //   //       value: 100,
    //   //       symbolPosition: 'end'
    //   //     }, {
    //   //       value: 50,
    //   //       symbolPosition: 'end'
    //   //     }, {
    //   //       value: 20,
    //   //       symbolPosition: 'end'
    //   //     }]
    //   //   }, {
    //   //     name: '年报上报率2',
    //   //     type: 'pictorialBar',
    //   //     symbolSize: [100, 45],
    //   //     symbolOffset: [0, 20],
    //   //     z: 12,
    //   //     itemStyle: {
    //   //       normal: {
    //   //         color: '#14b1eb'
    //   //       }
    //   //     },
    //   //     data: [100, 50, 20]
    //   //   }, {
    //   //     name: '年报上报率1',
    //   //     type: 'pictorialBar',
    //   //     symbolSize: [150, 75],
    //   //     symbolOffset: [0, 37],
    //   //     z: 11,
    //   //     itemStyle: {
    //   //       normal: {
    //   //         color: 'transparent',
    //   //         borderColor: '#14b1eb',
    //   //         borderWidth: 5
    //   //       }
    //   //     },
    //   //     data: [100, 50, 20]
    //   //   }, {
    //   //     name: '年报上报率',
    //   //     type: 'pictorialBar',
    //   //     symbolSize: [200,100],
    //   //     symbolOffset: [0, 50],
    //   //     z: 10,
    //   //     itemStyle: {
    //   //       normal: {
    //   //         color: 'transparent',
    //   //         borderColor: '#14b1eb',
    //   //         borderType: 'dashed',
    //   //         borderWidth: 5
    //   //       }
    //   //     },
    //   //     data: [100, 50, 20]
    //   //   }, {
    //   //     type: 'bar',
    //   //     itemStyle: {
    //   //       normal: {
    //   //         color: '#14b1eb',
    //   //         opacity: .7
    //   //       }
    //   //     },
    //   //     silent: true,
    //   //     barWidth: 100,
    //   //     barGap: '-100%', // Make series be overlap
    //   //     data: [100, 50, 20]
    //   //   }]
    //   // };
    //   // var value = 0.12
    //   // var data = []
    //   // data.push(value)
    //   // data.push(value)
    //   // data.push(value)
    //   // data.push(value)
    //   // data.push(value)
    //   // var option = {
    //   //   backgroundColor: '#1b2735',
    //   //   title: {
    //   //     text: 'CPU使用率',
    //   //     textStyle: {
    //   //       fontWeight: 'normal',
    //   //       fontSize: 25,
    //   //       color: 'rgb(97, 142, 205)'
    //   //     }
    //   //   },
    //   //   series: [{
    //   //     type: 'liquidFill',
    //   //     radius: '80%',
    //   //     data: data,
    //   //     backgroundStyle: {
    //   //       borderWidth: 5,
    //   //       borderColor: 'rgb(255,0,255,0.9)',
    //   //       color: 'rgb(255,0,255,0.01)'
    //   //     },
    //   //     label: {
    //   //       normal: {
    //   //         formatter: (value * 100).toFixed(2) + '%',
    //   //         textStyle: {
    //   //           fontSize: 50
    //   //         }
    //   //       }
    //   //     }
    //   //   }]
    //   // }
    //   // var option = {
    //   //   series: [{
    //   //     type: 'liquidFill',
    //   //     data: [0.6]
    //   //   }]
    //   // };
    //   // myChart.setOption(option)
    //
    //
    // }

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
