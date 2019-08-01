<template>
<div>
 hehehe

 <v-btn>돌아가기</v-btn>
</div>
</template>

<script>
export default {
    name: 'TeamProjectWritePage',
    components: {

    },
    data(){
        return{

        }
    },
    mounted(){
        console.log(this.$route.params.id)
    },
    methods:{

    }
}
</script>

<style>

</style>