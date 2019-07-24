import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './views/HomePage.vue'
import ProjectWritePage from './views/ProjectWritePage.vue'
import PostWritePage from './views/PostWritePage.vue'
import PostUpdatePage from './views/PostUpdatePage.vue'
import PostReadPage from './views/PostReadPage.vue'
import LoginPage from './views/LoginPage.vue'
import SignupPage from './views/SignupPage.vue'
import UpdateUserPage from './views/UpdateUserPage.vue'
import RemoveUserPage from './views/RemoveUserPage.vue'
import GraphPage from './views/GraphPage.vue'
import PageTest from './views/PageTest.vue'
import TestPage from './views/TestPage.vue'
import PostPage from './views/PostPage.vue'
import Calendar from './views/Calendar.vue'
import ProjectPage from './views/ProjectPage.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
	  	{
      		path: '/',
      		name: 'HomePage',
      		component: HomePage,
		},
    	{
    		path: '/postupdate/:id',
    		name: 'PostUpdatePage',
    		component: PostUpdatePage,
    		props:true
  		},
    	{
			path: '/postread/:id',
			name: 'PostReadPage',
			component: PostReadPage,
      		props:true
		},
    	{
    		path: '/login',
			name: 'LoginPage',
			component: LoginPage
    	},
    	{
    		path: '/signup',
			name: 'SignupPage',
			component: SignupPage
    	},
    	{
    		path: '/graph',
			name: 'GraphPage',
			component: GraphPage
    	},
    	{
			path: '/post',
			name: 'PageTest',
			component: PageTest

		},

    {
    path: '/test',
    name: 'TestPage',
    component: TestPage

  },
		{
			path: '/calendar',
			name: 'Calendar',
			component: Calendar
		},
  		{
      		path: '/postwrite',
      		name: 'PostWritePage',
      		component: PostWritePage
    	},
    	{
      		path: '/postupdate/:id',
      		name: 'PostUpdatePage',
      		component: PostUpdatePage,
      		props: true
    	},
    	{
      		path: '/updateuser',
      		name: 'UpdateUserPage',
      		component: UpdateUserPage
    	},
    	{
      		path: '/removeuser',
      		name: 'RemoveUserPage',
      		component: RemoveUserPage
		},
		{
			path: '/projectwrite',
			name: 'ProjectWritePage',
			component: ProjectWritePage
		},
		{
			path: '/project',
			name: 'ProjectPage',
			component: ProjectPage
		}
  ]
})
