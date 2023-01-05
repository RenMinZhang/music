<template>
  <ion-content :scroll-y="false">
    <ion-slides mode="ios" :pager="true" :options="slideOpts">
      <ion-slide><img src="../assets/snowman.png" /></ion-slide>
      <ion-slide><img src="" />1</ion-slide>
      <ion-slide><img src="" />2</ion-slide>
      <ion-slide><img src="" />3</ion-slide>
    </ion-slides>
    <swiper
      :slidesPerView="5"
      :modules="modules"
      :scrollbar="{
        hide: true,
      }"
    >
      <swiper-slide v-for="(item, index) in us.state.typeTitle" :key="index">
        <ion-col
          size="10"
          @click="getTypeMusic(item, index)"
          :class="currentMusicType == item.titleId ? 'colorBlue' : ''"
        >
          <ion-label
            ><img :src="require(`../assets/${item.titleId}.png`)"
          /></ion-label>
          <ion-label class="font12px">{{ item.titleName }} </ion-label>
        </ion-col>
      </swiper-slide>
    </swiper>

    <ion-item detail-icon="chevronForwardOutline" @click="gotoMoreMusic">
      <h5 class="font15px">
        更多歌曲
        <ion-icon :icon="chevronForwardOutline"></ion-icon>
      </h5>
    </ion-item>
    <ion-grid :fixed="true">
      <ion-row class="ion-justify-content-start">
        <template v-for="(item, index) in us.state.indexMusic" :key="index">
          <ion-col
            class="musicCol"
            size="3"
            v-if="index < 12"
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
  </ion-content>
</template>

<script lang="ts">
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
  IonTitle,
  IonToolbar,
  IonSlides,
  IonSlide,
  IonSearchbar,
} from "@ionic/vue";
import {
  defineComponent,
  ref,
  onMounted,
  getCurrentInstance,
  ComponentInternalInstance,
  inject,
  reactive,
} from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Swiper as SwiperClass } from "swiper/types";

import {
  searchCircle,
  alarmOutline,
  chevronForwardOutline,
} from "ionicons/icons";
import {
  titleMusic,
  indexMusic as im,
  infoMusic,
  musicStream,
  typeMusic,
} from "../api/musicRequest";
import { MusicType, Music, Audio, MusicInfo, List } from "../dom";
import { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from "swiper";
import { imgStream } from "@/api/imgRequest";
import { RequestObg } from "@/api";
import { createStore, useStore } from "vuex";

export default defineComponent({
  name: "MusicIndex",
  components: {
    IonItem,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonContent,
    IonLabel,
    IonSlides,
    IonSlide,
    Swiper,
    SwiperSlide,
    // APlayer,
  },
  setup() {
    let us = useStore();
    let modules = [Scrollbar, Pagination];
    let slideOpts = {
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      loop: true,
      navigation: true,
      centeredSlides: true,
      swiper: { height: 20 },
    };
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

    // 获取音乐主页音乐歌曲
    const getMusicIndex = () => {
      im()
        .then((data) => {
          if (data.status == 200) {
            us.state.indexMusic = data.data;
          }
        })
        .catch((err) => {
          alert(err);
        });
    };
    let currentMusicType = ref("");

    onMounted(() => {
      getMusicIndex();
      getMusictitle();
    });

    return {
      slideOpts,
      searchCircle,
      alarmOutline,
      chevronForwardOutline,
      getMusictitle,
      getMusicIndex,
      currentMusicType,
      Scrollbar,
      modules,
      us,
      imgStream,
    };
  },
  mounted() {
    // this.getMusictitle();
  },
  methods: {
    clickMusic(item: Music) {
      infoMusic(item.id)
        .then((data) => {
          let audio: Audio = {
            url: musicStream(item.mp3),
            name: item.mname,
            artist: item.sname,
            cover: imgStream(item.pic),
            lrc: data.data.lrc.replaceAll("种子音乐 网址 zz123.com", ""),
          };
          this.us.dispatch("musicPlay", audio);
        })
        .catch((err) => {
          console.log(err);
          alert("err" + JSON.stringify(err));
        });
    },

    async getTypeMusic(item: MusicType, page = 1) {
      //
      let { status, data } = await typeMusic(item.titleId);
      if (status == 200) {
        this.us.state.indexMusic = data;
      }
      this.us.state.currentMusicType = item.titleId;
    },
    gotoMoreMusic() {
      this.us.commit("setComponentName", "MoreMusic");
    },
  },
});
</script>

<style scoped>
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
}

ion-label ion-icon {
  font-size: 30px;
}

.hand {
  display: flex;
  position: relative;
  top: -20px;
}

ion-slide {
  height: 160px;
}

.swiper .swiper-slide img {
  width: 40%;
}

.logo {
  width: 10%;
  position: absolute;
  left: 2%;
}

ion-content {
  height: 100vh;
}
</style>
