import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './views/HomePage.vue'
import ProjectWritePage from './views/ProjectWritePage.vue'

//// post ////
import PostPage from './views/post/PostPage.vue'
import PostCreatePage from './views/post/PostCreatePage.vue'
import PostUpdatePage from './views/post/PostUpdatePage.vue'
import PostReadPage from './views/post/PostReadPage.vue'
//// post ////

//// user ////
import UserCreatePage from './views/user/UserCreatePage.vue'
import UserUpdatePage from './views/user/UserUpdatePage.vue'
import UserDeletePage from './views/user/UserDeletePage.vue'
//// user ////

//// test ////
import PageTest from './views/test/PageTest.vue'
import TestPage from './views/test/TestPage.vue'
//// test ////

import Calendar from './views/Calendar.vue'
import ProjectPage from './views/ProjectPage.vue'
import ProjectReadPage from './views/ProjectReadPage.vue'
import TeamChoose from './views/TeamChoose.vue'
import AnotherUser from './views/AnotherUser.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'HomePage',
      component: HomePage,
    },
    {
      path: '/post/update/:id',
      name: 'PostUpdatePage',
      component: PostUpdatePage,
      props: true
    },
    {
      path: '/post/read/:id',
      name: 'PostReadPage',
      component: PostReadPage,
      props: true
    },
    ///////////////////// Personal Post /////////////////////
    {
      path: '/post',
      name: 'PostPage',
      component: PostPage
    },
    {
      path: '/post/create',
      name: 'PostCreatePage',
      component: PostCreatePage
    },
    ///////////////////// Personal Project /////////////////////
    {
      path: '/myproject',
      name: 'ProjectPage',
      component: ProjectPage
    },
    {
      path: '/myproject/create',
      name: 'ProjectWritePage',
      component: ProjectWritePage
    },
    {
      path: '/myproject/:id',
      name: 'ProjectReadPage',
      component: ProjectReadPage
    },
    ////////////////////////////////////////////////////////////

    /////////////////////////// Team ///////////////////////////
    {
      path: '/teamChoose',
      name: 'TeamChoose',
      component: TeamChoose
    },
    ////////////////////////////////////////////////////////////

    ///////////////////////// Calendar /////////////////////////
    {
      path: '/calendar',
      name: 'Calendar',
      component: Calendar
    },
    ////////////////////////////////////////////////////////////

    ///////////////////////// user /////////////////////////////
    {
      path: '/user/update',
      name: 'UserUpdatePage',
      component: UserUpdatePage
    },
    {
      path: '/user/delete',
      name: 'UserDeletePage',
      component: UserDeletePage
    },
    {
      path: '/user/create',
      name: 'UserCreatePage',
      component: UserCreatePage
    },
    ////////////////////////////////////////////////////////////
    {
      path: '/test',
      name: 'TestPage',
      component: TestPage
	},
	{
		path: '/another',
		name: 'AnotherUser',
		component: AnotherUser
	},

  ]
})
