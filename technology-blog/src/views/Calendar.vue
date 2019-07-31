<template>
  <v-layout>
    <v-flex>
      <div style="height: 50px">
        <v-layout row justify-center>
          <h1 style="text-align: center; margin-top: 5px;">{{ month }} 월</h1>
          <v-dialog v-model="dialog" persistent max-width="800px">
            <template v-slot:activator="{ on }">

              <v-btn fab dark small color="indigo" v-on="on" style="position: absolute; right: 0;">
                <v-icon dark>add</v-icon>
              </v-btn>
            </template>

            <v-card>
              <v-card-title primary-title class="headline justify-center">Add a Schedule</v-card-title>
              <!--
              <v-layout row wrap>
                <v-flex justify-content-center style="margin-left: 9%">
                  <v-date-picker v-model="picker" color="green lighten-1"></v-date-picker>
                </v-flex>
                <v-flex class="hidden-xs-only">
                  <v-date-picker v-model="picker2" color="green lighten-1" header-color="primary"></v-date-picker>
                </v-flex>
              </v-layout>
              -->
              <v-layout row wrap justify-center>
                <v-flex xs12 sm6 md4>
                  <v-dialog ref="dialog" v-model="startModal" :return-value.sync="startDate" persistent lazy full-width width="290px">
                    <template v-slot:activator="{ on }">
                      <v-text-field v-model="startDate" label="Start day" prepend-icon="event" readonly v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="startDate" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="startModal = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="$refs.dialog.save(startDate)">OK</v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-flex>
                &nbsp;&nbsp;
                <v-flex xs12 sm6 md4>
                  <v-dialog ref="dialog2" v-model="endModal" :return-value.sync="endDate" persistent lazy full-width width="290px">
                    <template v-slot:activator="{ on }">
                      <v-text-field v-model="endDate" label="End day" prepend-icon="event" readonly v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="endDate" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="endModal = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="$refs.dialog2.save(endDate)">OK</v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-flex>
              </v-layout>

              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field label="Title*" :rules="titleRule" v-model="_title" required></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field label="Details*" :rules="detailRule" v-model="_details" required></v-text-field>
                    <!--
                    <v-textarea label="Details*" counter v-model="_details" maxlength="400" full-width single-line required></v-textarea>
                    -->
                  </v-flex>
                </v-layout>
              </v-container>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" flat @click="dialog = false">Cancel</v-btn>
                <v-btn color="blue darken-1" flat @click="submit">Submit</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-layout>
      </div>
      <v-sheet height="500">

        <v-calendar :now="today" :value="today" color="primary">
          <template v-slot:day="{ date }">
            <!-- below is the part of event days-->
            <template v-for="event in eventsMap[date]">
              <v-menu :key="event.title" v-model="event.open" full-width offset-x>
                <template v-slot:activator="{ on }">
                  <!-- this div is about the event -->
                  <div v-if="!event.time" v-ripple class="my-event" v-on="on" v-html="event.title"></div>
                </template>

                <v-card color="grey lighten-4" min-width="350px" flat>
                  <v-toolbar color="primary" dark>
                    <v-btn icon>
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <v-toolbar-title v-html="event.title"></v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon>
                      <v-icon>favorite</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon>more_vert</v-icon>
                    </v-btn>
                  </v-toolbar>
                  <v-card-title primary-title>
                    <span v-html="event.details"></span>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn flat color="secondary">
                      Cancel
                    </v-btn>
                  </v-card-actions>
                </v-card>

              </v-menu>
            </template>

          </template>
        </v-calendar>
      </v-sheet>

    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data() {
      return {
        today: '',
        month: '',
        _title: '',
        _details: '',
        startDate: new Date().toISOString().substr(0, 10),
        endDate: new Date().toISOString().substr(0, 10),
        startModal: false,
        endModal: false,
        // picker: new Date().toISOString().substr(0, 10),
        // picker2: new Date().toISOString().substr(0, 10),
        dialog: false,
        titleRule: [
          v => !!v || 'Title is required'
        ],
        detailRule: [
          v => !!v || 'Details are required'
        ],
        events: [
          {
            title: 'Vacation',
            details: 'Going to the beach!',
            date: '2019-07-30',
            open: false
          },
          {
            title: 'Vacation',
            details: 'Going to the mountain!',
            date: '2019-07-31',
            open: false
          },
          {
            title: 'Vacation',
            details: 'Going to the Seoul!',
            date: '2019-07-21',
            open: false
          },
          {
            title: 'Meeting',
            details: 'Spending time on how we do not have enough time',
            date: '2019-08-02',
            open: false
          },
          {
            title: 'Myung`s Birthday',
            details: 'Celebrate responsibly',
            date: '2019-07-28',
            open: false
          },
          {
            title: 'Chocolate day',
            details: 'Eat chocolate until you pass out',
            date: '2019-07-15',
            open: false
          },
          {
            title: 'Conference',
            details: 'Mute myself the whole time and wonder why I am on this call',
            date: '2019-07-21',
            open: false
          },
          {
            title: 'Hackathon',
            details: 'Code like there is no tommorrow',
            date: '2019-07-20',
            open: false
          }
        ]
      }
    },
    computed: {
      // convert the list of events into a map of lists keyed by date
      eventsMap () {
        const map = {}
        this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e))
        return map
      }
    },
    methods: {
      open (event) {
        alert(event.title)
      },
      submit(){
        if(this.$refs.dialog.returnValue > this.$refs.dialog2.returnValue){
          alert("Start date should be earlier than End date.")
        }else if(this._title == null || this._details == null){
          alert("Please fill both title and details :)")
        }else{
          this.dialog = false;

          if(this.$refs.dialog.returnValue == this.$refs.dialog2.returnValue){
            this.events.push({title: this._title, details: this._details, date: this.$refs.dialog.returnValue, open: false})
          }else{
            var startSplit = this.$refs.dialog.returnValue.split('-')
            let startYear = startSplit[0];
            let startMonth = startSplit[1];
            let startDay = startSplit[2];
            let endSplit = this.$refs.dialog2.returnValue.split('-')
            let endYear = endSplit[0];
            let endMonth = endSplit[1];
            let endDay = endSplit[2];

            // for문에 넣어서 해보자
            for(var year = startYear; year <= endYear; year++){
              if(year === startYear){ // 시작 년도인데,
                if(year === endYear){ // 시작 년도와 끝 년도가 같으면, ex) 2019.7.12 ~ 2019.7.28
                  if(startMonth === endMonth){
                    for(var day = startDay; day <= endDay; day++){
                      const tempDate = year + "-" + startMonth + "-" + day
                      this.events.push({title: this._title, details: this._details, date: tempDate, open: false})
                    }
                  }else{
                    for(var month = startMonth; month <= endMonth; month++){
                      if(month === startMonth){
                        if(month === 4 || month === 6 || month === 9 || month === 11){
                          for(var day = startDay; day <= 30; day++){
                            const tempDate = year + "-" + month + "-" + day
                            this.events.push({title: this._title, details: this._details, date: tempDate, open: false})
                          }
                        }else if(month === 2){
                          for(var day = startDay; day <= 28; day++){
                            const tempDate = year + "-" + month + "-" + day
                            this.events.push({title: this._title, details: this._details, date: tempDate, open: false})
                          }
                        }else{
                          for(var day = startDay; day <= 31; day++){
                            const tempDate = year + "-" + month + "-" + day
                            this.events.push({title: this._title, details: this._details, date: tempDate, open: false})
                          }
                        }
                      }else if(month === endMonth){
                        for(var day = 0; day <= endDay; day++){
                          const tempDate = year + "-" + month + "-" + day
                          this.events.push({title: this._title, details: this._details, date: tempDate, open: false})
                        }
                      }else{
                        if(month === 4 || month === 6 || month === 9 || month === 11){
                          for(var day = 1; day <= 30; day++){
                            const tempDate = year + "-" + month + "-" + day
                            this.events.push({title: this._title, details: this._details, date: tempDate, open: false})
                          }
                        }else if(month === 2){
                          for(var day = 1; day <= 28; day++){
                            const tempDate = year + "-" + month + "-" + day
                            this.events.push({title: this._title, details: this._details, date: tempDate, open: false})
                          }
                        }else{
                          for(var day = 1; day <= 31; day++){
                            const tempDate = year + "-" + month + "-" + day
                            this.events.push({title: this._title, details: this._details, date: tempDate, open: false})
                          }
                        }
                      }
                    }
                  }
                }else{ // 시작 년도인데, 시작 년도와 끝 년도가 다르면
                  for(var month = startMonth; month <= 12; month++){
                    if(month === 4 || month === 6 || month === 9 || month === 11){
                      for(var day = 1; day <= 30; day++){
                        const tempDate = year + "-" + month + "-" + day
                        this.events.push({title: this._title, details: this._details, date: tempDate, open: false})
                      }
                    }else if(month === 2){
                      for(var day = 1; day <= 28; day++){
                        const tempDate = year + "-" + month + "-" + day
                        this.events.push({title: this._title, details: this._details, date: tempDate, open: false})
                      }
                    }else{
                      for(var day = 1; day <= 31; day++){
                        const tempDate = year + "-" + month + "-" + day
                        this.events.push({title: this._title, details: this._details, date: tempDate, open: false})
                      }
                    }
                  }
                }
              }else if(year === endYear){ // 시작 년도가 아니고, 끝 년도이면
                for(var month = 1; month <= endMonth; month++){
                  if(month === 4 || month === 6 || month === 9 || month === 11){
                    for(var day = 1; day <= 30; day++){
                      const tempDate = year + "-" + month + "-" + day
                      this.events.push({title: this._title, details: this._details, date: tempDate, open: false})
                    }
                  }else if(month === 2){
                    for(var day = 1; day <= 28; day++){
                      const tempDate = year + "-" + month + "-" + day
                      this.events.push({title: this._title, details: this._details, date: tempDate, open: false})
                    }
                  }else{
                    for(var day = 1; day <= 31; day++){
                      const tempDate = year + "-" + month + "-" + day
                      this.events.push({title: this._title, details: this._details, date: tempDate, open: false})
                    }
                  }
                }
              }else{ // 시작 년도도 아니고, 끝 년도도 아닌, 1년이 통으로 다 추가되어야 하는 상황
                for(var month = 1; month <= 12; month++){
                  if(month === 4 || month === 6 || month === 9 || month === 11){
                    for(var day = 1; day <= 30; day++){
                      const tempDate = year + "-" + month + "-" + day
                      this.events.push({title: this._title, details: this._details, date: tempDate, open: false})
                    }
                  }else if(month === 2){
                    for(var day = 1; day <= 28; day++){
                      const tempDate = year + "-" + month + "-" + day
                      this.events.push({title: this._title, details: this._details, date: tempDate, open: false})
                    }
                  }else{
                    for(var day = 1; day <= 31; day++){
                      const tempDate = year + "-" + month + "-" + day
                      this.events.push({title: this._title, details: this._details, date: tempDate, open: false})
                    }
                  }
                }
              }
            }
          }
        }

        console.log(this.$refs.dialog.returnValue)
        console.log(this.$refs.dialog2.returnValue)
      }
    },
    mounted(){
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1; //January is 0!
      var yyyy = today.getFullYear();

      if(dd < 10) {
        dd = '0' + dd
      }

      if(mm < 10) {
        mm = '0' + mm
      }

      this.today = mm + '/' + dd + '/' + yyyy;
      this.month = mm;
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

<style lang="stylus" scoped>
  .my-event {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    background-color: #1867c0;
    color: #ffffff;
    border: 1px solid #1867c0;
    width: 100%;
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
  }
</style>
