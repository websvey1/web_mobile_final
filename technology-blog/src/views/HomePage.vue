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
