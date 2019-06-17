<template>
  <div id="app">
        <ul class="list">
          <router-link
            v-for="(item,index) in nav"
            :key="item.id || index"
            :to="item.path"
            :class="[(active === index) ? 'home' : '']"
            @click.native="current(index)"
            tag="li"
          >
            {{item.name}}
          </router-link>
        </ul>
  </div>
</template>
<style scoped>
  html{
    fonz-size:0.2rem
  }
  #app{
    background: #ffffff;
  }
  .list{
    height: 1.4rem;
    width: 10rem;
    padding-left: .5rem;
    box-shadow:0 .05rem .2rem .05rem #f4f4f4;
  }
  .list li {
    float: left;
    height: 1.4rem;
    width: 2.25rem;
    font-size: .5rem;
    text-align: center;
    line-height: 1.4rem;
    color: #000000;
    display: block;
  }
  /*.list li:hover{*/
  /*  border-bottom: .1rem solid #26a2ff;*/
  /*}*/
  .home{
    border-bottom: .1rem solid #26a2ff;
  }
</style>

<script>
  export default {
    name:'NavBer',
    data(){
      return{
        nav:[
          {
            id:1,
            name:'新歌',
            path:'/'
          },{
            id:2,
            name:'排行',
            path:'/rank'
          },
          {
            id:3,
            name:'歌单',
            path:'/plist'
          },
          {
            id:4,
            name:'歌手',
            path:'/singer'
          }
        ],
        active:0
      }
    },
    created() {
      const currentRoute =  this.$route.path
      const index = this.nav.findIndex(item =>item.path === currentRoute)
      this.active = index
    },
    methods:{
      current(index){
        // console.log(index)
        this.active = index;
      }
    }
  }
</script>
