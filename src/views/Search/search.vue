<template>
  <div class="hello">
    <div class="topGoback" v-show="!this.$store.state.qs">
      <div class="goback">
<!--        <router-link to="/cut">-->
          <img src="http://m.kugou.com/v3/static/images/index/goback.png" alt="" @click="ss">
<!--        </router-link>-->
      </div>
      <p class="page-title">搜索</p>
    </div>

    <div class="search-box">
      <div class="search-form-box">
          <span class="search-icon">
            <img src="http://m.kugou.com/v3/static/images/index/search_icon.png" alt="">
          </span>
          <input type="text" placeholder="歌手/歌名/拼音" class="search-keyword" v-model="find" @keyup.13="cli">
          <input type="submit" value="搜索" class="search-btn" @click="cli">
      </div>
    </div>

    <div class="hot-search" v-show="total == 0">
      <div class="hot-search-hd">最近热门</div>
      <ul class="hot-search-list">
        <li>
          <a href="" class="hot-keyword js-hot-keyword">独家首发</a>
        </li>
        <li>
          <a href="" class="hot-keyword js-hot-keyword">影视原声</a>
        </li>
        <li>
          <a href="" class="hot-keyword js-hot-keyword">情感电台</a>
        </li>
        <li>
          <a href="" class="hot-keyword js-hot-keyword">儿歌大全</a>
        </li>
        <li>
          <a href="" class="hot-keyword js-hot-keyword">这就是原创</a>
        </li>
        <li>
          <a href="" class="hot-keyword js-hot-keyword">音乐食堂</a>
        </li>
        <li>
          <a href="" class="hot-keyword js-hot-keyword">古风好歌</a>
        </li>
        <li>
          <a href="" class="hot-keyword js-hot-keyword">动漫</a>
        </li>
        <li>
          <a href="" class="hot-keyword js-hot-keyword">洗脑电音</a>
        </li>
      </ul>
    </div>
    <div class="search-result" v-show="!total == 0">
      <div class="search-result-hd">共有{{total}}条结果</div>
      <ul class="panel-songslist">
        <li v-for="item,index in search" @click="fs(item)">
          <div class="panel-songs-p">
            <p>{{item.filename}}</p>
          </div>
          <div class="panel-songs-x">
            <img src="http://m.kugou.com/v3/static/images/index/download_icon_2.png" alt="">
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Lyric from 'lyric-parser'
  import axios from 'axios'
  export default {
    name: 'HelloWorld',
    inject: ['up'],
    data () {
      return {
        flog:true,
        find: '',
        search:[],
        total:'',
      }
    },
    methods: {
      ss () {
        this.$router.go(-1)
      },
      cli () {
        if(!this.find.length){
          alert('请输入搜索内容')
        }else {
          axios(`/search/api/v3/search/song?format=json&keyword=${this.find}&page=1&pagesize=30&showtype=1`).then(({data}) => {
            // console.log(data)
            // console.log(data.data.info)
            this.search = data.data.info;
            this.total = data.data.total;
            // console.log(this.search);
          });
        }
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
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  margin-top: 3rem;
}
.topGoback{
  width: 100%;
  height: 1.4rem;
  overflow: hidden;
  text-align: center;
  position: fixed;
  top: 1.55rem;
  left:0;
  background: #ffffff;
  box-shadow: 0 0.15rem 0.15rem 0 #f4f4f4;
  z-index: 99999;
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
  font-size: .48rem;
  color: #333;
  line-height: 1.4rem;
  width: 8rem;
  float: left;
}
  .search-box{
    padding: .3rem;
    background: #fbfbfb;
  }
  .search-form-box{
    font-size:0;
    position: relative;
  }
  .search-form{
    position: relative;
    font-size: 0;
  }
  .search-icon{
    height: .9rem;
    width: .6rem;
    display: block;
    position: absolute;
    top: .04rem;
    left: .15rem;
    overflow: hidden;
  }
  .search-icon img{
    height: .95rem;
    width: .6rem;
    padding-top: .05rem;
  }
  .search-keyword{
    width: 70%;
    padding: .2rem 0 .2rem .9rem;
    margin-right: 3%;
    display: inline-block;
    vertical-align: middle;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    font-size: .48rem;
    outline: none;
  }
  .search-btn{
    width: 16%;
    height: 1rem;
    line-height: 1rem;
    border: none;
    border-radius: 5px;
    display: inline-block;
    vertical-align: middle;
    font-size: .48rem;
    text-align: center;
    color: #959595;
    background: #e5e5e5;
  }
  /*未搜索前*/
  .hot-search{
    /*display: none;*/
  }
  .hot-search-hd{
    height: 1.4rem;
    line-height: 1.4rem;
    padding-left: .42rem;
    border-bottom: 1px solid #ccc;
    font-size: .38rem;
    color: #2ca3f5;
  }
  .hot-search-list{
    margin-left: .38rem;
  }
  .hot-search-list a{
    height: 1.8rem;
    line-height: 1.8rem;
    border-bottom: 1px solid #e5e5e5;
    display: block;
    color: #333;
    font-size: .58rem;
    text-indent: .17rem;
    position: relative;
    font-weight: 500;
  }
  /*搜索后*/
  .search-result{
    /*display: block;*/
  }
  .search-result-hd{
    height: .7rem;
    line-height: .7rem;
    background: #e6e6e6;
    padding-left: .38rem;
    font-size: .38rem;
    color: #5d5d5d;
  }
  /* 歌*/
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
  padding-left: .2rem;
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
</style>
