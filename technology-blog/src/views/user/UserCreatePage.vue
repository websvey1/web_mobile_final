<template>
<v-layout wrap>
  <v-flex xs12 ma-5>
    <v-card>
      <v-card-title>
        <span class="headline">회원가입</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap my-5>
            <v-flex xs12>
              <v-text-field label="이름*" :rules="nameRules" v-model="user.name" ref="name" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="ID*" :rules="idRules" v-model="user.id" ref="id" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Email*" :rules="emailRules" v-model="user.email" ref="email" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="비밀번호*" type="password" :rules="passRules" v-model="user.password" ref="password" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-autocomplete v-model="favor" :items="techs" filled chips color="blue-grey lighten-2" label="관심기술(최대 3개)" item-text="tech_name" item-value="tech_num" multiple>
                  <template v-slot:item="data">
                      <template v-if="typeof data.item !== 'object'">
                        <span v-text="data.item"></span>
                      </template>
                      <template v-else>
                        <span v-text="data.item.tech_name"></span>
                      </template>
                  </template>
              </v-autocomplete>
            </v-flex>
          </v-layout>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="resetForm">RESET</v-btn>
        <v-btn color="blue darken-1" flat @click="signup">SIGN UP</v-btn>
      </v-card-actions>
      <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="true"></loading>
    </v-card>
  </v-flex>
  <Loading :isLoading="isLoading" />

</v-layout>
</template>

<script>
import Loading from "@/components/common/Loading"

export default {
  name: 'UserCreatePage',
  components: {
    Loading
  },
  data() {
    return {
      favor:[],
      techs: [],
      user: {
        id: "",
        password: "",
        email: "",
        name: "",
        isUpdating: false,
      },
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters'
      ],
      idRules: [
        v => !!v || 'ID is required',
        v => v.length <= 10 || 'ID must be less than 10 characters'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      passRules: [
        v => !!v || 'Password is required',
        v => v.length >= 6 || 'Password must be longer than 6 characters'
      ],
      isLoading: false,
      validation: false
    }
  },
  computed: {
      form () {
        return {
          id: this.user.id,
          password: this.user.password,
          email: this.user.email,
          name: this.user.name,
          favor: this.favor
        }
      },
    },
  methods: {
    checkValidation(){
      Object.keys(this.form).forEach(f => {
          if(this.$refs[f] != undefined && this.$refs[f].validate(true) == false){
            return false;
          }
      })

      return true;
    },

    resetForm(){
      Object.keys(this.form).forEach(f => {
        if(this.$refs[f] != undefined){
          this.$refs[f].reset();
        }
      })
    },

    async signup() {
      if(this.checkValidation()){
        this.isLoading = true;
        var form = this.form;
        /////////////////////////////////////////////////////
        if(form.favor.length > 3){
          alert("관심기술은 3개까지 등록할 수 있습니다.")
          this.isLoading = false;
          return
        }
        /////////////////////////////////////////////////////
        await this.$http.post("http://192.168.31.65:3000/user/create", form)
        .then((req) => {
          if(req.data == "Success"){
            alert("가입 성공")
          }
          else{
            alert("가입 실패")
            this.resetForm();
          }
          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error);
          alert("ERROR")
          this.isLoading = false;
          this.resetForm();
        })
      }
    },
  },
  async created() {
    await this.$http.get("http://192.168.31.65:3000/user/tech")
    .then((req) => {
      this.techs = req.data;
    })
  },

  mounted(){

  },

  beforeRouteLeave(to, from, next) {
    next();
  },
  destroyed() {

  }
}
</script>
