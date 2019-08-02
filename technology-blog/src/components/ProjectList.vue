<template>
<v-layout wrap>
    <v-flex v-for="project in projects" xs6 style=" margin-bottom: 40px;">
        <ProjectCard :project="project"></ProjectCard>
    </v-flex>
</v-layout>
</template>

<script>
import ProjectCard from "./ProjectCard"
import { async } from 'q';

export default {
    name: "ProjectList",
    components: {
        ProjectCard,
    },
    data() {
        return {
            projects: [],
        }
    },
    mounted() {
        this.onList();
    },
    methods: {
        async onList() {
            console.log(this.$session.get('userInfo').user_num)
            var data = {
                userNum: this.$session.get('userInfo').user_num
            }
            await this.$http.post('http://192.168.31.61:3000/myproject/getPjt', data)
            .then(async (res) => {
                for (var i=0; i < res.body.length; i++){
                    var temp = {
                        pjtNum: res.body[i].project_num
                    }
                    console.log(temp)
                    await this.$http.post('http://192.168.31.61:3000/myproject/getProject', temp)
                    .then(async (res) => {
                        console.log(res)
                        this.projects.push({ 
                            pjt: res.body.project[0],
                            image: res.body.image
                        })
                        console.log(this.projects)
                        console.log(this.projects[0])
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                }
            })
            .catch((error) => {
                console.log(error)
            })
        },
    },
}
</script>
