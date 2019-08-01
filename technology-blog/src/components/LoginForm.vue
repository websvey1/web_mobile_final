<template>
<v-dialog v-model="dialog" persistent max-width="600px" @keydown.esc="closeDialog">
  <template v-slot:activator="{ on }">
    <!-- <span v-if="isLogin" @click="signout()" v-on="">Logout</span> -->
    <v-btn v-if="isLogin" flat class="outlined" @click="signout" v-on="" color="rgb(57, 117, 72)">Logout</v-btn>
    <v-btn v-else flat class="outlined" @click="" v-on="on" color="rgb(57, 117, 72)">Login</v-btn>
    <!-- <v-btn v-if="isLogin"  flat outline @click="signout" v-on="">Logout</v-btn>
    <v-btn v-else flat outline @click="" v-on="on">Login</v-btn> -->

    <!-- <span v-else v-on="on">Login</span> -->
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
import Loading from '@/components/common/Loading';

export default {
  name: "LoginForm",
  data() {
    return {
      id: "",
      pw: "",
      dialog: false,

      isLogin: true,

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
    this.isLoading = true;

    this.isLogin = this.$session.has("userInfo")

    if(this.isLogin){
      console.log(this.$session.get("userInfo"));
    }
  },
  mounted(){
    this.isLoading = false;
  },
  computed: {
    form () {
      return {
        id: this.id,
        password: this.pw
      }
    }
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
              this.isLogin = true;
              this.$session.set("userInfo", res.data);
              this.closeDialog();
            }
            this.isLoading = false;
          })
      }
    },

    goSignup() {
      this.dialog = false;
      this.$router.push("/user/create");
    },

    signout() {
      this.isLogin = false;
      this.$session.remove("userInfo");

      this.resetForm();
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
.v-btn.outlined {
    border: 1px solid rgb(57, 117, 72);
    border-radius:10%;
    height: 50px;
    width: 60px;
  }
</style>
