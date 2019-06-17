<template>
  <div class="hello">
    <ul class="panel-img-list">
        <li v-for="item in list" @click="entering(item)">
          <a href="#">
            <!--       图片     -->
            <div class="panel-img-left">
              <img :src="item.imgurl">
            </div>
            <!-- 文字-->
            <div class="panel-img-content">
              <p class="panel-img-content-first">
                {{item.specialname}}
             </p>
              <p class="panel-img-content-sub">
                <img src="http://m.kugou.com/v3/static/images/index/icon_music.png" alt="" class="icon-music">
                <span>{{item.playcount}}</span>
              </p>
            </div>
            <!--    >        -->
            <div class="panel-img-right">
              <img src="http://m.kugou.com/v3/static/images/index/arrow_icon.png" alt="">
            </div>
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
        // img:[]
      }
    },
    methods:{
      entering(data){
        // console.log(data)
        localStorage.setItem("temp",data.specialid);
        // console.log(localStorage.getItem("temp"))
        this.$router.push('list')
      }
    },
    created() {
      // console.log('app')
      axios('/proxy/plist/index?json=true').then(({data})=>{
        // console.log(data)
        this.list = data.plist.list.info
        // console.log(this.list)
        for(let i = 0;i<this.list.length;i++){
          this.list[i].imgurl = `http://imge.kugou.com/soft/collection/400`+ this.list[i].imgurl.split('{size}')[1]
          // console.log(this.list[i].imgurl)
          this.img = this.list[i].imgurl;
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
  .panel-img-list li{
    border-bottom: 1px solid #e5e5e5;
  }
  .panel-img-list li a{
    display: block;
    position: relative;
    margin-left: .35rem;
    padding: .2rem 0rem .3rem 0rem;
  }
  .panel-img-left{
    position: absolute;
    top: .2rem;
    left: 0;
    width: 2.5rem;
    height: 2.5rem
  }
  .panel-img-left img{
    width:100%;
    height: 100%;
  }
  .panel-img-content{
    min-height: 2.5rem;
    padding-left: 2.8rem;
    padding-right: 1rem;
    line-height: 1.5;
    font-size: .48rem;
    color: #333;
  }
  .panel-img-content-first{
    padding-top: .6rem;
  }
  .panel-img-content-sub{
    color: #9b9b9b;
    font-size: .38rem;
  }
  .panel-img-content-sub img{
    height: .35rem;
    width: .35rem;
  }
  .panel-img-right{
    position: absolute;
    top: 0rem;
    left: 8.45rem;
    width: 1.2rem;
    height: 100%;
    text-align: center;
    display: block;
  }
  .panel-img-right img{
    height: .5rem;
    width: .3rem;
    margin-bottom:  -.75rem;
  }
</style>
