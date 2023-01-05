<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title class="hand">
          <ion-icon
            :icon="chevronBackOutline"
            @click="gotoslides"
            class="logo back"
          ></ion-icon>
          <ion-searchbar
            enterkeyhint="search"
            type="search"
            value=""
            ref="search"
            placeholder="搜索音乐"
            mode="ios"
            @ionInput="inputName"
          >
          </ion-searchbar>
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :force-overscroll="true">
      <ion-list lines="none">
        <ion-item
          v-for="(result, index) in results"
          :key="index"
          @click="clickMusic(result)"
        >
          <ion-thumbnail slot="start">
            <img :src="imgStream(result.pic)" />
          </ion-thumbnail>
          <ion-label> {{ result.mname }}-{{ result.sname }} </ion-label>
        </ion-item>
      </ion-list>
      <ion-infinite-scroll @ionInfinite="ionInfinite">
        <ion-infinite-scroll-content></ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import { defineComponent, ref, computed, inject, onMounted } from "vue";
import { Components } from "@ionic/core/dist/types/components";
import { ellipse, musicalNotesSharp, chevronBackOutline } from "ionicons/icons";
import { searchMusic, infoMusic, musicStream } from "../api/musicRequest";
import { imgStream } from "../api/imgRequest";

import { List, Music, Audio } from "../dom";
import { useStore } from "vuex";
import {
  useBackButton,
  IonInput,
  IonSearchbar,
  onIonViewDidEnter,
} from "@ionic/vue";
export default defineComponent({
  ionViewDidEnter() {
    console.log("Home page did enter");
  },
  ionViewDidLeave() {
    console.log("Home page did leave");
  },
  ionViewWillEnter() {
    console.log("Home page will enter");
  },
  ionViewWillLeave() {
    console.log("Home page will leave");
  },
  name: "SearchMusic",
  components: {},
  setup(t, props) {
    let router = useRouter();
    let results: any = ref([]);
    let page = ref(1);
    let us = useStore();
    useBackButton(10, () => {
      us.commit("setComponentName", "SlidesComponent");
    });

    return { results, chevronBackOutline, router, page, us, imgStream };
  },
  mounted() {
    // this.setaa();
  },
  beforeUpdate() {
    //
  },
  methods: {
    impuSetFocus() {
      let search: any = this.$refs.search;
      let searchEl: any = search.$el;
      let timer = setInterval(() => {
        let inputEl = searchEl.querySelector("input");
        if (inputEl != null) {
          searchEl.setFocus();
          clearInterval(timer);
        }
      }, 500);
    },
    gotoslides() {
      this.us.commit("setComponentName", "SlidesComponent");
    },
    inputName() {
      console.log(this.results);
      this.results = [];
      this.page = 1;
      let timer = setTimeout(() => {
        this.searchName();
        clearTimeout(timer);
      }, 1000);
    },
    async searchName() {
      let search: any = this.$refs.search;
      let musicName: any = search.$el.value;
      let { status, data } = await searchMusic(musicName, this.page);
      if (status == 200) {
        this.results.push(...data);
        console.log(data);
      }
    },
    ionInfinite(ev: any) {
      this.page++;
      this.searchName();
      setTimeout(() => ev.target.complete(), 500);
    },
    async clickMusic(music: Music) {
      let { status, data } = await infoMusic(music.id);
      if (status == 200) {
        console.log(data);
        let audio: Audio = {
          url: musicStream(data.mp3),
          name: music.mname,
          artist: music.sname,
          cover: imgStream(data.pic),
          lrc: data.lrc.replaceAll("种子音乐 网址 zz123.com", ""),
        };
        this.us.dispatch("musicPlay", audio);
      }
      //
    },
  },
});
</script>
<style scoped>
.logo {
  width: 10%;
  position: absolute;
  left: 2%;
}

.back {
  transform: translateY(10px);
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

.hand {
  display: flex;
  position: relative;
  padding: 0;
  transform: translateY(-21px);
}
</style>