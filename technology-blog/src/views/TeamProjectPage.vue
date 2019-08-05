<template>
<div style="background-color: white; padding-bottom:50px;">
    <v-btn class="ma-2" color="orange darken-2" dark>
          <v-icon dark left>arrow_back</v-icon>Back
    </v-btn>
    <v-btn @click="move" outline color="indigo" round>Project 추가</v-btn>
    <span class="mdi mdi-home"></span>
    <div class="container project">
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
    },
    mounted(){
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
