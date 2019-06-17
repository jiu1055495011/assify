<template>
    <div class="ftPlayer">
<!--      <router-link to="/bPlay" class="play-inof" @click="musicup">-->
        <a href="javascript:" class="play-inof" @click="musicup">
          <div class="play-left">
            <img :src="$store.state.songName.img" alt="">
          </div>
          <div class="play-centent">
            <p class="playSong">{{this.$store.state.songName.songName}}</p>
            <p class="playName">{{this.$store.state.songName.choricSinger}}</p>
          </div>
        </a>
<!--      </router-link>-->
      <div class="play-right">
        <div class="bofang">
          <!-- 暂停/开始播放  -->
          <i class="play_f" @click="CCC" :class="{play_z: !$store.state.hh }"></i>
        </div>
        <i class="play_n"></i>
        <i class="play_x"></i>
      </div>
    </div>
</template>

<script>
    export default {
        name: "player",
      data(){
          return{
            show:true,
        }
      },
      methods:{
        CCC () {
          this.$store.state.hh = !this.$store.state.hh
          var x = document.getElementById('myAudio')
          this.sg = !this.sg; // 点击暂停或者播放 切换图片
          if (!this.$store.state.hh) {
            x.pause()
            // console.log(this.$store.state.hh)
          } else {
            x.play()
          }
        },
        musicup () {
          // alert()
          this.$emit('updateMusicOff', true);
          this.$store.state.qs = true
        }
      }
    }
</script>

<style scoped>
  .play-inof{
    width: 60%;
    display: block;
  }
  .play-left{
    height: 1.8rem;
    width: 1.8rem;
    margin: .1rem .2rem .1rem .1rem;
    display: inline-block;
    vertical-align: middle;
  }
  .play-left img{
    height:100%;
    width:100%;
    border-radius: 5px;
  }
  .play-centent{
    width: 65%;
    display: inline-block;
    vertical-align: middle;
  }
  .playSong{
    width: 100%;
    line-height: 1.2;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: .4rem;
    color: #fff;
  }
  .playName{
    line-height: 1.3;
    font-size: .32rem;
    color: #888;
  }
  .play-right{
    height: 1rem;
    width: 3.5rem;
    position: absolute;
    top: .55rem;
    right: .4rem;
  }
  .play-right i{
    height: .9rem;
    width: .9rem;
    margin-left: .3rem;
    display: inline-block;
    background-size: 100%;
  }
  .play_f{
    background: url(http://m.kugou.com/v3/static/images/index/pause_icon.png) no-repeat;
  }
  .play_z{
    background: url(http://m.kugou.com/v3/static/images/index/play_icon.png) no-repeat;
  }
  .play_n{
    background: url(http://m.kugou.com/v3/static/images/index/next_icon.png) no-repeat;
  }
  .play_x{
    background: url(http://m.kugou.com/v3/static/images/index/download_icon.png) no-repeat;
  }

  .bofang{
    height: 1rem;
    width: 1rem;
    float: left;
    overflow: hidden;
  }
  .nextSong{
    display: none;
  }
</style>
