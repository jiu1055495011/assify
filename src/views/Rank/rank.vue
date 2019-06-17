<template>
  <div class="hello">
      <ul class="r_box">
        <li v-for="item,rankid in list" @click="show(item)">
<!--          <router-link :to="{path: '/info/' + item.rankid}"  >-->
          <a>
            <div class="panel-img-left"><img :src="item.imgurl" alt="" ></div>
            <div class="panel-img-content" ><p>{{item.rankname}}</p></div>
            <div class="panel-img-right">
              <img src="https://m3ws.kugou.com/v3/static/images/index/arrow_icon.png" alt="">
            </div>
          </a>
<!--          </router-link>-->
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

        // img:[]
      }
    },
    methods:{
      show(data){
        // console.log(data)
        localStorage.setItem("temp",data.rankid);
        // console.log(localStorage.getItem("temp"));
        this.$router.push('info');
      }
    },
    created() {
      // console.log('app')
      axios('/proxy/rank/list?json=true').then(({data})=>{
        // console.log(data.rank.list)
        this.list = data.rank.list
        // console.log(this.list);
        for(let i = 0;i<this.list.length;i++){
          this.list[i].imgurl = `http://imge.kugou.com/mcommon/400`+ this.list[i].imgurl.split('{size}')[1]
          // console.log(this.list[i].imgurl)
          // this.img = this.list[i].imgurl;
        }
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello{
    margin-top: 3.1rem;
  }
  .r_box{
  }
  .r_box li{
  }
  .r_box li a{
    margin-left: .35rem;
    height: 3rem;
    display: block;
    position: relative;
    border-bottom: 1px solid #e5e5e5;
    padding: .05rem 0rem .05rem 0rem;
  }
  .panel-img-left{
    float: left;
    width: 2.5rem;
    height: 2.5rem;
    background: #42b983;
    margin:10px 0;
    box-sizing: border-box;
  }
  .panel-img-left img{
    height: 100%;
    width: 100%;
  }
  .panel-img-content{
    display: block;
    float: left;
    font-size: .5rem;
    color: #333;
    line-height: 3rem;
    padding-left: .5rem;
  }

  .panel-img-right{
    float: right;
    width: 1.5rem;
    height: 2.5rem;
    margin:10px 0;
  }
  .panel-img-right img{
    height: .5rem;
    width: .3rem;
    top: 50%;
    right: .2rem;
    display: block;
    margin: 1rem 0 0 .8rem;
  }
</style>
