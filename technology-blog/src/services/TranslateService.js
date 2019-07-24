import {store} from '@/store'

export default {
  translate(){
    var googleTranslate = require('google-translate')('AIzaSyA_ZyJh1L8ySgp87Al34TEgxZpEp5IFTF0');
    var data = store.state.posts;

    var trans_posts = []
    for(var i in data){
      trans_posts[i] = {
        "key":data[i]["key"],
        "title":"",
        "writer":"",
        "content":"",
        "imageUrl":data[i]["imageUrl"],
        "wdate": data[i]["wdate"],
        "tags": data[i]["tags"],
        "visibility": data[i]["visibility"],
        "email":data[i]["email"]
      }
    }

    for(var i in data){
      var arr = [data[i]["title"], data[i]["writer"], data[i]["content"]]
      this.saveTranslate(i, arr, googleTranslate, trans_posts);
    }
  },

  translate(post){
    var googleTranslate = require('google-translate')('AIzaSyA_ZyJh1L8ySgp87Al34TEgxZpEp5IFTF0');

    var trans_posts = {
      "key":post["key"],
      "title":"",
      "writer":"",
      "content":"",
      "imageUrl":post["imageUrl"],
      "wdate": post["wdate"],
      "tags": post["tags"],
      "visibility": post["visibility"],
      "email":post["email"]
    };

    for(var i in data){
      var arr = [data[i]["title"], data[i]["writer"], data[i]["content"]]
      this.saveTranslate(i, arr, googleTranslate, trans_posts);
    }
  },

  saveTranslate(i, arr, googleTranslate, trans_posts){
    googleTranslate.translate(arr, 'en', function(err, translation) {
      trans_posts[i]["title"] = translation[0]["translatedText"];
      trans_posts[i]["writer"] = translation[1]["translatedText"];
      trans_posts[i]["content"] = translation[2]["translatedText"];
      if(i == store.state.posts.length - 1){
        store.state.trans_posts = trans_posts;
      }
    });
  }
}
