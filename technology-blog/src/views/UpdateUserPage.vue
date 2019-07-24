<template>
<v-layout wrap>
  <v-flex xs12 ma-5>
    <v-card>
      <v-card-title>
        <span class="headline">Update User Info</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap my-5>
            <v-flex xs12>
              <v-text-field readonly label="Name" v-model="name"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field readonly label="Email" v-model="id"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="기존 비밀번호*" type="password" v-model="before_pw" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="변경할 비밀번호*" type="password" :rules="passRules" v-model="after_pw" required></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="goRemoveUser">회원 탈퇴</v-btn>
        <v-btn color="blue darken-1" flat @click="updateUser">수정</v-btn>
        <v-btn color="blue darken-1" flat @click="goHome">취소</v-btn>
      </v-card-actions>

    </v-card>
  </v-flex>
  <Loading :isLoading="isLoading"/>
</v-layout>
</template>

<script>
import LogService from '@/services/LogService'
import FirebaseService from '@/services/FirebaseService'
import Loading from "@/components/Loading"

export default {
  name: 'UpdateUserPage',
  components: {
    Loading
  },
  data() {
    return {
      id: "",
      before_pw: "",
      after_pw: "",

      name: "",
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      passRules: [
        v => !!v || 'Password is required',
        v => v.length >= 6 || 'Password must be longer than 6 characters'
      ],

      isLoading: false
    }
  },
  methods: {
    async updateUser() {
      this.isLoading = true;
      var state = await FirebaseService.updateUser(this.before_pw, this.after_pw);
      this.isLoading = false;

      if (state === true) {
        alert("정보가 수정되었습니다.")
        this.$router.push("/")
      } else {
        var error = state.code
        if ("auth/weak-password" == error) {
          alert("비밀번호가 너무 짧습니다.")
          this.before_pw = ""
          this.after_pw = ""

        } else {
          alert(error)
          this.before_pw = ""
          this.after_pw = ""
        }
      }
    },

     goRemoveUser(){
       this.$router.push("/removeuser")
    },
    goHome(){
      this.$router.push("/")
   }
  },
  async created(){
    if(this.$store.state.userInfo != null){
      LogService.CreatedTime(this);
    }
    // var user = await FirebaseService.getUser()
    var user = this.$store.state.userInfo;
    console.log(user);
    if (user == null) {
      alert("잘못된 접근입니다.")
      this.$router.push("/")
    } else {
      this.id = user.email;
      this.name = user.displayName;
    }

  },
  beforeRouteLeave(to, from, next) {
    if(this.$store.state.logInfo != null){
      LogService.DestroyedTime(this);
    }
    next();
  },
  destroyed() {

  }
}
</script>
