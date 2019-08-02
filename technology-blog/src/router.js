import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './views/HomePage.vue'

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

//// myproject ////
import ProjectPage from './views/ProjectPage.vue'
import TeamProjectPage from './views/TeamProjectPage.vue'

import ProjectWritePage from './views/ProjectWritePage.vue'
import TeamProjectWritePage from './views/TeamProjectWritePage.vue'

import ProjectReadPage from './views/ProjectReadPage.vue'
import ProjectUpdatePage from './views/ProjectUpdatePage.vue'
//// myproject ////

import CalendarPage from './views/CalendarPage.vue'
import TeamCalendarPage from './views/TeamCalendarPage.vue'
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
    {
      path: '/myproject/update/:id',
      name: 'ProjectUpdatePage',
      component: ProjectUpdatePage
    },
    ////////////////////////////////////////////////////////////

    /////////////////////////// Team ///////////////////////////
    {
      path: '/teamChoose',
      name: 'TeamChoose',
      component: TeamChoose
    },
    ////////////////////////////////////////////////////////////

    /////////////////////// Team Project ///////////////////////
    {
      path: '/teamProject/:id',
      name: 'TeamProjectPage',
      component: TeamProjectPage
    },
    {
      path: '/teamProject/write',
      name: 'TeamProjectWritePage',
      component: TeamProjectWritePage
    },
    ////////////////////////////////////////////////////////////

    ///////////////////////// Calendar /////////////////////////
    {
      path: '/calendar',
      name: 'CalendarPage',
      component: CalendarPage
    },
    {
      path: '/teamCalendar',
      name: 'TeamCalendarPage',
      component: TeamCalendarPage

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
