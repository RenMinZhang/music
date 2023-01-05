<template>
  <ion-page>
    <ion-content>
      <ion-slides mode="ios">
        <ion-slide>
          <music-index></music-index>
        </ion-slide>
        <ion-slide>
          <div>{{ prop }}</div>
        </ion-slide>
        <ion-slide>2</ion-slide>
        <ion-slide>3</ion-slide>
      </ion-slides>
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import MusicIndex from "../views/MusicIndex.vue";
export default defineComponent({
  name: "SlidesComponent",
  setup(prop) {
    return { prop };
  },
  components: {
    MusicIndex,
  },
});
</script>
<style scoped>
</style>