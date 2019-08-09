<template>
<div class="container">
  <v-layout wrap>
    <v-flex wrap v-for="userInfo in users" v-bind:key="userInfo.userN" xs3 style="margin-top: 30px; margin-bottom: 40px;">
      <div class="card" @click="userRead(userInfo.userN)">
        <div class="banner">
          <!-- <div class="avatar"> -->
          <img class="avatar" :src="userInfo.user_image|image"></img>
          <!-- </div> -->
        </div>
      <h3><b>{{ userInfo.userId }}</b></h3>
      <a>📧 {{ userInfo.userEmail }}</a>
      <a>📱 Project - {{ userInfo.userProject }} Post - {{ userInfo.userPost }}</a>
      <span v-for="tech in userInfo.userTech">
        <v-chip color="rgb(191, 234, 255)">{{ tech }}</v-chip>
      </span>
      <ul>
      </ul>
    </div>

</v-flex>
</v-layout>
</div>
</template>

<script>
export default {
  name: "AnotherUser",
  data() {
    return {
      users: []
    }
  },
  filters: {
    image(v) {
      if (!v) {
        return "https://t1.daumcdn.net/cfile/tistory/2513B53E55DB206927";
      } else {
        return v;
      }
    }
  },
  mounted() {
    this.onUser();
  },
  methods: {
    async onUser() {
      await this.$http.post('http://192.168.31.61:3000/another/getUsers')
        .then(async (response) => {
          for (var i = 0; i < response.body.length; i++) {
            var data = {
              userNum: response.body[i].user_num
            }
            await this.$http.post('http://192.168.31.61:3000/another/getInfo', data)
              .then(async (response) => {
                var tech = response.body;
                this.users.push(tech)
              })
              .catch((error) => {
                console.log(error)
              })
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    userRead(user_id) {
      var userid = user_id
      console.log(userid)
      this.$router.push(`/another/${userid}`)
    }
  }
}
</script>

<style scoped>
.card {
  height: auto;
  min-height: 318px;
  width: 225px;
  /* ⬅ Size - Small (width: 200px), Medium (width: 225px), Large (width: 250px) */
  overflow: hidden;
  background-color: #FFFFFF;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  -webkit-transition: .1s ease-in-out;
  transition: .1s ease-in-out;
  cursor: pointer;
}

.card:first-of-type {
  margin-right: 25px;
}

.card:hover {
  margin-top: -25px;
  box-shadow: 0 15px 20px rgba(0, 0, 0, 0.2);
}

.banner {
  height: 100px;
  width: 100%;
  background-image: url("https://images.unsplash.com/photo-1533158326339-7f3cf2404354?ixlib=rb-1.2.1&auto=format&fit=crop&w=1004&q=80");
  padding-top: 35px;
  background-color: #FAFAFA;
  background-size: cover;
  background-position: center;
}


.avatar {
  height: 100px;
  width: 100px;
  margin: auto;
  background-size: cover;
  background-position: center;
  background-color: #F1F1F1;
  border: 3px solid #FFFFFF;
  border-radius: 100%;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
}

h3,
a,
i {
  font-family: 'Roboto', sans-serif;
  font-weight: lighter;
  -webkit-transition: .1s ease-in-out;
  transition: .1s ease-in-out;
}

h3 {
  margin-top: 45px;
  margin-bottom: 5px;
  font-size: 18px;
  color: #212121;
}

a {
  display: block;
  padding: 5px 0px;
  font-size: 14px;
  color: rgb(71, 71, 71);
  text-decoration: none;
  font-weight: 400;
  cursor: default !important;
}

a:hover {
  background-color: #FAFAFA;
  color: inherit;
}

ul {
  margin-top: 10px;
  padding: 15px 0px;
  background-color: #FAFAFA;
}

ul a {
  display: inline;
  margin-right: 10px;
}

ul a:last-of-type {
  margin-right: 0px;
}
</style>
