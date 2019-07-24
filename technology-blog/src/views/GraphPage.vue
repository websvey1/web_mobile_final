<template>
      <div class="network-graph" data-url="./gitlab-network-graph/.data/data.json" data-commit-url="https://lab.ssafy.com/dpwl7484/webmobile-sub2/commit/%s"
      style="width: 100%;"></div>
</template>

<script>
import LogService from '@/services/LogService'

export default {
	name: 'GraphPage',
  components:{

  },
  data() {
    return {

    }
  },
  mounted(){
    if (localStorage.getItem('reloaded')) {
        localStorage.removeItem('reloaded');
    } else {
        localStorage.setItem('reloaded', '1');
        location.reload();
    }

  },
	methods:{

	},
  created(){
    if(this.$store.state.userInfo.email != null){
      LogService.CreatedTime(this);
    }
  },
  beforeRouteLeave(to, from, next){
    if(this.$store.state.logInfo.user != null){
      LogService.DestroyedTime(this);
    }
    next();
  },
  destroyed(){

  }
}
</script>

<style scoped>
html, body {
  margin: 0px;
  padding: 0px;
  /* height: 100%; */
  position:relative;
}

  .network-graph {
    /* overflow-y: scroll; */
    overflow-x: hidden;
  }
  element.style {
    width: 1500px;
}


</style>
