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
    pjtNum:null,
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
	}
});
