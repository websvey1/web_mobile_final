<template>
<div style="background-color: white;">
  <div class="container project">
        <v-btn class="v-btn theme--dark">프로젝트 작성(아직 비연결상태)</v-btn>
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
 