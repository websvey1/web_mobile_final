<template>
<v-container>
<v-carousel hide-delimiters>
<v-carousel-item
    v-resize="onResize"
    v-for="(image, i) in images"
    :key="i"
    :src="image.image_url"
></v-carousel-item>
</v-carousel>
<div style="width: 85%; margin: 0 auto;">
<v-layout wrap align-center justify-center row fill-height>
  <v-flex>
  <fieldset style="margin-right:4px; height:80%">
    <legend>&nbsp;Project&nbsp;</legend>
    <div style="margin-left: 15px; margin-right: 15px">
     <h2>Title</h2>
     <p>{{ project.project_title }}</p>

     <h2>Goal</h2>
     <p>{{ project.project_goal }}</p>

     <h2>Term</h2>
     <v-menu
        v-model="menu"
        bottom
        right
        transition="scale-transition"
        origin="top left"
      >
        <template v-slot:activator="{ on }">
          <v-chip
            pill
            v-on="on"
          >
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
      <br>

      <h2>Content</h2>
      <p>{{ project.project_content }}</p>

  </div>
  </fieldset>
  </v-flex>
</v-layout>
</div>
</v-container>
</template>

<script>
import ImageUpload from "@/components/ImageUpload"
import LogService from '@/services/LogService'

export default {
  name: 'ProjectReadPage',
  components: {
    ImageUpload
  },
  data() {
    return {
      project: [],
      images: [],
      modify:false,
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
        // console.log(res)
        this.project = res.data.project[0];
        // console.log(res.data);
        // console.log(this.project)
        this.images = res.data.images;
        console.log(this.images)
        console.log(this.images[0].image_url)
    });
   },
   methods: {
    goHome(){
      this.$router.push("/post")
    },

   }
}
</script>

<style scoped>
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

.content-field{
  min-height: 500px;
}
</style>
