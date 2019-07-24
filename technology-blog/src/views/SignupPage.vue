<template>
    <v-layout wrap>
      <v-flex xs12 ma-5>
        <v-card>
                <v-card-title>
                  <span class="headline">SIGN UP</span>
                </v-card-title>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap my-5>
                      <v-flex xs12>
                        <v-text-field label="Name*" :rules="nameRules" v-model="name" required></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field label="Email*" :rules="emailRules" v-model="id" required></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field label="Password*" type="password" :rules="passRules" v-model="pw" required></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                  <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click="signup">SIGN UP</v-btn>
                </v-card-actions>
                <loading :active.sync="isLoading"
                :can-cancel="false"
                :is-full-page="true"></loading>
              </v-card>
      </v-flex>
      <Loading :isLoading="isLoading"/>

    </v-layout>
</template>

<script>
import LogService from '@/services/LogService'
import Loading from "@/components/Loading"
import FirebaseService from '@/services/FirebaseService'

export default {
	name: 'SignupPage',
  components:{
    Loading
  },
  data() {
    return {
      id: "",
      pw: "",
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

      isLoading:false
    }
  },
	methods: {
    async signup() {
      this.isLoading = true;
      var state = await FirebaseService.signup(this.id, this.pw, this.name)
      this.isLoading = false;
      if(state === true){
        alert("가입을 축하합니다.")
        this.$router.push("/")
      }
      else{
        var error = state.code
        if("auth/email-already-in-use" == error){
          alert("Email이 이미 사용 중입니다.")
          this.id = ""
        }
        else if("auth/invalid-email" == error){
          alert("잘못된 Email 형식입니다.")
          this.id = ""
        }
        else if("auth/weak-password" == error){
          alert("비밀번호가 너무 짧습니다.")
          this.pw = ""
        }
        else{
          alert(error)
          this.id=""
          this.pw=""
          this.name=""
        }
      }
    }
	},
  async created(){
    if(this.$store.state.userInfo.email != null){
      LogService.CreatedTime(this);
    }

    // var user = await FirebaseService.getUser();

    if(this.$store.state.userInfo != null){
      alert("잘못된 접근입니다.")
      this.$router.push("/")
    }
  },
  beforeRouteLeave(to, from, next){
    if(this.$store.state.logInfo.user != null){
      LogService.DestroyedTime(this);
    }
    next();
  },
  destroyed(){

  }
}

</script>
