<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button fill="clear" color="dark" @click="gotoSlides">
            <ion-icon slot="start" :icon="chevronBackOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>Test</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :force-overscroll="true">
      <ion-grid :fixed="true">
        <ion-row class="ion-justify-content-start">
          <template v-for="(item, index) in us.state.indexMusic" :key="index">
            <ion-col
              class="musicCol"
              size="3"
              v-if="index"
              @click="clickMusic(item)"
            >
              <ion-label><img :src="imgStream(item.pic)" /></ion-label>
              <ion-label class="font12px whiteNowrap"
                >{{ item.mname }}
              </ion-label>
            </ion-col>
          </template>
        </ion-row>
      </ion-grid>
      <ion-infinite-scroll @ionInfinite="ionInfinite">
        <ion-infinite-scroll-content></ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { imgStream } from "@/api/imgRequest";
import {
  infoMusic,
  musicStream,
  indexMusic as im,
  typeMusic,
  titleMusic,
} from "@/api/musicRequest";
import { Music, Audio, MusicType } from "@/dom";
import { IonPage, IonButtons, IonBackButton, IonToolbar } from "@ionic/vue";
import { backspaceOutline, chevronBackOutline } from "ionicons/icons";
import { Pagination, Scrollbar } from "swiper";
import { defineComponent, onMounted } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "MoreMusic",
  components: {
    IonPage,
    IonButtons,
    IonToolbar,
  },
  setup() {
    let us = useStore();
    let modules = [Scrollbar, Pagination];
    // 获取音乐类型
    const getMusictitle = () => {
      titleMusic()
        .then((data) => {
          if (data.status == 200) {
            us.commit("setTypeTitle", data.data);
            // alert(JSON.stringify(typeTitle))
          }
        })
        .catch((err) => {
          console.log(err);
          alert(JSON.stringify(err));
        });
    };
    onMounted(() => {
      getMusictitle();
    });
    return {
      backspaceOutline,
      chevronBackOutline,
      us,
      imgStream,
      modules,
    };
  },
  methods: {
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
    },
    gotoSlides() {
      this.us.commit("setComponentName", "SlidesComponent");
    },

    async ionInfinite(ev: any) {
      this.us.commit("setIndexPage", this.us.state.indexPage++);
      let { status, data } = await im(this.us.state.indexPage);
      if (status == 200) {
        this.us.commit("putIndexMusic", data);
        setTimeout(() => ev.target.complete(), 500);
        console.log(this.us.state.indexMusic);
      }
    },
  },
});
</script>
<style scoped>
ion-content {
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
</style>