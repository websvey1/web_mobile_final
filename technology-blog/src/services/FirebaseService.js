import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'
import router from '@/router'
import {
  store
} from '@/store'
import translate from '@/services/TranslateService'

const TEXT = 'text'

var firebaseConfig = {
  apiKey: "AIzaSyDdXAXSBfUzZ6ZubYxYKVd8f54TGZZy67s",
  authDomain: "webmobile-sub2.firebaseapp.com",
  databaseURL: "https://webmobile-sub2.firebaseio.com",
  projectId: "webmobile-sub2",
  storageBucket: "gs://webmobile-sub2.appspot.com",
  messagingSenderId: "801110171470",
  appId: "1:801110171470:web:2b1c84970fd95689"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();
var fb_provider = new firebase.auth.FacebookAuthProvider();
fb_provider.setCustomParameters({
  'display': 'popup'
});
var gg_provider = new firebase.auth.GoogleAuthProvider();
gg_provider.setCustomParameters({
  'display': 'popup'
});

database.ref("/").on("child_changed", function(snap) {
  var newTextRef = database.ref("post")
  return newTextRef.once('value')
    .then(async function(snap) {
      var array = []
      var data = snap.toJSON()

      for (var i in data) {
        array.push(data[i])
      }

      array.reverse()
      store.state.posts = array
      translate.translate()
    })
    .catch((error) => {
      console.log(error);
    })
});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    store.state.userInfo = user;
  } else {
    store.state.userInfo = null;
  }
});

export default {
  facebookLogin() {
    return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(function() {
        return firebase.auth().signInWithPopup(fb_provider).then(function(user) {
          return user.user;
        }).catch(function(error) {
          return false;
        });
      }).catch(function(error) {
        return false;
      });
  },

  googleLogin() {
    return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(function() {
        return firebase.auth().signInWithPopup(gg_provider).then(function(user) {
          return user.user;
        }).catch(function(error) {
          return false;
        });
      }).catch(function(error) {
        return false;
      });
  },

  normalLogin(id, pw) {
    return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(function() {
        return firebase.auth().signInWithEmailAndPassword(id, pw)
          .then((user) => {
            return true
          })
          .catch((error) => {
            return error
          });
      })
      .catch(function(error) {
        return error;
      });
  },

  async signup(id, pw, name) {
    return await firebase.auth().createUserWithEmailAndPassword(id, pw)
      .then((user) => {
        return user.user.updateProfile({
          displayName: name
        }).then(function() {
          return true
        }).catch(function(error) {
          return error
        });
      })
      .catch((error) => {
        return error
      })
  },

  async signout() {
    return await firebase.auth().signOut().then(function() {
      return true
    }).catch(function(error) {
      return error
    });
  },

  async writePost(post) {
    var key = await this.getPostNumber() * 1 + 1;
    this.setPostNumber(key)
    var postRef = database.ref("post/" + key)
    return await postRef.set({
        "key": key,
        "imageUrl": post.imageUrl,
        "title": post.title,
        "writer": post.writer,
        "content": post.content,
        "wdate": post.wdate,
        "tags": post.tags,
        "visibility": post.visibility,
        "email": post.email
      })
      .then(async function(snap) {
        return true
      })
      .catch((error) => {
        return error.code
      })
  },

  readPosts() {
    var newTextRef = database.ref("post")
    return newTextRef.once('value')
      .then(async function(snap) {
        var array = []
        var data = snap.toJSON()

        for (var i in data) {
          array.push(data[i])
        }

        array.reverse()
        store.state.posts = array
        translate.translate()
      })
      .catch((error) => {
        console.log(error);
      })
  },

  readPost(key) {
    var newTextRef = database.ref("post/" + key)
    return newTextRef.once('value')
      .then(function(snap) {
        return snap.toJSON()
      })
      .catch((error) => {
        console.log(error);
        return null
      })
  },

  async updatePost(key, post) {
    var postRef = database.ref("post/" + key)

    return await postRef.update(post)
      .then(function(snap) {
        return true
      })
      .catch(function(error) {
        return error
      })
  },

  async removePost(key) {
    var postRef = database.ref("post/" + key);

    try {
      await postRef.remove();
    } catch (e) {
      console.log(e);
      return e
    }

    return true;
  },

  async getPostNumber() {
    return await database.ref("postsNum").once('value')
      .then(async function(snap) {
        console.log(snap);
        console.log("게시글 번호" + snap.val());
        return snap.val()
      })
      .catch((error) => {
        console.log(error);
        return null
      })
  },

  setPostNumber(num) {
    database.ref("/").update({
      "postsNum": num
    })
  },

  async getUser() {
    var user = await firebase.auth().currentUser;
    // console.log(user);
    store.state.userInfo = user;
    return user;
  },

  async resigninUser(pw) {
    var user = firebase.auth().currentUser;
    var credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        pw
    );

    return await user.reauthenticateWithCredential(credential).then(function() {
      return true;
    }).catch(function(error) {
      return error
    });
  },
  async updateUser(before_pw, after_pw) {
    var user = firebase.auth().currentUser;

    var state = await this.resigninUser(before_pw);

    if (state === true) {
      return await user.updatePassword(after_pw).then(function() {
        return true;
      }).catch(function(error) {
        console.log(error);
        return error
      });
    } else {
      return state;
    }
  },

  async removeUser(pw) {
    var user = firebase.auth().currentUser;

    var state = await this.resigninUser(pw);

    if (state === true) {
      return await user.delete().then(function() {
        return true;
      }).catch(function(error) {
        return error;
      });

    } else {
      return state
    }
  }

}
