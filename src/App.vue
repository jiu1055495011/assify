<template>
  <div id="app">
      <div id="point">
        <div class="header">
          <mt-header>
            <router-link to="/" slot="left" class="left">
              <img src="http://m.kugou.com/v3/static/images/index/logo.png" class="logo" />
            </router-link>
            <mt-button  slot="right">
              <router-link to="/search">
                <img src="http://m.kugou.com/v3/static/images/index/search.png" >
              </router-link>
            </mt-button>
          </mt-header>
        </div>

        <!--   把路径对应的组件，替换在这个位置 新歌排行。。。 -->
        <!--   显示播放页，隐藏导航栏     -->
        <router-view name="nav" v-show="!this.$store.state.qs" />
      </div>
      <div  class="post" :class="{'cs':bs}">
        <router-view/>
      </div>
      <!-- 点击判断是否出现播放器   -->
      <div class="player" v-show="bs" >
        <player></player>
      </div>
      <div class="musicBox" v-show="this.$store.state.qs">
        <bPlay @updateMusicOff="updateMusicOff"></bPlay>
      </div>

  </div>
</template>

<script>
import bPlay from './views/player/bPlay'
import player from './views/player/player'
import axios from 'axios'
  export default {
    name: 'App',
    components: {
      player,
      bPlay,
    },
    data() {
      return {
        bs: false,
      }
    },
    methods: {
        up(data) {
          this.bs = data
        },
        updateMusicOff (data) {
          this.musicOff = data;
          // console.log(this.musicOff)
        }

      },
    provide() {
      return {
        up: this.up,
        }
      },
      created(){
        // console.log('app')
        axios('/proxy/?json=true').then(({data}) => {
          // console.log(data)
        })
      }
  }
</script>

<style>
  *{
    padding:0px;
    margin:0px;
  }
  ul,li{
    list-style: none;
  }
  a{
    text-decoration: none;
  }
  html{
    font-size: .2rem;
  }
  .header{
    height: 1.55rem;
    width: 10rem;
  }
  .header .mint-header{
    height: 1.55rem;
    width: 10rem;
  }
  #point{
    position: fixed;
    top:0;
    left:0;
    z-index: 999;
  }
  .logo{
    height:.83rem;
    width: 3.5rem;
    padding-left: .1rem;
    margin-top: .1rem;
  }
  .mint-button{
    display: block;
    line-height: 1.35rem;
  }
  .mint-button-text img{
    height: .6rem;
    width: .6rem;
    margin-right: .1rem;
  }
  .player{
    height: 2rem;
    width: 100%;
    position: fixed;
    bottom:0;
    left:0;
    z-index: 2;
    background: rgba(0,0,0,.9);
    color: #fff;
    font-size: 0;
  }
  /*出现播放器，会添加class -> cs  */
  .cs{
    padding-bottom: 2rem;
  }
  /* 播放页 */
  .bfyPlay{
    visibility: visible;
    height: 736px;
    background: #2ca3f5;
  }
  .musicBox{
    position: fixed;
    height: 100%;
    width: 100%;
    background: black;
    top:0;
    z-index: 888;
  }
</style>
