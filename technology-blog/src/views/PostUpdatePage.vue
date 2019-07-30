<template>
<v-layout wrap align-center justify-center row fill-height>
  <v-flex xs12 ma-5 text-xs-left>
    <fieldset>
      <legend>PICTURE</legend>
      <ImageUpload :random_picture="true" ref="imagePicker"></ImageUpload>
    </fieldset>
    <fieldset>
      <legend>TITLE</legend>
      <div style="margin:0px 16px">
        <v-text-field xs12 label="제목을 입력해 주세요." v-model='post.post_title'></v-text-field>
      </div>
    </fieldset>
    <fieldset>
      <legend>CONTENT</legend>
      <div style="margin:16px;">
        <markdown-editor v-model="post.post_content" ref="markdownEditor"></markdown-editor>
      </div>
    </fieldset>

    <v-layout wrap>
      <v-flex xs9>
        <fieldset style="margin-right:4px; height:100%">
          <legend>TAG</legend>
          <div style="margin:16px;" id="hashtag">
            <HashTag ref="hashtag"></HashTag>
          </div>
        </fieldset>
      </v-flex>
      <v-flex xs3>
        <fieldset style="margin-left:4px; height:100%">
          <legend>VISIBILILTY</legend>
          <div style="margin:16px;">
            <v-radio-group v-model="post.post_share">
              <v-radio label="Public" color="primary" value="0"></v-radio>
              <v-radio label="Private" color="error" value="1"></v-radio>
            </v-radio-group>
          </div>
        </fieldset>
      </v-flex>
    </v-layout>

    <div style="text-align:center;" id="write-btn">
      <v-btn class="v-btn theme--dark" @click="updatePost">수정</v-btn>
      <v-btn class="v-btn theme--dark" @click="deletePost">삭제</v-btn>
      <v-btn class="v-btn theme--dark" @click="goRead">취소</v-btn>
    </div>

    <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="true"></loading>
  </v-flex>
</v-layout>
</template>

<script>
import markdownEditor from 'vue-simplemde/src/markdown-editor'
import FirebaseService from '@/services/FirebaseService'
import ImageUpload from "@/components/ImageUpload"
import HashTag from "@/components/HashTag"
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import LogService from '@/services/LogService'
import Time from "@/services/Time"

export default {
  name: 'PostUpdatePage',
  components: {
    markdownEditor,
    ImageUpload,
    HashTag,
    Loading
  },
  data() {
    return {
      post: {},
      isLoading: false,
    }
  },
  async mounted() {
    await this.fetchData();
  },
  computed:{
    async form () {
      return {
        title: this.post.post_title,
        content: this.post.post_content,
        share: this.post.post_share,
        category:0,
        updated_at:Time.getFullDate(),
        tags: this.$refs.hashtag.getTagsForDb(),
        imageUrl: await this.$refs.imagePicker.getImageUrl(),
        user_num:this.post.user_num,
        image_num:this.post.image_num,
        imageconn_num: this.post.imageconn_num
      }
    },
  },
  beforeRouteLeave(to, from, next) {
    next();
  },
  methods: {
    async fetchData() {
      this.post = null;

      await this.$http.get("http://192.168.31.65:3000/post/read/" + this.$route.params.id)
        .then((response) => {
          this.post = response.data.post;

          this.$refs.imagePicker.setImage(response.data.post.image_url);

          var tags = [];
          var colors = ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'];

          console.log(response.data);
          var val = response.data.tags;
          console.log(val);
          for (var i = 0; i < val.length; i++) {
            tags.push({
              text: val[i].tag_name,
              color: colors[i % 6]
            })
          }

          console.log(tags);
          this.$refs.hashtag.setTags(tags);
        })
        .catch(error => {
          console.log(error);
        })
    },
    async updatePost() {
      this.isLoading = true;
      var post = await this.form;

      this.$http.put("http://192.168.31.65:3000/post/update/"+this.$route.params.id, post)
      .then((response) => {
        alert("수정이 완료 되었습니다.");
        this.isLoading = false;
        this.$router.go(-1);
      })
      .catch((error) => {
        alert("수정 실패하였습니다.")
        this.isLoading = false;
      })
    },
    async deletePost() {
      var isDelete = confirm("정말 삭제하시겠습니까?");

      if(isDelete){
        this.isLoading = true;
        this.$http.delete("http://192.168.31.65:3000/post/delete/" + this.$route.params.id)
        .then((response) => {
          alert("삭제되었습니다.")
          this.isLoading = false;
          this.$router.push("/")
        })
        .catch((error) => {
          alert("삭제 실패하였습니다.")
          this.isLoading = false;
        })
      }
    },

    goRead() {
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>
@import '~simplemde/dist/simplemde.min.css';

#preview {
  display: flex;
  justify-content: center;
  align-items: center;
}

#preview img {
  max-width: 100%;
  max-height: 200px;
}

#btn {
  float: center;
}
</style>
