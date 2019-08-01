<template>
</template>

<script>
export default {
    name: "AnotherUser",
    data() {
        return {
            users:[]
        }
    },
    mounted() {
        this.onUser();
    },
    methods: {
        async onUser() {
            await this.$http.post('http://192.168.31.61:3000/another/getUsers')
            .then(async (response) => {
                for (var i=0; i < response.body.length; i++){
                    var data = {
                        userNum: response.body[i].user_num
                    }
                    await this.$http.post('http://192.168.31.61:3000/another/getInfo', data)
                    .then(async (response) => {
                        console.log(response.body);
                        var tech = response.body;
                        this.users.push(tech)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                }
            })
            .catch((error) => {
                console.log(error)
            })
        },
    }
}
</script>
<style>

</style>

