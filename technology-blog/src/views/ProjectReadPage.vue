<template>
<div id="top__container" style="
  width: 73%; margin: 0 auto;
  ">
  <v-container>
    <div style="margin-top: 20px;">
      <!-- 사진 -->
      <v-layout wrap fill-height>
        <v-flex>
          <h1 style="text-align: center">Project</h1>

          <v-btn round outline color="black" @click="todo()" style="margin-left: 85%; margin-bottom: 20px; font-size:13px; height:40px; ">
             <div style="color:black; font-weight:bolder;">todo list</div><img src="@/assets/todo2.png/" style="width:30px; margin-left:10px;"/>
          </v-btn>
        </v-flex>
      </v-layout>

      <v-carousel hide-delimiters style="
      width:50%; float:left; margin-top: 3px;
      ">
        <v-carousel-item v-resize="onResize" v-for="image in images" :key="image.imgnum" :src="image.imgurl"></v-carousel-item>
      </v-carousel>

      <!-- 상세 -->
      <v-layout wrap align-center justify-center row fill-height style="
      width:47%; float:right;
      ">
        <v-flex wrap>
          <fieldset style="margin-right:4px; height:100%; padding:20px 10px;">
            <!-- <legend style="text-align:right; padding-bottom:10px;"><h1>&nbsp;Project&nbsp;</h1></legend> -->
            <div style="margin:0 20px;">
              <h2 style="padding:5px 0;">Title</h2>
              <p>{{ project.project_title }}</p>

              <h2 style="padding:5px 0;">Goal</h2>
              <p>{{ project.project_goal }}</p>

              <h2 style="padding:5px 0;">Term</h2>
              <v-menu v-model="menu" bottom right transition="scale-transition" origin="top left">
                <template v-slot:activator="{ on }">
                  <v-chip pill v-on="on">
                    <v-icon left>event</v-icon>
                    <span style="cursor: pointer">{{ project.project_start_date }} ~ {{ project.project_end_date }}</span>
                  </v-chip>
                </template>
                <v-layout justify-center>
                  <v-date-picker v-model="picker" no-title :show-current="false" locale="ko-kr"></v-date-picker>
                </v-layout>
              </v-menu>
              <br>

              <h2>Status</h2>
              <v-btn rounded color="warning" dark>{{ project.project_status }}</v-btn>
              <br>

              <h2 style="padding:5px 0;">git_url</h2>
              <p>{{ project.project_git_url }}</p>
            </div>
          </fieldset>
        </v-flex>
      </v-layout>
    </div>

    <v-layout wrap align-center justify-center row fill-height style="clear:both; padding-top:20px;">
      <v-flex>
        <fieldset style="padding:10px 15px; height:80%">

          <h2 style="padding:10px 0;">Content</h2>
          <p>{{ project.project_content }}</p>

        </fieldset>
      </v-flex>
    </v-layout>
    <div style="text-align:center; margin-top: 20px;" id="write-btn">
      <v-btn v-if="project.project_user === loginUser" class="v-btn theme--dark" @click="goUpdate">수정</v-btn>
      <v-btn v-if="project.project_user === loginUser" class="v-btn theme--dark" @click="goDelete">삭제</v-btn>
      <v-btn class="v-btn theme--dark" @click="goHome">목록</v-btn>
    </div>

  </v-container>
</div>
</template>

<script>
import ImageUpload from "@/components/common/ImageUpload"

export default {
  name: 'ProjectReadPage',
  components: {
    ImageUpload
  },
  data() {
    return {
      project: [],
      images: null,
      modify: false,
      menu: false,
      picker: new Date().toISOString().substr(0, 10),
      loginUser: this.$session.get('userInfo').user_num,
    }
  },
  mounted() {
    var id = this.$route.params.id;
    this.$http.get(`http://192.168.31.63:3000/myproject/${id}`)
      .then((res) => {
        console.log(res)
        this.project = res.data.project[0];
        this.images = res.data.images;
        console.log(this.images)
      });
  },
  methods: {
    todo() {
      this.$router.push(`/todolist/${this.$route.params.id}`)
    },
    goHome() {
      this.$router.push("/project")
    },
    goUpdate() {
      var id = this.$route.params.id;
      this.$router.push(`/myproject/update/${id}`)
    },
    goDelete() {
      var id = this.$route.params.id;
      var data = {
        pjtNum: id
      }
      console.log(data)
      this.$http.post(this.$store.state.testIp + '/myproject/delete/project', data)
        .then((res) => {
          alert("글 삭제 완료");
          console.log(res)
          this.$router.push('/myproject')
        })
    }
  }
}
</script>

<style scoped>
v-container {
  max-width: 100px !important;
}

#preview {
  display: flex;
  justify-content: center;
  align-items: center;
}

#preview img {
  max-width: 50%;
  max-height: 200px;
}

#btn {
  float: center;
}
</style>
