 <template>
   <v-card
      class="mx-auto"
      max-width="475"
      flat
    >
      <v-img
        class="white--text"
        height="285px"
        :src="project.image"
        style="border: 1px solid rgba(0,0,0,.15); cursor:pointer; border-radius: 5px;"
        @click="goReadProject(project.pjt.project_num)"
      >
      </v-img>

      <v-card-title>
      <div class="posth1">{{ project.pjt.project_title }}</div>
      </v-card-title>

      <v-card-text>
      <span class="ptag">{{ project.pjt.project_goal }}</span><br>
      </v-card-text>

      <v-card-text>
      <span class="ptag">{{ project.pjt.project_tech }}</span><br>
      </v-card-text>

      <v-divider class="mx-0"></v-divider>

      <v-card-text>
        <v-chip style="float: right;"
          class="ma-2" color="green"
        >
          <b>{{ project.pjt.user_id }}</b>
        </v-chip>

        <v-chip v-if="project.pjt.project_status ==='계획'" style="float: right;"
          class="ma-2" color="rgb(255, 247, 135)"
        >
        <b>{{ project.pjt.project_status }}</b>
        </v-chip>

        <v-chip v-if="project.pjt.project_status ==='진행중'" style="float: right;"
          class="ma-2" color="rgb(166, 255, 143)"
        >
        <b>{{ project.pjt.project_status }}</b>
        </v-chip>

        <v-chip v-if="project.pjt.project_status ==='완료'" style="float: right;"
          class="ma-2" color="rgb(255, 180, 180)"
        >
        <b>{{ project.pjt.project_status }}</b>
        </v-chip>

        <v-chip style="float: right;"
          class="ma-2" color="#c9e2f7"
        >
          <b>{{ project.pjt.project_start_date }}~ {{ project.pjt.project_end_date }}</b>
        </v-chip>
      </v-card-text>
    </v-card>
 </template>

<script>
import router from '@/router'

export default {
    name: 'ProjectCard',
    data(){
      return{
        
      }
    },

    props: {
        project: {}
    },

    methods: {
      goReadProject(pjtNum) {
        console.log(pjtNum)
        router.push({name:"MyprojectRead", params:{id:pjtNum}})
      }
    },

  }
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Jura:300,400,500,600);

@import url(https://fonts.googleapis.com/css?family=Play);

@import url(https://fonts.googleapis.com/css?family=Open+Sans:400,300);

.posth1 {
  /* padding-top: 3px; */
  font-family: Open Sans;
  font-weight: bold;
  color: #222;
  font-size: 25px;
  margin: 0;
  text-transform: uppercase;
   /* 여러 줄 자르기 추가 스타일 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  line-height: 1.2;
  height:1.2em;
  text-align: left;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical ;
}

.ptag {
  padding-top: 3px;
  font-family: Open Sans;
  color: #333;
  line-height: 1.6;
  font-size: 16px;
  margin-top: 0;
  text-overflow: ellipsis;
  /* 여러 줄 자르기 추가 스타일 */
  white-space: normal;
  /* height: 4.5em; */
  text-align: left;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.v-card__text {
  padding: 0px !important;
  padding-bottom: -2px !important;
}

.v-card__title {
  padding: 0px !important;
  padding-top: 15px !important;
  padding-bottom: 5px !important;
}


</style>
