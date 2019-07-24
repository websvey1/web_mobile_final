<template>
<div style="background-color: white;">
  <div class="container">
    <div id="page">
      <v-layout wrap>
        <v-flex>
          <v-btn flat color="warning" @click="showCalendar()">Calendar</v-btn>
          <PostList></PostList>
        </v-flex>
      </v-layout>
    </div>
  </div>
</div>
</template>

<script>
import FirebaseService from '@/services/FirebaseService'
import PostList from '@/components/PostList'
import firebase from 'firebase'
import LogService from '@/services/LogService'

export default {
	name: 'PostTest',
  components:{
    PostList
  },
  data() {
    return {
      text: '',
      drawer: null,
      items: [
        { title: 'Home', icon: 'home' , link:'/'},
        { title: 'Portfolio', icon: 'widgets' ,link:'/portfolio'},
        { title: 'Post', icon: 'question_answer', link:'/post' },
        { title: 'LogIn', icon: 'people_outline', link:'/login' }
      ]
    }
  },
	methods: {
    async postText() {
			await FirebaseService.postText(this.text)
    },
    showCalendar(){
      window.open("Calendar", "_blank","width=1100,height=700,left=200,top=25");
    }
	},
  mounted(){

  },
  created(){
    if(this.$store.state.userInfo.email != null){
      LogService.CreatedTime(this);
    }
  },
  beforeRouteLeave(to, from, next){
    if(this.$store.state.logInfo.user != null){
      LogService.DestroyedTime(this);
    }
    next();
  },
  destroyed(){

  }
}

</script>
<style scoped>
  #page {
    background-color: white;
    width: 90%;
    margin: 0 auto;
  }
</style>
