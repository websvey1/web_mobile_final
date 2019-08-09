<template>
<div style="background-color: white; padding-bottom:50px;">
    <div style="padding:50px 17%;">
    <v-btn @click="goWrite" outline color="indigo" round style="float:right;">Project 추가</v-btn>
    </div>
    <span class="mdi mdi-home"></span>
    <div class="container project">
        <v-layout wrap>
            <v-flex v-for="project in projects" xs6 style="margin-bottom: 65px;">
                <MyprojectCard :project="project"></MyprojectCard>
            </v-flex>
        </v-layout>
    </div>
</div>
</template>


 <script>
import MyprojectCard from '@/components/MyprojectCard'
import { async } from 'q';

export default {
    name: 'MyprojectPage',
    components: {
        MyprojectCard
    },
    data() {
        return {
            projects: [], 
        }
    },
    mounted(){
        this.getProject()
    },
    methods: {
        async getProject() {
            var data = {
                userNum: this.$session.get('userInfo').user_num
            }
            await this.$http.post('http://192.168.31.61:3000/myproject/userproject', data)
            .then(async (response) => {
                for (var i=0; i < response.body.length; i++){
                    var temp = {
                        pjtNum: response.body[i].project_num
                    }
                    console.log(temp)
                    await this.$http.post('http://192.168.31.61:3000/myproject/getProject', temp)
                    .then(async (res) => {
                        console.log(res.body)
                        this.projects.push({
                            pjt: res.body.project[0],
                            image: res.body.image
                        })
                        console.log(this.projects)
                    })
                }
            })
        },

        goWrite() {
            this.$route.push('/myproject/create')
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
