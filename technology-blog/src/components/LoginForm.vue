<template>
<v-dialog v-model="dialog" persistent max-width="600px">
  <template v-slot:activator="{ on }">
    <v-btn flat v-if="islogin" @click="signout()" v-on="">
      logout
    </v-btn>

    <v-btn flat v-else v-on="on">
      login
    </v-btn>
  </template>
  <v-card>
    <v-card-title>
      <span class="headline">LOGIN</span>
    </v-card-title>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
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
      <v-btn color="blue darken-1" flat @click="google_login">GOOGLE</v-btn>
      <v-btn color="blue darken-1" flat @click="facebook_login">FACEBOOK</v-btn>
      <v-btn color="blue darken-1" flat @click="normal_login">LOGIN</v-btn>
      <v-btn color="blue darken-1" flat @click="goSignup">SIGN UP</v-btn>
      <v-btn color="blue darken-1" flat @click="dialog = false">CANCEL</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</template>

<script>
import FirebaseService from '@/services/FirebaseService'

export default {
  name: "LoginForm",
  data() {
    return {
      id: "",
      pw: "",
      dialog: false,
      islogin: false
    }
  },
  created(){
    var user = this.$session.get("user")

    if(user == null){
      this.islogin = false
    }
    else{
      this.islogin = true
    }
  },
  methods: {
    async normal_login() {
      var user = await FirebaseService.login(this.id, this.pw)

      if(user){
        this.successLogin(user)
      }
    },
    async facebook_login(){
      var user = await FirebaseService.facebook_login();

      if(user){
        this.successLogin(user)
      }
    },
    async google_login(){
      var user = await FirebaseService.google_login();

      if(user){
        this.successLogin(user)
      }
    },
    successLogin(user){
      alert(user.displayName + "님 환영합니다!")

      this.$session.set("user", user);
      this.dialog = false;
      this.islogin = !this.islogin;
    },
    goSignup(){
      this.dialog = false;
      this.$router.push("/signup");
    },
    async signout(){
      var state = await FirebaseService.signout();

      if(state === true){
        this.$session.remove("user");
        this.islogin = !this.islogin;
      }
      else{
        alert("잘못된 접근입니다.")
      }
    }
  }
}
</script>

<style>

</style>
