<template>
  <ion-app>
    <ion-router-outlet />
    <APlayer class="aplayer"></APlayer>
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import APlayer from './components/APlayer.vue';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    APlayer
  }
});
</script>
<style scoped>

</style>