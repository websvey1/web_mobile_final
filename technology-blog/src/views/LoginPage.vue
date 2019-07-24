<template>
    <v-layout>
      <LoginForm/>
    </v-layout>
</template>

<script>
import Weather from '@/components/WeatherInfo'
import LoginForm from '@/components/LoginForm'
import LogService from '@/services/LogService'

export default {
	name: 'LoginPage',
  components:{
    LoginForm
  },
  data() {
    return {
      text: '',
      drawer: null,
      items: []
    }
  },
	methods: {

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
