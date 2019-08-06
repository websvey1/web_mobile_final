<template>
<div class="body">
  <v-img height="100%" width="auto" src="https://blog.newrelic.com/wp-content/uploads/good-programmer-banner-final.jpg">
      <div style="color:white; font-size:40px;padding:5% 5%;" > 어쩌구저쩌구~~ 하는 플랫폼을 제공합니다.<br/>
        여러분도 자유롭게 이용하세요!<br/>
        준호씨가 번역해주세요....plz....
      </div>
  </v-img>
    <div class="container">
        <div class="website">
            <div class="main-page" style="position:relative; z-index:2;">

                <PostList></PostList>
            </div>
        </div>
    </div>
</div>
</template>


<script>
import PostList from '@/components/post/PostList'
import Weather from '@/components/WeatherInfo'

export default {
    name: 'HomePage',
    components: {
        PostList,
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

    },
    mounted(){

    },
    beforeRouteLeave(to, from, next){
      next();
    },
    methods: {

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
