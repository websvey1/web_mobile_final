<template>
<div style="background-color: white;">

  <div class="searchbar-total">
    <div class="searchbar-first">
      <v-select
        v-model="category"
        :items="items"
        :menu-props="{ top: true, offsetY: true }"
        label="Category"
      ></v-select>
    </div>
    <div class="searchbar-second">
      <v-text-field xs12 label="검색어를 입력해 주세요." v-model='search'></v-text-field>
    </div>
    <div class="searchbar-third">
      <v-btn class="v-btn theme--dark" @click="searchPost">검색</v-btn>
      <v-btn class="v-btn theme--dark" @click="move">POST 작성</v-btn>
    </div>
  </div>

  <div style="padding:50px 0;">
    <v-card flat>
      <v-tabs centered v-model="tab"  grow>
        <v-tab v-for="item in items" :key="item" style="font-size:30px;">
          {{ item }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="text in texts" :key="text">
          <v-card flat>
            <v-card-text>{{ text }}</v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
  </div>

</template>

<!-- 궁명씨 부탁드려요!!! 화이팅!! POST 작성 버튼도 팀, 개인 나눠서 저기 tab 클릭하면 나오는 페이지에 각각 하나씩 넣으래요.. -->
  <!-- <v-layout wrap row pa-4>
      <v-flex fill-height d-flex xs12 md6>
        <div class="container">
        <h1>개인 POST</h1>
        <v-divider></v-divider>
        <PostDownList :category="'0'" ref="personal">
        </PostDownList>
        </div>
      </v-flex>
      <v-flex fill-height d-flex xs12 md6>
        <div class="container">
        <h1>팀 POST</h1>
        <v-divider ></v-divider>
        <PostDownList :category="'1'" ref="team">
        </PostDownList>
        </div>
      </v-flex>
    </v-layout> -->


<script>
import PostList from '@/components/post/PostList'
import PostDownList from '@/components/post/PostDownList'

export default {
	name: 'PostTest',
  components:{
    PostList,
    PostDownList,
  },
  data() {
    return {
      items: ['제목', '내용', '제목 + 내용', 'ID'],
      search:"",
      category:"",
      items: [
       'My Post',  'Team Post',
      ],
      texts: [
        '11111', '22222',
      ],
      page:1,
      length:1,
      totalVisible:7
    }
  },
  watch:{
    page(v){
      this.$refs.personal.setPage(v-1);
      this.$refs.team.setPage(v-1);
    }
  },
	methods: {
    async postText() {

    },
    move(){
      this.$router.push({ name: "PostCreatePage", params: {id: this.$route.params.id} })
    },

    async getTotalPageNum(){
      await this.$http.post("http://192.168.31.65:3000/post/totalPageNum/" + this.$session.get('userInfo').user_num)
      .then((req) => {
        this.length = req.data * 1;
      })
    },
    searchPost(){
      var category;
      if(this.category != ""){
        if(this.category == "제목"){
          category = "0"
        }
        else if(this.category == "내용"){
          category = "1"
        }
        else if(this.category == "제목 + 내용"){
          category = "2"
        }
        else if(this.category == "ID"){
          category = "3"
        }

        if(this.search != ""){
          var config = {
            search:this.search,
            category:category
          }

          this.$refs.personal.searchPosts(config);
          this.$refs.team.searchPosts(config);
        }
        else{
          alert("검색할 단어 혹은 문구를 입력해 주세요.")
        }
      }
      else{
        alert("검색할 카테고리를 선택해 주세요.")
      }
    }
	},
  mounted(){

  },
  async created(){
    if(this.$session.has('userInfo')){
      await this.getTotalPageNum();
    }
    else{
      alert("로그인 해주세요.");
      this.$router.push("/");
    }
  },
  beforeRouteLeave(to, from, next){

    next();
  },
  destroyed(){

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
  .searchbar-total{
    display: flex;
    justify-content: center;
    padding-top: 40px;
    padding-bottom: 20px;
    /* background-color: rgba(9,9,9,0.1); */
  }

  .container h1{
    margin-left: 50px;
  }
  .searchbar-first{
    float: left;
    display: inline-block;
    margin: 5px;
    max-width: 150px;
  }
  .searchbar-second{
    float: left;  display: inline-block;
    margin: 5px;

  }
  .searchbar-third{
    float: left;  display: inline-block;
    margin: 5px 0px;
    vertical-align: center;

  }
  .searchBtn{
    border-radius: 5%;
    /* font-weight:bold; */
    color: rgb(0, 0, 0);
    background-color: rgb(156, 156, 156);
    text-align: center;
  }
</style>
