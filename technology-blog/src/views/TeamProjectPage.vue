<template>
<div style="background-color: white;">
    <v-btn @click="move" outline color="indigo" round>Project 추가</v-btn>
    <div class="container project">
    <!-- <v-btn class="v-btn theme--dark">프로젝트 작성(아직 비연결상태)</v-btn> -->
    <!-- <ProjectList></ProjectList> -->
        <v-layout wrap>
            <v-flex v-for="project in projects" xs6 style="margin-bottom: 65px;">
                <TeamProjectCard :project="project"></TeamProjectCard>
            </v-flex>
        </v-layout>
    </div>
</div>
</template>


 <script>
import TeamProjectCard from '@/components/TeamProjectCard'

export default {
    name: 'TeamProjectPage',
    components: {
        TeamProjectCard
    },
    data() {
        return {
            projects: [],
        }
    },
    created(){
        console.log(this.$route.params.id)
        var data = {
            id : this.$route.params.id
        }
        this.$http.post('http://192.168.31.63:3000/teamProject', data)
        .then((response) => {
            console.log(response.data)
            this.projects = response.data
            console.log(this.projects)
        })
    },
    mounted(){

    },
    methods: {
        move(){
            this.$router.push({ name: "TeamProjectWritePage", params: {id: this.$route.params.id} })
        }
    },

 }
 </script>

 <style>
   .container.project {
    background-color: white;
    width: 75%;
    margin: 0 auto;
  }
 </style>
