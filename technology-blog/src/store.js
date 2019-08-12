import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state:{
		counter: 0,

    posts: [],
    trans_posts: [],

    isTrans: false,
    isLogin: false,

    userInfo: null,
    pn:null,
    logInfo: {
      user: '',
      page: '',
      enterTime: '',
      exitTime: ''
    },

    plan: false,
    teamPlan: false,
    cal_id: '',
    teamNum: '',
    exist: false,

    userName:null, // header drawer에서 사용
    userId:null, // header drawer에서 사용
    
    testIp:'http://192.168.31.65:3000' // 전체에서 사용
	}


});
