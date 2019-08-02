<template>
  <div>
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
  </div>
</template>

<script>
import Calendar from '@/components/Calendar.vue'
import EventForm from '@/components/EventForm.vue'
import {mapState} from 'vuex';

export default {
  name: 'CalendarPage',
  components: {
    Calendar,
    EventForm
  },
  data(){
    return {
      events: []
    }
  },
  mounted(){
    var data = {
        num : this.$session.get('userInfo').user_num
    }
    this.$http.post('http://192.168.31.63:3000/plan/getPlan', data)
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
    plan(to, from){
      this.events.push(this.$store.state.plan);
    }
  }
}
</script>

<style scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-align: center; */
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
  }
</style>