import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'
import store from '@/store'
import '@firebase/firestore'

export default {
  CreatedTime(page) {
      var date = new Date();
      var time = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

      console.log("created >> " + page.$router.currentRoute.name + ":" +time);
      page.$store.state.logInfo.user = firebase.auth().currentUser.email;
      page.$store.state.logInfo.page = page.$router.currentRoute.name;
      page.$store.state.logInfo.enterTime = time;
  },
  DestroyedTime(page){
      var date = new Date();
      var time = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

      console.log("destroyed >> " + page.$router.currentRoute.name + ":" +time);

      var log = {
        user: page.$store.state.logInfo.user,
        page: page.$store.state.logInfo.page,
        enterTime: page.$store.state.logInfo.enterTime,
        exitTime: time
      }

      console.log("^^^^^^^^^^^^",log);
      firebase.firestore().collection("logData").add(log);
  }
}
