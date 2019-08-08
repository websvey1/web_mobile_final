<template>
<v-layout wrap>
    <v-flex xs12>
    <v-select :items="items" label="project" solo></v-select>
    </v-flex>

    <v-flex v-for="project in projects" :key="project.pjt.project_num" xs6 style=" margin-bottom: 40px;">
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
            items: ['Project', 'TeamProject'],
        }
    },
    mounted() {
        this.onList();
    },
    methods: {
        async onList() {
            await this.$http.post('http://192.168.31.61:3000/myproject/getPjt')
            .then(async (res) => {
                for (var i=0; i < res.body.length; i++){
                    var temp = {
                        pjtNum: res.body[i].project_num,
                        userNum: res.body[i].project_user
                    }
                    console.log(temp)
                    await this.$http.post('http://192.168.31.61:3000/myproject/getProject', temp)
                    .then(async (res) => {
                        console.log(res.body)
                        this.projects.push({ 
                            pjt: res.body.project[0],
                            image: res.body.image
                        })
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                }
                console.log(this.projects)
            })
            .catch((error) => {
                console.log(error)
            })
        },
    },
}
</script>
