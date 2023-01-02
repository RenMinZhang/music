<!-- eslint-disable no-undef -->
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title class="hand">
          <img class="logo" src="../assets/snowman.png" />
          <ion-item href vv="/home/searchMusic">
            <ion-searchbar
              value=""
              ref="search"
              placeholder="搜索音乐"
              mode="ios"
            ></ion-searchbar>
          </ion-item>
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-page>
        <ion-router-outlet></ion-router-outlet>
      </ion-page>
    </ion-content>
    <ion-footer>
      <a-player
        v-if="!uk.isOpen.value"
        class="aplayer"
        ref="aplayer"
      ></a-player>
      <ion-tabs>
        <ion-tab-bar>
          <ion-tab-button
            :class="currentIndex == 0 ? 'colorBlue' : ''"
            @click="currentChange(0)"
          >
            <ion-icon :icon="musicalNotesSharp" />
            <ion-label>Tab 1</ion-label>
          </ion-tab-button>
          <ion-tab-button
            @click="currentChange(1)"
            :class="currentIndex == 1 ? 'colorBlue' : ''"
          >
            <ion-icon :icon="ellipse" />
            <ion-label>Tab 2</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs>
    </ion-footer>
  </ion-page>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import {
  IonContent,
  IonSpinner,
  IonGrid,
  IonCol,
  IonRow,
  IonIcon,
  onIonViewWillEnter,
  IonItem,
  IonLabel,
  IonInput,
  IonHeader,
  IonPage,
  IonTabBar,
  IonTabButton,
  IonFooter,
  IonSearchbar,
  useIonRouter,
  createAnimation,
} from "@ionic/vue";

import { Swiper, SwiperSlide } from "swiper/vue";
import MusicIndex from "@/views/MusicIndex.vue";
import SearchMusic from "@/views/SearchMusic.vue";
import { defineComponent, ref, onMounted, provide } from "vue";
import { ellipse, musicalNotesSharp, chevronBackOutline } from "ionicons/icons";
import request, { RequestObg } from "../api";
import APlayer from "../components/APlayer.vue";
import { MusicType, Music, Audio, MusicInfo, List } from "../dom";
import { Components } from "@ionic/core/dist/types/components";
import { useKeyboard } from "@ionic/vue";
export default defineComponent({
  props: {
    name: {
      type: String,
    },
  },
  name: "HomePage",
  components: {
    IonContent,
    IonPage,
    APlayer,
    IonTabButton,
    IonTabBar,
    IonLabel,
    IonIcon,
    IonFooter,
    IonSearchbar,
  },
  watch: {
    "router.currentRoute.value.fullPath": {
      handler(newValue, oldValue) {
        this.currentPath = newValue;
      },
      deep: true,
    },
  },
  setup() {
    let currentIndex = ref(0);
    let searchName = ref("");
    let uk = useKeyboard();
    onMounted(() => {
      //
    });
    const router = useRouter();
    let currentPath = ref(router.currentRoute.value.fullPath);
    return {
      musicalNotesSharp,
      ellipse,
      router,
      currentIndex,
      currentPath,
      searchName,
      chevronBackOutline,
      uk,
    };
  },
  mounted() {
    let aplayer: any = this.$refs.aplayer as any;
    let a = aplayer.$el.querySelector(".aplayer-info") as HTMLElement;
    // a.addEventListener("click", this.goToPlayFull)
  },
  methods: {
    searchMusic() {
      // let searchName: Components.IonSearchbar = this.$refs.search as Components.IonSearchbar;
      // this.searchName = searchName.value as string;
    },
    clickMusic(audio: Audio) {
      let aplayer: any = this.$refs.aplayer;
      aplayer.musicPlay(audio);
    },
    currentChange(index: number) {
      this.currentIndex = index;
    },
    goToPlayFull() {
      console.log("goToPlayFull");
      this.router.push("/playerFull");
    },
    gotoSearchPage() {
      this.router.push("/home/searchMusic");
      console.log(this.router.currentRoute.value.fullPath);
    },
  },
});
</script>

<style scoped>
.back {
  transform: translateY(10px);
}

ion-icon {
  transform: translateY(3px);
}

.musicCol img {
  width: 100%;
  filter: none;
  transform: translateY(0);
}

ion-col {
  display: flex;
  flex-direction: column;
  font-size: 20px;
  justify-content: space-around;
  text-align: center;
}

ion-col img {
  width: 40%;
  /* filter: drop-shadow(40px 0px yellow); */
  /* transform: translateY(-50px);
  filter: drop-shadow(#66ccff 0 50px); */
}

ion-row {
  display: flex;
  flex-wrap: inherit;
  overflow-y: scroll;
}

ion-label ion-icon {
  font-size: 30px;
}

.hand {
  display: flex;
  position: relative;
  padding: 0;
}
ion-button {
  width: 100%;
}
ion-searchbar {
  width: 80%;
  position: absolute;
  /* top: -50%; */
  padding: 0;
  margin: 0;
  left: 15%;
  transform: translateY(-10%);
  /* --border-radius: 8 */
}

.logo {
  width: 10%;
  position: absolute;
  left: 2%;
}
ion-footer {
  /* position: fixed; */
  bottom: 0;
}
</style>
