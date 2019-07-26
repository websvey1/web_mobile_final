<template>
  <div>
    <HeaderTest v-if="$router.currentRoute.name != 'HomePage'"/>
    <v-app>
      <v-content>
        <router-view/>
      </v-content>
    </v-app>
    <Footer/>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
import FirebaseService from './services/FirebaseService'
import HeaderTest from './components/HeaderTest'

export default {
  name: 'App',
  components: {
    Footer,
    Header,
    HeaderTest
  },
  data () {
    return {
      //
    }
  },

  created(){

  },
  methods:{
    async readPosts(){
      await FirebaseService.readPosts();
    }
  },

  mounted(){
    this.readPosts()
  }

}
</script>

<style media="screen">

</style>
