import Vue from 'vue'
import Router from 'vue-router'
import NewSong from '@/views/NewSong/NewSong'
import Rank from '@/views/Rank/rank'
import Plist from '@/views/Plist/Plist'
import Singer from '@/views/Singer/singer'
import Search from '@/views/Search/search'
import Navber from '@/components/Navber'
import SearchBer from '@/components/searchBer'
import Info from '@/views/Rank/info'
import List from '@/views/Plist/list'
import cut from '@/views/Singer/cut'
import Cut_info from '@/views/Singer/cut_info'
import bPlay from '@/views/player/bPlay'
Vue.use(Router)

export default new Router({
  /*mode 是模式 把Hash  哈希 改为  history   */
  // mode:'history',
  routes: [
    {
      path: '/',
      name: 'NewSong',
      components:{
        nav:Navber ,
        default:NewSong,
      }
    },
    {
      path: '/rank',
      name: 'Rank',
      components:{
        nav:Navber ,
        default:Rank,
      }
    },
    {
      path: '/plist',
      name: 'Plist',
      components:{
        nav:Navber ,
        default:Plist
      }
    },
    {
      path: '/singer',
      name: 'Singer',
      components:{
        nav:Navber ,
        default:Singer,
      }
    },
    {
      path: '/search',
      name: 'Search',
      components: {
        nav: SearchBer,
        default: Search,
      }
    },
    {
      path: '/info',
      name: 'Info',
      component:Info
    },
    {
      path: '/list',
      name: 'List',
      component:List
    },
    {
      path: '/cut',
      name: 'cut',
      component:cut
    },
    {
      path: '/cut_info',
      name: 'Cut_info',
      component:Cut_info
    }
  ]
})
