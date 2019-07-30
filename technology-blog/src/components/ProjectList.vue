<template>
<v-layout wrap>
    <v-flex v-for="project in projects" xs6 style="margin-bottom: 65px;">
        <ProjectCard :project="project"></ProjectCard>
    </v-flex>
</v-layout>
</template>

<script>
import ProjectCard from "./ProjectCard"

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
    created() {
        this.$http.get('http://192.168.31.61:3000/myproject')
            .then((res) => {
                console.log(res.data)
                this.projects = res.data
                console.log(this.projects)
            })
    },
}
</script>
