<template>
    <div style="background-color: white;">
        <div class="container">
            <!-- Login 시, 각 user의 name에 따라 ~~님의 팀으로 되도록 바꾸어 주어야 함! -->
            <h1 class="teamName" style="margin-left: 3em">영신님의 팀</h1>
            
            <v-btn class="teamBtn" @click="showModal = true" outline color="indigo" style="float: right; margin-right: 5em" round>Team 추가</v-btn>

            <v-dialog v-model="showModal" persistent max-width="600px">
                <v-card>
                    <v-card-title>
                        <span class="headline">Team 추가하기</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-xl>
                            <v-layout wrap>
                                <v-flex xs12>
                                    <v-text-field label="Team Name *" v-model="teamName" ref="teamName" :rules="teamRules" required></v-text-field>
                                </v-flex>
                                <!--
                                <v-flex xs12>
                                    <v-autocomplete label="Member *" :items="members" ref="member" :rules="memberRules" required></v-autocomplete>
                                </v-flex>
                                -->
                                <!--
                                    <v-text-field label="Member *" required v-model="member" ref="member" :rules="memberRules"></v-text-field>
                                -->

                                <v-flex xs12>
                                <!--
                                    <v-autocomplete v-model="friends" :disabled="isUpdating" :items="people" filled chips 
                                        color="blue-grey lighten-2" label="Select *" item-text="name" item-value="name" multiple>
                                    
                                        <template v-slot:selection="data">
                                            <v-chip v-bind="data.attrs" :input-value="data.selected" close
                                                @click="data.select" @click:close="remove(data.item)">
                                                    {{ data.item.name }}
                                            </v-chip>
                                        </template>

                                        <template v-slot:item="data">
                                            <template v-if="typeof data.item !== 'object'">
                                                <v-list-item-content v-text="data.item"></v-list-item-content>
                                            </template>
                                            <template v-else>
                                                <v-list-item-content>
                                                    <v-list-item-title v-html="data.item.name"></v-list-item-title>
                                                    <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle>
                                                </v-list-item-content>
                                            </template>
                                        </template>
                                    </v-autocomplete>
                                    -->
                                    <v-autocomplete
                                        v-model="friends"
                                        :disabled="isUpdating"
                                        :items="people"
                                        filled
                                        chips
                                        color="blue-grey lighten-2"
                                        label="Member *"
                                        item-text="name"
                                        item-value="name"
                                        :rules="memberRules"
                                        multiple
                                        >
                                           <template v-slot:item="data">
                                            <template v-if="typeof data.item !== 'object'">
                                                <v-list-item-content v-text="data.item"></v-list-item-content>
                                            </template>
                                            <template v-else>
                                                <v-list-item-content>
                                                    <v-list-item-title v-html="data.item.name"></v-list-item-title>
                                                    &nbsp;&nbsp;&nbsp;&nbsp;(
                                                    <v-list-item-subtitle v-html="data.item.id"></v-list-item-subtitle>
                                                    )
                                                </v-list-item-content>
                                            </template>
                                        </template>
                                    </v-autocomplete>
                                </v-flex>
                                
                            </v-layout>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click="addTeam">Add</v-btn>
                        <v-btn color="blue darken-1" flat @click="showModal = false">CANCEL</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <!-- 이 밑에 div로 새로 파서, 지금 user가 속해있는 팀 list 뿌려줘야 함 -->
        </div>
    </div>
</template>

<script>

export default {
    name: 'TeamChoose',
    data() {
        return{
            showModal: false,
            isUpdating: false,
            teamRules: [v => !!v || 'Team Name을 입력해 주세요.'],
            memberRules: [v => !!v || 'Member를 입력해 주세요.'],
            friends: [],
            people: [],
        }
    },
    mounted(){
        // 1st. DB에 가서, 존재하는 모든 Name 가져오기
        this.$http.post('http://192.168.31.63:3000/getUser')
        .then((response) => {
            var items = response.body;
            // console.log(items)
            for(var i = 0; i < items.length; i++){
                this.people.push({name: items[i].user_name, id: items[i].user_id});
            }
        // console.log(this.events)
        })
        .catch((error) =>{
        // console.log(error)
        })
    },
    methods:{
        addTeam(){
            // 1st. DB에 가서, Team Name 중복되는 지 확인하기
        },
        remove (item) {
            const index = this.friends.indexOf(item.name)
            if (index >= 0) this.friends.splice(index, 1)
        },
    }

}
</script>

<style>
.teamName{
    display: inline-block;
},
.teamBtn{
    display: inline-block;
}
</style>