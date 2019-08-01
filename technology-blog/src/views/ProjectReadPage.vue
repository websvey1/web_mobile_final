<template>

<div id="top__container" style="
  width: 73%; margin: 0 auto;
  ">
  <v-container>
    <div style="margin-top: 30px;">
      <!-- 사진 -->
      <v-carousel hide-delimiters style="
      width:50%; height:45%; float:left; margin-top: 3px;
      ">
        <v-carousel-item v-resize="onResize" v-for="(image, i) in images" :key="i" :src="image.image_url"></v-carousel-item>
      </v-carousel>

      <h1 style="text-align:center; padding-bottom:20px;">Project</h1>
      <!-- 상세 -->
      <v-layout wrap align-center justify-center row fill-height style="
      width:47%; height:50%; float:right;
      ">
        <v-flex wrap>
          <fieldset style="margin-right:4px; height:80%; padding:10px 15px;">
            <!-- <legend style="text-align:right; padding-bottom:10px;"><h1>&nbsp;Project&nbsp;</h1></legend> -->
            <div style="margin:15px 20p;">
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
              <p>{{ project.git_url }}darkdarkdarkdarkdarkdarkdarkdarkdarkdarkdarkdarkdarkdarkdarkdarkdarkdarkdarkdarkdarkdarkdarkdarkdarkdarkdarkdarkdarkdarkdarkdarkdarkdarkdarkdarkdarkdarkdarkdark</p>

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
      images: [],
      modify: false,
      menu: false,
      picker: new Date().toISOString().substr(0, 10),
    }
  },
  mounted() {
    console.log(this.$route.params)
    var id = this.$route.params.id;
    console.log(`http://192.168.31.61:3000/myproject/${id}`)
    this.$http.get(`http://192.168.31.61:3000/myproject/${id}`)
      .then((res) => {
        this.project = res.data.project[0];
        this.images = res.data.images;
        console.log(this.images)
        console.log(this.images[0].image_url)
      });
  },
  methods: {
    goHome() {
      this.$router.push("/post")
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
