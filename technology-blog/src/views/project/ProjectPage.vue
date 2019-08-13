<template>
<div style="background-color: white;">
  <div class="searchbar-total">
    <div class="searchbar-first">
      <v-select v-model="categoryForSearch" :items="categorysForSearch" item-text="text" :menu-props="{ top: true, offsetY: true }" label="Category" return-object></v-select>
    </div>
    <div class="searchbar-second">
      <v-text-field xs12 label="검색어를 입력해 주세요." v-model='textForSearch'></v-text-field>
    </div>
    <div class="searchbar-third">
      <v-btn class="v-btn theme--dark" @click="searchPosts">검색</v-btn>
      <v-btn class="v-btn theme--dark" @click="allPosts">전체글 보기</v-btn>
    </div>
  </div>

  <div class="container">
    <div class="" style="width:150px; display:inline-block; margin-right:10px;">
      <v-select v-model="categoryForPostlist" :items="categorysForPostlist" item-text="text" :menu-props="{ top: true, offsetY: true }" label="Category" return-object></v-select>
    </div>
    <h1 style="display:inline;">{{categoryForPostlist.text}}</h1>
    <v-divider style="padding-bottom:20px;"></v-divider>

    <ProjectList ref="project"></ProjectList>
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
          search:false,
          searchResult:'',
          searchContent:{
            category:'',
            text:''
          },

          categorysForSearch: [
            {text:'제목', value:'0'},
            {text:'내용', value:'1'},
            // {text:'제목 + 내용', value:'2'},
            // {text:'ID', value:'3'},
            // {text:'TAG', value:'4'},
          ],

          textForSearch: '',
          categoryForSearch: {text:'제목', value:'0'} ,

          categorysForPostlist: [
            {text: 'Personal Project', value: '0'},{text: 'Team Project', value: '1'}
          ],
          categoryForPostlist:{text: 'Personal Project', value: '0'},

          categorysForPostlistBySearch: [
            {text: 'Personal Project', value: '0'},{text: 'Team Project', value: '1'}
          ],
          categoryForPostlistBySearch:{text: 'Personal Project', value: '0'},

          page: 1,
          length: 1,
          totalVisible: 7
        }
    },
    watch:{
      categoryForPostlist(){
        this.textForSearch = ''
        this.$refs.project.selectProject(this.categoryForPostlist.value, this.categoryForSearch.value, this.textForSearch);
      }
    },
    methods: {
      searchPosts(){
        this.$refs.project.selectProject(this.categoryForPostlist.value, this.categoryForSearch.value, this.textForSearch);
      },
      allPosts(){
        this.$refs.project.selectProject(this.categoryForPostlist.value, '', '');
      }
    }

 }
 </script>

 <style scoped>
 #page {
   background-color: white;
   width: 90%;
   height: 100%;
   margin: 0 auto;
 }
 </style>
