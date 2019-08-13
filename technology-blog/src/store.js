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

<<<<<<< HEAD
    testIp:'http://192.168.31.85:3000'
=======
    testIp:'http://192.168.31.63:3000'
>>>>>>> 5258693dc4bfe5ab45fd4354c23f2637e56591d3
	}
});
