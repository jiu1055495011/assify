<template>
    <div class="hello">
      <!--   顶部   -->
      <div class="top-goback top-goback-bg">
        <div class="goback">
          <router-link to="/singer">
            <img src="http://m.kugou.com/v3/static/images/index/goback.png" alt="">
          </router-link>
        </div>
        <!--        酷狗飙升榜-->
        <p class="page-title">{{page}}</p>
      </div>
      <!--   歌单   -->
      <ul class="panel-img-list singer-img-list">
        <li v-for="item in singers" @click="cut_info(item)">
          <a href="#">
            <div class="panel-img-left">
              <img :src="item.imgurl" alt="">
            </div>
            <div class="panel-img-content">
              <p class="panel-img-content-first">
                {{item.singername}}
              </p>
            </div>
          </a>
        </li>
      </ul>
    </div>
</template>

<script>
    import  axios from 'axios'
    export default {
        name: "cut",
      data(){
          return{
            singers:[],
            page:[],
          }
      },
      methods:{
        cut_info(data){
          // console.log(data)
          localStorage.setItem("tempp",data.singerid)
          // console.log(localStorage.getItem("temp"))
          this.$router.push('cut_info')
        }
      },
      created() {
        axios(`/proxy/singer/list/${localStorage.getItem("temp")}?json=true`).then(({data})=>{
          // console.log(data)
          this.page = data.classname;
          // console.log(this.page)
          this.singers = data.singers.list.info;
          // console.log(data.singers.list.info);
          for(let i = 0;i<this.singers.length;i++){
            this.singers[i].imgurl = `http://singerimg.kugou.com/uploadpic/pass/softhead/400`+ this.singers[i].imgurl.split('{size}')[1]
            // console.log(this.singers[i].imgurl)
            this.img = this.singers[i].imgurl;
          }
        })
      }
    }
</script>

<style scoped>
  .hello{
    margin-top: 3rem;
  }
  .top-goback{
    height: 1.4rem;
    width: 10rem;
    z-index:9999;
    margin-top: 1.55rem ;
    position: fixed;
    top: 0;
    left: 0;
  }
  .top-goback-bg{
    box-shadow: 0 0.12rem 0.12rem 0 #f4f4f4;
    background: #ffffff;
  }
  .goback{
    height: 1.4rem;
    width: .5rem;
    float: left;
    padding-left: .3rem;
  }
  .goback img{
    height: .6rem;
    width: .35rem;
  }
  .page-title{
    font-size: .45rem;
    color:#333;
    float: left;
    height: 1.4rem;
    width: 7.5rem;
    padding-left: .5rem;
    text-align: center;
    line-height: 1.4rem;
  }
  .singer-img-list{
    padding-left: .4rem;
  }
  .panel-img-list li{
    border-bottom: 1px solid #e5e5e5;
    width: 100%;
  }
  .panel-img-list li a{
    display: block;
    position: relative;
    margin-left: .35rem;
    padding: .2rem 0 .3rem 0;
  }
  .panel-img-left{
    position: absolute;
    top: .35rem;
    left: -.4rem;
    width: 1.7rem;
    height: 1.7rem;
  }
  .panel-img-left img{
    height: 100%;
    width:100%;
  }
  .panel-img-content{
    display: block;
    font-size: .5rem;
    color: #333;
    min-height: 2rem;
    line-height: 2rem;
    padding-left: 1.8rem;
    padding-right: 2rem;
  }
</style>
