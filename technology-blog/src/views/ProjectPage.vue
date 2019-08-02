<template>
<div style="background-color: white;">
  <div class="container">
        <v-btn class="v-btn theme--dark" style="margin-bottom: 20px;" to="/myproject/create">프로젝트 작성</v-btn>
        <ProjectList></ProjectList>
  </div>
</div>
</template>


 <script>
import ProjectList from '@/components/ProjectList'
import ProjectCard from '@/components/ProjectCard'

export default {
    name: 'ProjectPage',
    components: {
        ProjectList,
        ProjectCard
    },
    data() {
        return {

        }
    },
    methods: {
    }

 }
 </script>
 
 <style scoped>
   .container {
    background-color: white;
    width: 75%;
    margin: 0 auto;
  }
 </style>
