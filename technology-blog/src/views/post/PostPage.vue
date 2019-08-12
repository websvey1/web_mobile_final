<template>
<div style="background-color: white;">
  <div class="searchbar-total">
    <div class="searchbar-first">
      <v-select v-model="categoryForSearch" :items="categorysForSearch" item-text="text" :menu-props="{ top: true, offsetY: true }" label="Category"  return-object></v-select>
    </div>
    <div class="searchbar-second">
      <v-text-field xs12 label="검색어를 입력해 주세요." v-model='textForSearch'></v-text-field>
    </div>
    <div class="searchbar-third">
      <v-btn class="v-btn theme--dark" @click="searchPosts">검색</v-btn>
      <v-btn class="v-btn theme--dark" @click="allPosts">전체글 보기</v-btn>
    </div>
  </div>
  <v-layout v-if="!search" wrap row pa-4>
      <v-flex fill-height d-flex xs12>
        <div class="container">
        <!-- <span style="font-size:30px">{{tabs.text}}</span> -->
        <div class="" style="width:150px; display:inline-block; margin-right:10px;">
          <v-select v-model="categoryForPostlist" :items="categorysForPostlist" item-text="text" :menu-props="{ top: true, offsetY: true }" label="Category" return-object></v-select>
        </div>
        <h1 style="display:inline;">{{categoryForPostlist.text}}</h1>
        <!-- <h1 style="display:inline;">검색 결과</h1> -->
        <v-divider></v-divider>
        <PostDownList :posts="posts" :category="'2'" ref="post">
        </PostDownList>
        </div>
      </v-flex>
      <v-flex xs12 text-xs-center>
         <v-pagination v-model="page" :length="length" :total-visible="totalVisible"></v-pagination>
       </v-flex>
    </v-layout>
    <v-layout v-else wrap row pa-4>
        <v-flex fill-height d-flex xs12>
          <div class="container">
          <!-- <span style="font-size:30px">{{tabs.text}}</span> -->
          <div class="" style="width:150px; display:inline-block; margin-right:10px;">
            <v-select v-model="categoryForPostlistBySearch" :items="categorysForPostlistBySearch" item-text="text" :menu-props="{ top: true, offsetY: true }" label="Category" return-object></v-select>
          </div>
          <h1 style="display:inline;">{{searchResult}}검색 결과</h1>
          <v-divider></v-divider>
          <PostDownList :posts="posts" :category="'2'" ref="post">
          </PostDownList>
          </div>
        </v-flex>
        <v-flex xs12 text-xs-center>
           <v-pagination v-model="page" :length="length" :total-visible="totalVisible"></v-pagination>
         </v-flex>
      </v-layout>
</div>
</template>
<script>
import PostList from '@/components/post/PostList'
import PostDownList from '@/components/post/PostDownList'

export default {
  name: 'PostTest',
  components: {
    PostList,
    PostDownList,
  },
  data() {
    return {
      posts:[],
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
        {text: 'All Post', value: '2'},{text: 'My Post', value: '0'},{text: 'Team Post', value: '1'}
      ],
      categoryForPostlist:{text: 'All Post', value: '2'},

      categorysForPostlistBySearch: [
        {text: 'All Post', value: '2'},{text: 'My Post', value: '0'},{text: 'Team Post', value: '1'}
      ],
      categoryForPostlistBySearch:{text: 'All Post', value: '2'},

      page: 1,
      length: 1,
      totalVisible: 7
    }
  },
  watch: {
    async page(v) {
      if(!this.search){
        await this.readPosts(v - 1, this.categoryForPostlist.value);
      }
      else{
        await this.readPostsForSearch(v - 1, this.categoryForPostlistBySearch.value);
      }
    },

    async categoryForPostlist(v){
      this.page = 1;
      await this.readPosts(this.page - 1, v.value);
      await this.getTotalPageNum(v.value);
    },

    async categoryForPostlistBySearch(v){
      this.page = 1;
      await this.readPostsForSearch(this.page - 1, v.value);
      await this.getTotalPageNumForSearch(v.value);
    }
  },
  async created() {
    if (this.$session.has('userInfo')) {
      await this.readPosts(this.page - 1, this.categoryForPostlist.value);
      await this.getTotalPageNum(this.categoryForPostlist.value);
    } else {
      alert("로그인 해주세요.");
      this.$router.push("/");
    }
  },
  mounted() {

  },
  methods: {
    move() {
      this.$router.push({
        name: "PostCreatePage",
        params: {
          id: this.$route.params.id
        }
      })
    },

    allPosts(){
      if(this.search){
        this.search = false;
        this.searchContent = {};

        this.textForSearch = '';
        this.categoryForSearch = {text:'제목', value:'0'};
        this.categoryForPostlist = {text: 'All Post', value: '2'};
        this.page = 1;
      }
    },

    async readPosts(page, category) {
      await this.$http.post(this.$store.state.testIp + "/post/alllist/" + page, {post_category:category})
      .then((response) => {
        this.posts = response.data;
      })
      .catch((error) => {
        console.log(error);
      })
    },

    async getTotalPageNum(category) {
      await this.$http.post(this.$store.state.testIp + "/post/totalPageNum", {post_category:category})
        .then((req) => {
          this.length = req.data * 1;
        })
    },

    async searchPosts(){
        if (this.textForSearch != "") {
          this.search = true;
          this.searchContent["category"] = this.categoryForSearch.value;
          this.searchContent["text"] = this.textForSearch;

          this.searchResult = "'" + this.categoryForSearch.text + " : " + this.textForSearch + "' 의"

          this.categoryForPostlistBySearch = {text: 'All Post', value: '2'}
          this.page = 1;

          // this.readPostsForSearch(this.page-1, this.categoryForPostlistBySearch.value);
        } else {
          alert("검색할 단어 혹은 문구를 입력해 주세요.")
        }
    },

    async readPostsForSearch(page, category) {
      this.$http.post(this.$store.state.testIp + "/post/search/" + page, {post_category : category, search_content : this.searchContent})
      .then((result) => {
        this.posts = result.data;
      })
      .catch((error) => {
        console.log(error);
      })
    },
    async getTotalPageNumForSearch(category) {
      await this.$http.post(this.$store.state.testIp + "/post/totalPageNumForSearch", {post_category : category, search_content : this.searchContent})
        .then((req) => {
          this.length = req.data * 1;
        })
        .catch((error) => {
          console.log(error);
        })
    },
  },
  beforeRouteLeave(to, from, next) {
    next();
  },
  destroyed() {

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
