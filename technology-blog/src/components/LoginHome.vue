<template>
<v-dialog v-model="dialog" persistent max-width="600px" @keydown.esc="closeDialog">
  <template v-slot:activator="{ on }">
    <span v-if="$store.state.userInfo" @click="signout()" v-on="">Logout</span>
    <span v-else v-on="on">Login</span>
  </template>
  <v-card>
    <v-card-title>
      <span class="headline">LOGIN</span>
    </v-card-title>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap @keydown.enter="normalLogin">
          <v-flex xs12>
            <v-text-field label="Email*" required v-model="id"></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field label="Password*" type="password" required v-model="pw"></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" flat @click="googleLogin">GOOGLE</v-btn>
      <v-btn color="blue darken-1" flat @click="facebookLogin">FACEBOOK</v-btn>
      <v-btn color="blue darken-1" flat @click="normalLogin">LOGIN</v-btn>
      <v-btn color="blue darken-1" flat @click="goSignup">SIGN UP</v-btn>
      <v-btn color="blue darken-1" flat @click="closeDialog">CANCEL</v-btn>
    </v-card-actions>
    <Loading :isLoading="isLoading" :isFullPage="false"/>
    <Loading :isLoading="isLoadingForSignout" :isFullPage="true"/>
  </v-card>
</v-dialog>
</template>

<script>
import FirebaseService from '@/services/FirebaseService'
import Loading from '@/components/Loading';

export default {
  name: "LoginForm",
  data() {
    return {
      id: "",
      pw: "",
      dialog: false,
      isLoading: false,
      isLoadingForSignout:false,
    }
  },
  components:{
    Loading
  },
  async created() {
    var user = await FirebaseService.getUser();

    if (user == null) {
      this.$store.state.isLogin = false
    } else {
      this.$store.state.isLogin = true
    }
  },
  methods: {
    async normalLogin() {
      this.isLoading = true;
      var state = await FirebaseService.normalLogin(this.id, this.pw)
      this.isLoading = false;

      if (state === true) {
        var user = await FirebaseService.getUser();
        this.successLogin(user)
      }
      else{
        if(state.code == "auth/invalid-email" || state.code == "auth/user-not-found"){
          alert("아이디를 확인해 주세요.")
          this.id =""
        }
        else if(state.code == "auth/wrong-password"){
          alert("비밀번호를 확인해 주세요.")
          this.pw = ""
        }
        else{
          alert(state.code)
          this.id =""
          this.pw =""
        }
      }
    },
    async facebookLogin() {
      var user = await FirebaseService.facebookLogin();

      if (user) {
        this.successLogin(user)
      }
    },
    async googleLogin() {
      var user = await FirebaseService.googleLogin();

      if (user) {
        this.successLogin(user)
      }
    },

    successLogin(user) {
      alert(user.displayName + "님 환영합니다!")
      this.$store.state.userInfo = user;
      this.dialog = false;
    },

    goSignup() {
      this.dialog = false;
      this.$router.push("/signup");
    },
    async signout() {
      this.isLoadingForSignout = true;
      var state = await FirebaseService.signout();
      this.isLoadingForSignout = false;

      if (state === true) {
        this.id = "";
        this.pw = "";
        this.$store.state.userInfo = null;
        alert("로그아웃 되었습니다.")
      } else {
        alert("잘못된 접근입니다.")
      }

      this.$router.push("/")
    },

    closeDialog() {
      this.dialog = false;
      this.id = "";
      this.pw = "";
    }
  }
}
</script>

<style>

</style>
