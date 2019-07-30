<template>
<div class="body" style="padding-top: 50px;">
    <div class="container">
        <div class="website">
            <div class="main-page" style="position:relative; z-index:2;">
                <PostList></PostList>
                  <PostList></PostList>
                    <PostList></PostList>
                    <PostList></PostList>
            </div>
        </div>
    </div>
</div>
</template>


<script>
import FirebaseService from '@/services/FirebaseService'
import PostList from '@/components/PostList'
import LoginHome from "@/components/LoginHome"
import Weather from '@/components/WeatherInfo'
import LogService from '@/services/LogService'


export default {
    name: 'HomePage',
    components: {
        PostList,
        LoginHome,
        Weather,
    },
    data() {
        return {
            drawer: null,
            items: [{
                title: 'Home',
                icon: 'home',
                link: '/'
            },
            {
                title: 'Project',
                icon: 'widgets',
                link: '/project'
            }
            ]
        }
    },
    created(){
        if(this.$store.state.userInfo != null){
          LogService.CreatedTime(this);
        }
    },
    beforeRouteLeave(to, from, next){
      if(this.$store.state.logInfo){
        LogService.DestroyedTime(this);
      }
      next();
    },
    methods: {
        trans(){
            this.$store.state.isTrans = !this.$store.state.isTrans;
        }
    },
}
</script>

<style scoped>
    #SSAFY {
    font-family: 'Lato', sans-serif;
    font-size: 60px;
    color:rgb(63, 63, 63)
    }
</style>
