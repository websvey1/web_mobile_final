 <template>
  <div class="post-container">
    <span class="published">
      <p class="date">
        {{ post.post_created_at | date}}
      </p>

      <p class="date">
        {{ post.post_created_at | time}}
      </p>
    </span>
    <div class="post">
      <img v-if="post.image_url != null" :src="post.image_url"/>
      <img v-else src="https://source.unsplash.com/random/300x300"></img>

      <a @click="goReadPage(post.post_num)"><h1 class="posth1"><i v-if="post.post_share=='1'" class="fas fa-lock">&nbsp;&nbsp;</i>{{ post.post_title}} </h1></a>
      <p class="pcontent">{{ post.post_content | content }}</p>
      <p class="puser">{{post.project_title|project}} {{post.user_name|name}}</p>
    </div>
  <!-- <br>
  <br>
  <hr style="width: 95%; margin: auto;"> -->
  </div>
 </template>

<script>
import router from '@/router'

export default {
    name: 'PostDownCard',
    data: () => ({
    }),
    props: {
        post: {}
    },
    methods: {
        goReadPage(postNum){
          // console.log(postNum);
          router.push({name:"PostReadPage", params:{id:postNum}})
        }
    },
    filters:{
      date(v){
        return v.split(' ')[0];
      },
      time(v){
        return v.split(' ')[1];
      },
      content(v){
        return '"' + v + '"'
      },
      name(v){
        return "작성자 : " + v;
      },
      project(v){
        if(v == undefined){
          return "";
        }
        return v + " | ";
      }

    }
  }
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Jura:300,400,500,600);
@import url(https://fonts.googleapis.com/css?family=Play);
@import url(https://fonts.googleapis.com/css?family=Open+Sans:400,300);

.logo {
  float: left;
}

.post-container {
  position: relative;
  padding-left: 75px;
}

.published {
  position: absolute;
  width: 100px;
  left: 25px;
  padding: 10px 0;
  text-align: center;
  background-color: #fff;
}

.date {
  text-transform: uppercase;
  font-family: Open Sans;
  font-weight: bold;
  color: #222;
  font-size: 12px;
}

.post {
  padding-left: 50px;
  margin-bottom: 40px;
  margin: 0 auto;
  border-left: 1px solid #999;
  min-height:180px;
}

/* .post-container:last-child .post {
    padding-bottom: 60px;
} */

.posth1 {
  /* padding-top: 3px; */
  font-family: Open Sans;
  font-weight: bold;
  color: #222;
  font-size: 30px;
  margin: 0;
  margin-bottom: 15px;
  text-transform: uppercase;
   /* 여러 줄 자르기 추가 스타일 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  line-height: 1.2;
  height:1.2em;
  text-align: left;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical ;
}

.pub-date {
  font-family: Open Sans;
  color: #666;
  font-size: 12px;
}

.post img {
  width: 160px;
  height: 160px;
  border-radius: 9999px;
  float: left;
  margin-right: 15px;
  margin-top: 5px;
}

.pcontent {
  padding-left:25px;
  padding-top: 10px;
  font-family: Open Sans;
  color: #333;
  line-height: 1.6;
  min-height:90px;
  font-size: 18px;
  margin-top: 0;
  text-overflow: ellipsis;
  /* 여러 줄 자르기 추가 스타일 */
  white-space: normal;
  /* height: 4.5em; */
  text-align: left;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.puser{
  padding-left:25px;
  font-family: Open Sans;
  color: #333;
  line-height: 1.6;
  margin-top: 0;
  text-overflow: ellipsis;
  /* 여러 줄 자르기 추가 스타일 */
  white-space: normal;
  /* height: 4.5em; */
  text-align: right;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

</style>
