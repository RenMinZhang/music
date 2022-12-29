<template>
  <div class="player_full">

  </div>
  <ion-page class="content"></ion-page>
</template>
<script lang="ts">

import { defineComponent, ref, onMounted, getCurrentInstance, ComponentInternalInstance } from 'vue';
export default defineComponent({
  name: 'PlayerFull-',
  components: {

  },

  computed: {


  },
  setup() {
    // 
    return {}
  }, methods: {



  }

})
</script>


<style scope>
.player_full {
  width: 100%;
  height: 100%;
  position: absolute;
  text-align: center;
  color: white;
  background: transparent url(../assets/snowman.png) center center no-repeat;
  filter: blur(8px);
  background-size: cover;

}
</style>
