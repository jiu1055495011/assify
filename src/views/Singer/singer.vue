<template>
  <div class="hello">
    <!--   1 -->
    <ul class="singer-class-list" >
      <li v-for="item in arr1" @click="Sing(item)">

        <a href="#">
          <p class="singer-list-p">{{item.classname}}</p>
          <img src="http://m.kugou.com/v3/static/images/index/arrow_icon.png" alt="" class="singer-list-arrow">
        </a>

      </li>
    </ul>
    <!--    2-->
    <ul class="singer-class-list" >
      <li v-for="item in arr2" @click="Sing(item)">
        <a href="#">
          <p class="singer-list-p">{{item.classname}}</p>
          <img src="http://m.kugou.com/v3/static/images/index/arrow_icon.png" alt="" class="singer-list-arrow">
        </a>
      </li>
    </ul>
    <!--    3-->
    <ul class="singer-class-list" >
      <li v-for="item in arr3" @click="Sing(item)">
        <a href="#">
          <p class="singer-list-p">{{item.classname}}</p>
          <img src="http://m.kugou.com/v3/static/images/index/arrow_icon.png" alt="" class="singer-list-arrow">
        </a>
      </li>
    </ul>
    <!--    4-->
    <ul class="singer-class-list" >
      <li v-for="item in arr4" @click="Sing(item)">
        <a href="#">
          <p class="singer-list-p">{{item.classname}}</p>
          <img src="http://m.kugou.com/v3/static/images/index/arrow_icon.png" alt="" class="singer-list-arrow">
        </a>
      </li>
    </ul>


  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'App',
    data() {
      return{
        list:[],
        arr1:[],
        arr2:[],
        arr3:[],
        arr4:[],
      }
    },methods:{
       Sing(data){
          // console.log(data);
         localStorage.setItem("temp",data.classid,)
         // console.log(localStorage.getItem("temp"))
         this.$router.push('cut')
       }
    },
    created() {
      axios('/proxy/singer/class?json=true').then(({data})=>{
        // console.log(data);
        let newData = data.list;
        for(let i=0;i<newData.length;i++){
          /* 通过newData[i]  indexOf-> 查找热门 如果没有就返回一个 -1  */
          if(newData[i].classname.indexOf('热门') != -1){
            /* 向该数组arr1 添加一个元素   */
            this.arr1.push(newData[i])
          }
          if(newData[i].classname.indexOf('华语') != -1){
            this.arr2.push(newData[i])
          }
          if(newData[i].classname.indexOf('日韩') != -1){
            this.arr3.push(newData[i])
          }
            if(newData[i].classname.indexOf('欧美') != -1){
            this.arr4.push(newData[i])
          }
        }
        // console.log(this.arr1)
        // console.log(this.arr2)
        // console.log(this.arr3)
        // console.log(this.arr4)

      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello{
    margin-top: 3.4rem;
  }
  .singer-class-list{
    margin: 0 .3rem .4rem .4rem;
    background: #fbfbfb;
    border: 1px solid #e4e4e4;
    border-radius: 5px;
  }
  .singer-class-list li{
    border-top: 1px solid #e4e4e4;
    font-size: .8rem
  }
  .singer-class-list li:first-child {
    border-top: none;
  }
  .singer-class-list li a{
    display: block;
    padding: .4rem;
  }
  .singer-list-p{
    font-size: .4rem;
    color: #333;
  }
  .singer-list-arrow{
    float:right;
    height: .4rem;
    width: .4rem;
    margin-top: -0.4rem;
  }
</style>
