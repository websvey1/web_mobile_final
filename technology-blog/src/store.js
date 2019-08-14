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

    calendarTeam:null,
<<<<<<< HEAD
    testIp:'http://192.168.31.65:3000'
=======
    testIp:'http://192.168.31.63:3000'
>>>>>>> c9dab1cd196ac5a6b926ab52bc655787b32a5ac8
	}
});
