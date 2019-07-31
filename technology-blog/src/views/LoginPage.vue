<template>
    <v-layout>
      <LoginForm/>
    </v-layout>
</template>

<script>
import Weather from '@/components/WeatherInfo'
import LoginForm from '@/components/LoginForm'

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

  },
  beforeRouteLeave(to, from, next){
    next();
  },
  destroyed(){
  }
}

</script>
