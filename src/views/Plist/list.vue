<template>
  <div class="hello">
    <div class="topGoback">
      <div class="goback">
        <router-link to="/Plist">
        <img src="http://m.kugou.com/v3/static/images/index/goback_1.png" alt="">
        </router-link>
      </div>
      <p class="page-title">{{info.specialname}}</p>
    </div>

    <div>
      <!--  图片-->
      <div class="img-box">
        <img :src="Img" alt="">
      </div>
      <!--  简介    -->
      <div class="intro"  :class="{'dd':flag}">
        <p>
         {{info.intro}}
        </p>
        <div class="intro-icon-box" @click="img_Flag">
          <img v-if="flag"  src="http://m.kugou.com/v3/static/images/index/open_icon.png" alt="">
          <img v-else src="http://m.kugou.com/v3/static/images/index/close_icon.png" alt="">
        </div>
      </div>
    </div>

    <ul class="panel-songslist" >
      <li class="panel-songslist-item" v-for="item in list" @click="fs(item)">
        <div class="panel-songs-item-name">
          <p>{{item.filename}}</p>
        </div>
        <div class="panel-songs-item-download">
          <img src="http://m.kugou.com/v3/static/images/index/download_icon_2.png" alt="">
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  import Lyric from 'lyric-parser'
  import axios from 'axios'
  export default {
    name:'App',
    inject: ['up'],
    data(){
      return{
        info:[],
        list:[],
        Img:[],
        flag:false,
      }
    },
    methods:{
      img_Flag(){
        this.flag=!this.flag;
      },
      fs(data){
        axios(`/proxy/api/v1/song/get_song_info?cmd=playInfo&hash=${data.hash}&from=mkugou&apiver=2&mid=ee9f83192f862b5a97abd32e5db0858d&userid=0`).then(({data})=>{
          // console.log(data);
          let music = data.backup_url[0];
          this.$store.state.songName = data;
          this.$store.state.hh = true;
          this.$store.state.sq = true;
          //获取图片
          this.$store.state.songName.img = `http://singerimg.kugou.com/uploadpic/softhead/400`+ data.imgUrl.split('{size}')[1]
          let id = data.hash
          axios(`/proxy/app/i/krc.php?cmd=100&hash=${id}&timelength=1`).then(({data}) => {
            let gc = {};
            let lyric = new Lyric(data, gc);
            this.$store.state.lyric = lyric.lines;
          })
          this.up(true);
        })
      }
    },
    created() {
      axios(`/proxy/plist/list/${localStorage.getItem("temp")}?json=true`).then(({data})=>{
        // console.log(data);
        this.info = data.info.list;
        // console.log(this.info)
        let imgUrl = data.info.list.imgurl.replace(/{size}/i, "400");
        this.Img = imgUrl;
        this.list = data.list.list.info;
        // console.log(this.list)
      })
    }
  }
  // console.log(11);
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello{
    margin-top: 1.55rem;
  }
  .topGoback{
    width: 100%;
    height: 1.4rem;
    overflow: hidden;
    text-align: center;
    position: fixed;
    top: 1.55rem;
    left:0;
    background: -webkit-linear-gradient(top,rgba(0,0,0,.5),rgba(0,0,0,0));
    z-index: 20;
  }
  .goback{
    height: 1.4rem;
    width:1rem;
    float: left;
  }
  .goback img{
    height: .7rem;
    width: .4rem;
    margin-left: .3rem;
  }
  .page-title{
    font-size: .42rem;
    color: #fff;
    line-height: 1.4rem;
    width: 8rem;
    float: left;
  }
  .img-box{
    height: 6rem;
    width:100%;
    overflow: hidden;
  }
  .img-box img{
    width:100%;
    margin-top: -2rem;
  }
  .intro{
    width:100%;
    height: 1rem;
    line-height: .8rem;
    padding:.3rem 1.5rem .4rem .4rem;
    box-shadow: 0 0.15rem 0.15rem 0 #f4f4f4;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
  }
  .dd{
    height: auto;
  }
  .intro-icon-box{
    height: 1rem;
    width: 1rem;
    position: absolute;
    top: .1rem;
    right: 0;
  }
  .intro-icon-box img{
    height: .6rem;
    width: .6rem;
    margin: 20%
  }
  .intro p{
    font-size: .45rem;
  }
  .panel-songslist{
    padding-left: .5rem;
  }
  .panel-songslist-item{
    width: 100%;
    height: 2rem;
    border-bottom: 1px solid #e5e5e5;
    position: relative;
    display: table;
  }
  .panel-songs-item-name{
    width: 100%;
    padding-right: 2rem;
    display: table-cell;
    vertical-align: middle;
    padding-left: .2rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .panel-songs-item-name p{
    font-size: .48rem;
    cursor: pointer;
  }
  .panel-songs-item-download{
    position: absolute;
    top: 0;
    right: 0;
    width: 1.5rem;
    height: 100%;
    cursor: pointer;
    text-align: center;
  }
  .panel-songs-item-download img{
    width: .55rem;
    height: .55rem;
    margin-top: .7rem;
    display: inline-block;
  }
</style>
