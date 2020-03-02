<template>
    <HelloWorld :tableData="tableData" v-if="tableData"></HelloWorld>
</template>

<script>
  import HelloWorld from './HelloWorld.vue'
  export default {
    data(){
        return{
          tableData: [{
            date: '2016-05-02',
            name: '<a offeringIdList="[1,2,3]">王小虎</a>',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }],
      }

    },
    name: "father",
    components: {
      HelloWorld
    }
  }
</script>

<style scoped>

</style>
