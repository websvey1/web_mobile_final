<template>
<div class="body">
  <v-img height="100%" width="auto" src="https://advancedtech.airliquide.com/sites/abt_at/files/styles/web_page_cover/public/2016/10/05/banner_space_1366x520px.jpg?itok=_28TaB8h"></v-img>
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
