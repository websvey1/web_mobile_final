<template>
<v-layout wrap v-if="projects.length > 0 || teamprojects.length > 0">
    <!-- <v-flex xs12>
        <v-select v-model="status" :items="items" :label="status" solo></v-select>
    </v-flex> -->
    <v-layout wrap v-if="status == 'Project'">
        <v-flex v-for="project in projects" :key="project.pjt.project_num" px-3 xs6 style=" margin-bottom: 40px;">
            <ProjectCard :project="project"></ProjectCard>
        </v-flex>
    </v-layout>
    <v-layout wrap v-else-if="status == 'TeamProject'">
        <v-flex v-for="teampjt in teamprojects" :key="teampjt" px-3 xs6 style=" margin-bottom: 40px;">
            <TeamCard :teampjt="teampjt"></TeamCard>
        </v-flex>
    </v-layout>
</v-layout>
<v-layout v-else wrap>
  <v-flex xs12 px-2 mt-4 style="margin-bottom: 35px;">
    <h1 style="margin-top:50px;text-align:center;">PROJECT가 없습니다.</h1>
  </v-flex>
</v-layout>
</template>

<script>
import ProjectCard from "./ProjectCard"
import TeamCard from "./TeamCard"
import { async } from 'q';

export default {
    name: "ProjectList",
    components: {
        ProjectCard,
        TeamCard
    },
    data() {
        return {
            projects: [],
            teamprojects: [],
            items: ['Project', 'TeamProject'],
            status: 'Project'
        }
    },
    mounted() {
        this.onList();
        this.onTeamList();
    },
    methods: {
      selectProject(status){
        if(status == '0'){
          this.status = this.items[0];
        }
        else{
          this.status = this.items[1];
        }
      },
        async onList() {
            await this.$http.post(this.$store.state.testIp + '/myproject/getPjt')
            .then(async (res) => {
                for (var i=0; i < res.body.length; i++){
                    var temp = {
                        pjtNum: res.body[i].project_num,
                        userNum: res.body[i].project_user
                    }
                    console.log(temp)
                    await this.$http.post(this.$store.state.testIp + '/myproject/getProject', temp)
                    .then(async (res) => {
                        // console.log(res.body)
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

        async onTeamList() {
            await this.$http.post(this.$store.state.testIp + '/teamProject/teamproject')
            .then(async (res) => {
                console.log(res.body)
                if (res.body.length > 0) {
                    for (var i=0; i < res.body.length; i++) {
                        var data = {
                            pjtNum: res.body[i].project_num
                        }
                        await this.$http.post(this.$store.state.testIp + '/teamProject/projectimage', data)
                        .then(async (response) => {
                            var image = []
                            if (response.body.length > 0) {
                                image.push(response.body[0])
                            }
                            this.teamprojects.push({
                                pjt: res.body[i],
                                image: image
                            })
                        })
                    }
                    console.log(this.teamprojects)
                }
            })
        }
    },
}
</script>
