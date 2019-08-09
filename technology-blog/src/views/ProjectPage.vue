<template>
<div style="background-color: white;">
  <!-- <v-btn class="v-btn theme--dark" style="margin-bottom: 20px;" to="/myproject/create">프로젝트 작성</v-btn> -->
  <!-- <v-btn class="v-btn theme--dark" style="margin-bottom: 20px;" to="/todolist">Todo-List 작성</v-btn> -->
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
    <v-divider style="padding-bottom:20px;">
      </slot>></v-divider>
  </div>

  <ProjectList ref="project"></ProjectList>
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
            {text:'제목 + 내용', value:'2'},
            {text:'ID', value:'3'},
            {text:'TAG', value:'4'},
          ],

          textForSearch: '',
          categoryForSearch: {text:'제목', value:'0'} ,

          categorysForPostlist: [
            {text: 'My Project', value: '0'},{text: 'Team Project', value: '1'}
          ],
          categoryForPostlist:{text: 'My Project', value: '0'},

          categorysForPostlistBySearch: [
            {text: 'My Project', value: '0'},{text: 'Team Project', value: '1'}
          ],
          categoryForPostlistBySearch:{text: 'My Project', value: '0'},

          page: 1,
          length: 1,
          totalVisible: 7
        }
    },
    watch:{
      categoryForPostlist(v){
        this.$refs.project.selectProject(v.value);
      }
    },
    methods: {

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

  .searchbar-total {
    display: flex;
    justify-content: center;
    padding-top: 40px;
    padding-bottom: 20px;
    /* background-color: rgba(9,9,9,0.1); */
  }

  .container h1 {
    margin-left: 50px;
  }

  .searchbar-first {
    float: left;
    display: inline-block;
    margin: 5px;
    max-width: 150px;
  }

  .searchbar-second {
    float: left;
    display: inline-block;
    margin: 5px;

  }

  .searchbar-third {
    float: left;
    display: inline-block;
    margin: 5px 0px;
    vertical-align: center;

  }

  .searchBtn {
    border-radius: 5%;
    /* font-weight:bold; */
    color: rgb(0, 0, 0);
    background-color: rgb(156, 156, 156);
    text-align: center;
  }
 </style>
