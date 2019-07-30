<template>
<div style="background-color: white;">
  <div class="container project">
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
 