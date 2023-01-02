<!-- eslint-disable no-undef -->
<template>
  <div id="box">
    <div id="aplyer"></div>
    <ion-modal
      @didDismiss="musicLIstIsShow = false"
      id="example-modal"
      :is-open="musicLIstIsShow"
      ref="modal"
      initial-breakpoint="0.5"
    >
      <ion-content class="wrapper">
        <ion-list lines="none">
          <ion-item
            v-for="(item, index) in us.state.aPlayer.audios"
            :key="index"
            :button="true"
            :detail="false"
            @click="us.dispatch('musicPlay', item)"
            :class="{
              colorBlue: us.state.aPlayer.currentMusic === item.url,
            }"
          >
            <ion-label>{{ item.name }} - {{ item.artist }}</ion-label>
          </ion-item>
        </ion-list>
        <ion-infinite-scroll @ionInfinite="ionInfinite">
          <!-- <ion-infinite-scroll-content></ion-infinite-scroll-content> -->
        </ion-infinite-scroll>
      </ion-content>
    </ion-modal>
  </div>
</template>

<script lang="ts">
import {
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonList,
  IonModal,
  IonContent,
  IonGrid,
  IonRow,
  onIonViewWillEnter,
  IonItem,
  IonLabel,
  IonInput,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSlides,
  IonSlide,
  IonSearchbar,
} from "@ionic/vue";
import {
  searchCircle,
  alarmOutline,
  chevronForwardOutline,
  personCircle,
} from "ionicons/icons";
import { defineComponent, reactive, onMounted, ref } from "vue";

import { MusicType, Music, Audio, MusicInfo, List, APlayerApi } from "../dom";
import APlayer from "aplayer";
import { useStore, mapState } from "vuex";
export default defineComponent({
  name: "APlay",
  components: {
    IonModal,
    IonList,
    IonItem,
    IonContent,
    IonInfiniteScroll,
    // IonInfiniteScrollContent,
  },
  computed: {},
  setup() {
    let us = useStore();
    let audios: Array<Audio> = reactive([]);
    let ap = ref<null | APlayerApi>(null);
    let musicLIstIsShow = ref(false);
    let colorBlue = ref("colorBlue");
    const showList = async () => {
      const ele = document.querySelector(".aplayer-list") as HTMLDivElement;
      ele.style.display = "none";
      musicLIstIsShow.value = true;
    };
    let currentMusic = ref("");
    const ionInfinite = (ev: any) => {
      ev.target.complete();
    };
    return {
      ap,
      showList,
      personCircle,
      ionInfinite,
      musicLIstIsShow,
      audios,
      colorBlue,
      currentMusic,
      us,
    };
  },
  mounted() {
    this.ap = new APlayer({
      container: document.getElementById("aplyer"),
      order: "random",
      listFolded: true,
      lrcType: 2,
      fixed: false,
    }) as APlayerApi;
    let us = useStore();
    us.commit("setAp", this.ap);
    console.log(us, 123);
    this.ap.on("listshow", (a, b) => {
      this.showList();
    });
    this.ap.on("listhide", (a, b) => {
      this.showList();
    });
  },
  methods: {
    musicPlay(audio: Audio) {
      let index = this.musicListAdd(audio);
      if (index == -1) {
        this.ap?.audio
          .play()
          .then((value) =>
            this.ap?.list.switch(this.ap?.list.audios.length - 1)
          )
          .catch((err) => console.log(err));
      } else {
        if (this.ap?.audio.src == audio.url) {
          return;
        }
        this.ap?.audio
          .play()
          .then((value) => this.ap?.list.switch(index))
          .catch(
            (err) => console.log(err)
            // alert(JSON.stringify(err))
          );
      }
      this.currentMusic = audio.url;
    },
    musicListAdd(audio: Audio): number {
      let index = this.ap?.list.audios.findIndex(
        (item) => item.name == audio.name
      ) as number;
      if (index == -1) {
        this.audios.push(audio);
        this.ap?.list.add(audio);
      }
      return index;
    },
  },
});
</script>

<style scoped>
.aplayer .aplayer-withlist .aplayer-list {
  display: none !important;
}

ion-modal#example-modal {
  --width: fit-content;
  --min-width: 90%;
  --border-radius: 6px;
  --box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
  --max-height: 50%;
}

ion-modal#example-modal h1 {
  margin: 20px 20px 10px 20px;
}

ion-modal#example-modal .wrapper {
  margin-bottom: 10px;
  --max-height: 50%;
}
#box,
#aplyer {
  margin: 0;
}
#box {
  background: #f7f7f7;
}
</style>

