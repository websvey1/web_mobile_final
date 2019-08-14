<template>
<v-dialog v-model="dialog" persistent max-width="550px" @keydown.esc="closeDialog">
  <template v-slot:activator="{ on }">
    <v-flex v-if="isLogin">
        <div style="float:left; padding-top:12px; padding-right:10px; font-family: 'Nanum Pen Script', cursive; font-size:25px; ">
         <div class="text-center">
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-badge>
                <template v-slot:badge>{{ messages.length }}</template>
                <v-icon v-on="on">mail</v-icon>
              </v-badge>
            </template>
            <v-list>
              <div v-if="messages.length > 0">
                <v-list-item
                  v-for="message in messages"
                  :key="message.message_num"
                  @click=""
                >
                  <v-list-item-title>
                    {{ message.message_title }}
                    <br>
                    {{ message.message_content }}
                  </v-list-item-title>
                </v-list-item>
              </div>
              <div v-else>
                  <v-list-item-title>
                  새로운 메세지가 없습니다.
                  </v-list-item-title>
              </div>
            </v-list>
          </v-menu>
        </div>

          <!-- <div class="text-center">
            <v-badge>
              <template v-slot:badge>{{ messages.length }}</template>
              <v-icon v-if="!alert"
                  @click="alert = true">mail</v-icon>
            </v-badge>
              <span v-if="messages.length > 0">
                <div v-for="message in messages" :key="message.message_num">
                  <v-alert
                    v-model="alert"
                    dismissible
                    color="cyan"
                    border="left"
                    elevation="2"
                    colored-border
                    icon="mdi-twitter"
                    style="margin-top: 60px; z-index: 8"
                  >
                  <h3>{{ message.user_id }}</h3>
                   <strong>{{ message.message_title }}</strong> {{ message.message_content }}.
                  </v-alert>
                </div>
              </span>
              <span v-else>
                <div>
                  <v-alert
                    v-model="alert"
                    dismissible
                    color="cyan"
                    border="left"
                    elevation="2"
                    colored-border
                    icon="mdi-twitter"
                  >
                    새로운 메세지가 없습니다.
                  </v-alert>
                </div>
              </span>
          </div> -->
          <p>{{ userName }}님 환영합니다</p>
        </div>
        <v-btn flat class="outlined" @click="signout" v-on="" color="rgb(57, 117, 72)">Logout</v-btn>
    </v-flex>
    <v-flex v-else>
      <v-btn flat class="outlined" @click="" v-on="on" color="rgb(57, 117, 72)">Login</v-btn>
    </v-flex>
  </template>
  <v-card>
    <v-card-title>
      <span class="headline">LOGIN</span>
    </v-card-title>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap @keydown.enter="loginWithId">
          <v-flex xs12>
            <v-text-field label="Id*" required v-model="id" ref="id" :rules="idRules"></v-text-field>
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
      userName: '',
      isLogin: true,

      isLoading: false,
      isLoadingForSignout: false,
      idRules: [v => !!v || '아이디를 입력해 주세요.'],
      pwRules: [v => !!v || '비밀번호를 입력해 주세요.'],
      alert: false,
      messages: []
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
      this.userName = this.$session.get('userInfo').user_name
    }
  },
  mounted(){
    this.isLoading = false;
    this.messageCheck();
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
    messageCheck() {
      if (this.$session.has('userInfo')){
        var data = {
          id : this.$session.get('userInfo').user_num
        }
        this.$http.post(this.$store.state.testIp + '/another/checkNew', data)
        .then((response) => {
          console.log(response.body)
          this.messages = response.body
        })
        .catch((error) => {
          console.log(error)
        })
      }
    },
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
            if (res.data == "fail") {
              alert("아이디와 비밀번호를 확인해 주세요.");
              this.resetForm();
            } else {
              alert("로그인 되었습니다.")
              this.isLogin = true;
              this.$session.set("userInfo", res.data);
              console.log(this.$session.get('userInfo').user_num)
              this.userName = this.$session.get('userInfo').user_name
              this.closeDialog();
              this.$emit('loginstate');
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
      this.$emit('loginstate');
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
    height: 40px;
    width: 60px;
  }
</style>
