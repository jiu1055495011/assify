<template>
  <div class="hello">
    <div class="img_t" :style="{backgroundImage:'url(' + bannerPic + ')'}">

      <div class="top-goback">
        <div class="goback">
          <router-link to="/rank">
            <img src="http://m.kugou.com/v3/static/images/index/goback_1.png" alt="">
          </router-link>
        </div>
<!--        酷狗飙升榜-->
        <p class="page-title">{{info.rankname}}</p>
      </div>
      <div id="date_w" ><p>上次更新时间：{{nowTime}}</p></div>
    </div>
      <!-- 歌{'cs':bs} -->
      <ul class="panel-songslist" :class="{'cb':this.$store.state.sq}">
        <li v-for="(item,index) in list" @click="fs(item)">
          <span class="panel-songs" >
           {{index+1}}
          </span>
        <div class="panel-songs-p">
         <p>{{ item.filename }}</p>
        </div>
        <div class="panel-songs-x">
          <img src="http://m.kugou.com/v3/static/images/index/download_icon_2.png" alt="">
        </div>
        </li>
      </ul>
    <div>

    </div>
  </div>
</template>

<script>
  import Lyric from 'lyric-parser'
  import axios from 'axios'
  export default {
    name: 'App',
    inject: ['up'],
    data() {
      return{
        list:[],
        info:[],
        imgurl:[],
        nowTime:'',
        bannerPic:''
      }
    },
    mounted(){
      /*获取当前的时间 */
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      var nowDate = year + "-" + month + "-" + day;
      this.nowTime = nowDate;
    },
    methods:{
      fs(data){
        axios(`/proxy/api/v1/song/get_song_info?cmd=playInfo&hash=${data.hash}&from=mkugou&apiver=2&mid=ee9f83192f862b5a97abd32e5db0858d&userid=0`).then(({data})=>{
          // console.log(data);
          let music = data.backup_url[0];
          this.$store.state.songName = data;
          this.$store.state.hh = true;
          this.$store.state.sq = true;
          console.log(this.$store.state.hh)
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
      axios(`/proxy/rank/info/${localStorage.getItem("temp")}?json=true`).then(({data})=>{
        this.list = data.songs.list;
        this.info = data.info;
        let picPath = data.info.banner7url.replace(/{size}/i, "400");
        this.bannerPic = picPath;
        // for(let i = 0;i<this.info.length;i++){
        //   this.list[i].imgurl = `http://imge.kugou.com/mcommonbanner/400`+ this.list[i].banner7url.split('{size}')[1]
        // }
      })
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello{
    height: 1.4rem;
  }
  .img_t{
    height:6rem;
    width:10rem;
    margin-top: 1.56rem;
    background-size: 100% auto;
    background-position:center;
    background-repeat:no-repeat;
    position: relative;
  }
  .top-goback {
    height: 1.4rem;
    width: 10rem;
    z-index:9;
    margin-top: 1.55rem ;
    background: -webkit-linear-gradient(top,rgba(0,0,0,.4),rgba(0,0,0,0));
    position: fixed;
    top: 0;
    left: 0;
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
    color:#ffffff;
    float: left;
    height: 1.4rem;
    width: 7.5rem;
    padding-left: .5rem;
    text-align: center;
    line-height: 1.4rem;
  }
  #date_w{
    width:10rem;
    height: 1.2rem;
    position: absolute;
    bottom: 0;
    left: 0;
    background: -webkit-linear-gradient(bottom,rgba(0,0,0,.5),rgba(0,0,0,0));
  }
  #date_w p{
    color: #ffffff;
    font-size: .4rem;
    position: absolute;
    top: 0;
    left: .6rem;
  }
  /*歌*/
  .panel-songslist{
    padding-left: .3rem;
  }
  .panel-songslist li{
    width:100%;
    height:2rem;
    position: relative;
    border-bottom: 1px solid #e5e5e5;
    display: table;
  }
  .panel-songs-p{
    padding-right: 1.3rem;
    padding-left: 1rem;
    display: table-cell;
    vertical-align: middle;
  }
  .panel-songs-p p{
    font-size: .48rem;
    display: table-cell;
    vertical-align: middle;

  }
  .panel-songs-x{
    position: absolute;
    top: 0;
    right:0;
    height: 2rem;
    width:1.2rem;
  }
  .panel-songs-x img{
    height: .5rem;
    width: .5rem;
    margin: .75rem 0rem 0 .3rem;
  }
  .panel-songs{
    height: 1rem;
    line-height: 1rem;
    position: absolute;
    top: 1.55rem;
    left: 0px;
    margin-top: -.8rem;
    text-align: center;
    font-size: .4rem;
    color: #999;
    display: inline-block;
  }
  .panel-songslist li span{
    color: #999;
    border-radius: 15px;
    height: .5rem;
    width: .7rem;
    line-height: .5rem;
    text-align: center;
    border-radius: 15px;
  }
  .panel-songslist li:nth-child(1) span{
    background: #e80000;
    color: #fff;
  }
  .panel-songslist li:nth-child(2) span{
    background: #ff7200;
    color: #fff;
  }
  .panel-songslist li:nth-child(3) span{
    background: #f8b300;
    color: #fff;
  }
  .cb{
    padding-bottom: 2rem;
  }
</style>
