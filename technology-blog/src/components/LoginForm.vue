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
      islogin: false,
      idRules: [v => !!v || '아이디를 입력해 주세요.'],
      pwRules: [v => !!v || '비밀번호를 입력해 주세요.']
    }
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
    async normal_login() {
      if (this.checkValidation()) {
        this.isLoading = true;

        this.$http.post("/user/login", this.form)
          .then((res) => {
            console.log(res);
            if (res == null) {
              alert("아이디와 비밀번호를 확인해 주세요.");
            } else {
              alert("로그인 되었습니다.")
              this.$store.state.user = res;
            }
            this.resetForm();
            this.isLoading = false;
          })
      }
    },
    async facebook_login() {

    },
    async google_login() {

    },
    successLogin(user) {
      alert(user.displayName + "님 환영합니다!")

      this.$session.set("user", user);
      this.dialog = false;
      this.islogin = !this.islogin;
    },
    goSignup() {
      this.dialog = false;
      this.$router.push("/signup");
    },
    async signout() {
      this.$session.remove("user");
      this.islogin = !this.islogin;
    }
  }
}
</script>

<style>

</style>
