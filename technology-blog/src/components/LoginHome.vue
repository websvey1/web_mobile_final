<template>
<v-dialog v-model="dialog" persistent max-width="600px" @keydown.esc="closeDialog">
  <template v-slot:activator="{ on }">
    <span v-if="$store.state.isLogin" @click="signout()" v-on="">Logout</span>
    <span v-else v-on="on">Login</span>
  </template>
  <v-card>
    <v-card-title>
      <span class="headline">LOGIN</span>
    </v-card-title>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap @keydown.enter="loginWithId">
          <v-flex xs12>
            <v-text-field label="Email*" required v-model="id" ref="id" :rules="idRules"></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field label="Password*" type="password" required v-model="pw" ref="password" :rules="pwRules"></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <!-- <v-btn color="blue darken-1" flat @click="googleLogin">GOOGLE</v-btn>
      <v-btn color="blue darken-1" flat @click="facebookLogin">FACEBOOK</v-btn> -->
      <v-btn color="blue darken-1" flat @click="loginWithId">LOGIN</v-btn>
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
      islogin: false,
      isLoading: false,
      isLoadingForSignout: false,
      idRules: [v => !!v || '아이디를 입력해 주세요.'],
      pwRules: [v => !!v || '비밀번호를 입력해 주세요.']
    }
  },
  components:{
    Loading
  },
  created() {
    var user = this.$session.get("user")

    if (user == null) {
      this.islogin = false
    } else {
      this.islogin = true
    }
  },
  computed: {
    form () {
      return {
        id: this.id,
        password: this.pw
      }
    },
  },
  methods: {
    checkValidation() {
      var validation = true;

      Object.keys(this.form).forEach(f => {
        if (this.$refs[f].validate(true) == false) {
          validation = false;
        }
      })

      return validation;
    },
    resetForm() {
      Object.keys(this.form).forEach(f => {
        this.$refs[f].reset();
      })
    },
    async loginWithId() {
      if (this.checkValidation()) {
        this.isLoading = true;

        this.$http.post("http://192.168.31.65:3000/user/login", this.form)
          .then((res) => {
            console.log(res.data);
            if (res.data.length == 0) {
              alert("아이디와 비밀번호를 확인해 주세요.");
              this.resetForm();
            } else {
              alert("로그인 되었습니다.")
              this.$store.state.userInfo = res.data[0];
              this.$store.state.isLogin = true;
              this.closeDialog();
            }
            this.isLoading = false;
          })
      }
    },

    // async facebookLogin() {
    //   var user = await FirebaseService.facebookLogin();
    //
    //   if (user) {
    //     this.successLogin(user)
    //   }
    // },
    // async googleLogin() {
    //   var user = await FirebaseService.googleLogin();
    //
    //   if (user) {
    //     this.successLogin(user)
    //   }
    // },

    goSignup() {
      this.dialog = false;
      this.$router.push("/signup");
    },

    async signout() {
      this.resetForm();
      this.$store.state.userInfo = null;
      this.$store.state.isLogin = false;
      alert("로그아웃 되었습니다.")
      this.$router.push("/")
    },

    closeDialog() {
      this.dialog = false;
      this.resetForm();
    }
  }
}
</script>

<style>

</style>
