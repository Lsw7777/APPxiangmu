import Vue from 'vue'
import Vuex from 'vuex'
import {
  getItem,
  setItem
} from '@/request/storage.js'

Vue.use(Vuex)

const USER_KEY = 'app-user'
// 这样做的目的可以避免访问和获取数据的名字不一致导致的问题，使用常量，写错就会报错未定义的变量
// 原来的'user'是字符串，写错也不会报错
export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY), // 当前登录用户的登录状态（token等数据）
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      // 为了防止页面刷新数据丢失，我们还需要把数据放到本地存储中，这里仅仅是为了持久化数据
      setItem(USER_KEY, state.user)
      // window.localStorage.setItem('user', JSON.stringify(state.user))
    },
  },
  actions: {},
  modules: {}
})