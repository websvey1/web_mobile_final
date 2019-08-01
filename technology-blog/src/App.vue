<template>
  <div>
    <Header/>
    <v-app>
      <v-content>
        <router-view/>
      </v-content>
    </v-app>
    <Footer/>
  </div>
</template>

<script>
import Header from './components/common/Header'
import Footer from './components/common/Footer'

export default {
  name: 'App',
  components: {
    Footer,
    Header,
  },
  data () {
    return {

    }
  },
  created(){

  },
  methods:{

  },
  mounted(){

  }
}
</script>

<style>

</style>
