<template>
  <div>
    <Header/>
    <v-app>
      <v-content>
        <router-view/>
      </v-content>
    </v-app>

    <!--
    <div id="app">
      <div class="main">
        <div class="calendar-holder">
          <calendar :events="events" />
        </div>

        <div class="form-holder">
          <h3>Schedule an event</h3>
          <event-form />
        </div>
      </div>
    </div>
    -->
    <Footer/>
  </div>
</template>

<script>
import Header from './components/common/Header'
import Footer from './components/common/Footer'

import Calendar from './components/Calendar.vue'
import EventForm from './components/EventForm.vue'
import Pusher from 'pusher-js';
import {mapState} from 'vuex';

export default {
  name: 'App',
  components: {
    Footer,
    Header,
    Calendar,
    EventForm
  },
  data () {
    return {
      //
      // events: [
      //   {
      //     title     :  'event1',
      //     start     : '2019-07-09',
      //     cssClass  : 'blue',
      //     YOUR_DATA : {}
      //   },
      //   {
      //     title     : 'event2',
      //     start     : '2019-07-10',
      //     end       : '2019-07-13',
      //     cssClass  : ['orange']
      //   }
      // ]
      events: [{
        title     : 'event2',
        start     : '2019-07-10',
        end       : '2019-07-13',
        cssClass  : ['orange']
      }]
      // events: []
    }
  },

  created(){

  },
  methods:{

  },
  mounted(){
    this.$http.post('http://192.168.31.63:3000/getPlan')
      .then((response) => {
        var items = response.body;
        // console.log(items)
        for(var i = 0; i < items.length; i++){
          this.events.push({title: items[i].cal_title, start: items[i].cal_start,
                  end: items[i].cal_end, cssClass: items[i].cal_color, description: items[i].cal_description});
        }
      })
      .catch((error) =>{
        // console.log(error)
      })
  },
  computed:
    mapState(['plan'])
  ,
  watch: {
    plan(to,from){
      this.events.push(this.$store.state.plan);
    }
  },

}
</script>

<style>
/*   #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .main {
    display: flex;
    align-items: center;
  }
  .calendar-holder {
    width: 65%;
  }
  .form-holder {
    width: 35%;
  }
  .form-holder > h3 {
    color: orangered;
    text-transform: uppercase;
    font-size: 16px;
    text-align: left;
    margin-left: 30px;
   margin-bottom: 10px;
  } */
</style>
