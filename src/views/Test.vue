<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          <button @click="c">c</button>
          <br />
          <button @click="b">b</button>
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <keep-alive> <component :is="a"></component> </keep-alive>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import MusicIndex from "../views/MusicIndex.vue";
import { defineComponent, ref } from "vue";
import {
  IonIcon,
  IonLabel,
  IonPage,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonSlides,
  IonSlide,
  IonContent,
} from "@ionic/vue";
import { calendar, personCircle } from "ionicons/icons";
import { Swiper, SwiperSlide } from "swiper/vue";
import SearchMusic from "./SearchMusic.vue";
import "swiper/css";
import "@ionic/vue/css/ionic-swiper.css";
export default defineComponent({
  name: "TEst",
  components: {
    IonPage,
    IonContent,
    SearchMusic,
    MusicIndex,
  },
  methods: {},
  setup() {
    let a = ref<string>("MusicIndex");
    let c = () => {
      a.value = "SearchMusic";
    };
    let b = () => {
      a.value = "MusicIndex";
    };
    return {
      calendar,
      personCircle,
      c,
      a,
      b,
    };
  },
});
</script>

<style scoped>
.tt {
  /* --offset-bottom: 100% !important; */
  min-height: 100vh;
  height: 100%;
}
</style>