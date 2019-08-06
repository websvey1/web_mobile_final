<template>
<div style="background-color: white;">
    <v-btn @click="move" outline color="indigo" round>Project 추가</v-btn>
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
import { async } from 'q';

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
        this.getProject()
    },
    methods: {
        move(){
            this.$router.push({ name: "TeamProjectWritePage", params: {id: this.$route.params.id} })
        },

        async getProject() {
            console.log(this.$route.params.id)
            var data = {
                id : this.$route.params.id
            }
            await this.$http.post('http://192.168.31.61:3000/teamProject', data)
            .then(async (response) => {
                console.log(response.body)
                for (var i=0; i < response.body.length; i++){
                    var temp = {
                        pjtNum: response.body[i].project_num
                    }
                await this.$http.post('http://192.168.31.61:3000/teamProject/getpjt', temp)
                .then(async (res) => {
                    this.projects.push({
                        pjt: res.body.project[0],
                        image: res.body.image
                    })
                    console.log(this.projects)
                })
                }
            })
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
