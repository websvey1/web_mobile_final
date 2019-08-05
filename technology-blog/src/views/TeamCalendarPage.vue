<template>
  <div>
    <div id="app">
      <div class="main2">
        <div class="calendar-holder">
          <calendar :events="events" />
        </div>

        <div class="form-holder">
          <h3>Schedule an event</h3>
          <team-event-form />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Calendar from '@/components/Calendar.vue'
import TeamEventForm from '@/components/TeamEventForm.vue'
import {mapState} from 'vuex';

export default {
  name: 'TeamCalendarPage',
  components: {
    Calendar,
    TeamEventForm
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
    this.$http.post('http://192.168.31.63:3000/plan/getTeamPlan', data)
      .then((response) => {
        var items = response.body;

        for(var i = 0; i < items.length; i++){
          this.events.push({title: items[i].cal_title, start: items[i].cal_start,
                  end: items[i].cal_end, cssClass: items[i].cal_color, description: items[i].cal_description});
        }
      })
      .catch((error) =>{
        console.log(error)
      })
  },
  computed:
    mapState(['plan'])
  ,
  watch: {
    plan(to, from){
      this.events.push(this.$store.state.plan);
    }
  },
  methods:{
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  background-color: rgb(255, 255, 255);
}
.main2 {
  padding: 0 5% 10% 10%;
  display: flex;
  align-items: center;
}

.calendar-holder {
  width: 65%;
  padding-top: 3%;
}

.form-holder {
  padding-left: 5%;
  width: 35%;
}
.form-holder > h3 {
  color: rgb(155, 20, 255);
  text-transform: uppercase;
  font-size: 16px;
  text-align: left;
}
</style>
