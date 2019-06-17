<template>
  <div class="hello">
    <div id="banner">
      <mt-swipe :auto="4000">
        <mt-swipe-item  v-for="(item,index) in list" :key="item.list">
            <li>
                <img :src="item.imgurl" class="BannerImg">
            </li>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <!--      新歌歌单-->
    <ul class="NewSong">
      <li v-for="(item,index) in songer" :key="index">
          <div @click="fs(item)"><p>{{item.filename}}</p></div>
          <span><img src="http://m.kugou.com/v3/static/images/index/download_icon_2.png" class="tt"></span>
      </li>
    </ul>
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
          list:[],  // list  拿banner里面的数据
          songer:[],  // songer  拿歌单里面的数据
        }
      },
    methods: {
      fs (data) {
        axios(`/proxy/api/v1/song/get_song_info?cmd=playInfo&hash=${data.hash}&from=mkugou&apiver=2&mid=ee9f83192f862b5a97abd32e5db0858d&userid=0`).then(({data})=>{
          // console.log(data)
          let music = data.backup_url[0];
          this.$store.state.songName = data
          // console.log(this.$store.state.songName.imgUrl)
          // console.log(this.$store.state.songname)
          // console.log(data.url)
          this.$store.state.songName.img = `http://singerimg.kugou.com/uploadpic/softhead/400`+ data.imgUrl.split('{size}')[1]
          // console.log(this.img)
          /*this.$store.state.hh  默认一开始点击为真  */
          this.$store.state.hh = true;
          let id = data.hash
          axios(`/proxy/app/i/krc.php?cmd=100&hash=${id}&timelength=1`).then(({data}) => {
            // console.log(data)
            let gc = {}
            // this.$store.state.gc = data;
            // console.log(this.$store.state.gc)
            let lyric = new Lyric(data, gc)
            this.$store.state.lyric = lyric.lines;
            // console.log(this.$store.state.lyric)
          })
        })
        this.up(true)
      },
    },
      created() {
      axios('/proxy/?json=true').then(({data})=>{
        this.list = data.banner
        this.songer = data.data
        // console.log(data.data)

      })
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello{
    margin-top: 3.1rem;
  }
  .mint-swipe{
    height:4.2rem;
  }
  #banner{
    width:10rem;
    overflow: hidden;

  }
  #banner >>> .mint-swipe-indicators{
    bottom:-6px;
  }
  #banner >>> .mint-swipe-indicator{
    height:12px;
    width:12px;
    background: rgba(255,255,255,.6);
    opacity: 1;
  }
  #banner >>> .is-active{
    background: rgba(255,255,255,1);
  }
  .box li{
    width:10rem;
    height:4.2rem;
    float: left;
    display: block;
  }
  .box li a{
    width:10rem;
    height:4.2rem;
    display: block;
  }
  .BannerImg{
    width:10rem;
    height:4.2rem;
  }
  .NewSong{
    width:9.5rem;
    height:100%;
    margin-left: .5rem;
    /*background: #42b983;*/
  }
  .NewSong li{
    width:9.5rem;
    height:2rem;
    border-bottom: 1px solid #e5e5e5;
    display: table;
  }
  .NewSong li div{
    height:2rem;
    padding-left: .15rem;
    display: table-cell;
    vertical-align: middle;
  }
  .NewSong li div p{
    height: 100%;
    width:8rem;
    font-size: .45rem;
    box-sizing: border-box;
    display: table-cell;
    vertical-align: middle;
  }
  /*下载标签*/
  .NewSong li span{
    float: right;
    height: 100%;
    width: 100%;
    display: block;
    padding-left: .5rem;
  }
  .tt{
    float: right;
    width: .5rem;
    height: .5rem;
    margin-top: .7rem;
    margin-right: .4rem;
  }


</style>
