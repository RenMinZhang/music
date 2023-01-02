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
      <swiper-slide v-for="(item, index) in typeTitle" :key="index">
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

    <ion-item detail-icon="chevronForwardOutline" href="/moreMusic">
      <h5 class="font15px">
        推荐歌曲
        <ion-icon :icon="chevronForwardOutline"></ion-icon>
      </h5>
    </ion-item>
    <ion-grid :fixed="true">
      <ion-row class="ion-justify-content-start">
        <template v-for="(item, index) in indexMusic" :key="index">
          <ion-col
            class="musicCol"
            size="3"
            v-if="index < 12"
            @click="clickMusic(item)"
          >
            <ion-label
              ><img
                :src="`http://192.168.3.172:8080/img/imgStream?imgUrl=${item.pic}&imgSource=https://www.zz123.com`"
            /></ion-label>
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
import "swiper/css";
import "@ionic/vue/css/ionic-swiper.css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/keyboard";
import "swiper/css/zoom";
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
    let typeTitle: any = ref([]);
    const getMusictitle = () => {
      titleMusic()
        .then((data) => {
          if (data.status == 200) {
            typeTitle.value = data.data;
            // alert(JSON.stringify(typeTitle))
          }
        })
        .catch((err) => {
          console.log(err);
          alert(JSON.stringify(err));
        });
    };

    // 获取音乐主页音乐歌曲
    let indexMusic: any = ref([]);
    const getMusicIndex = () => {
      im()
        .then((data) => {
          if (data.status == 200) {
            indexMusic.value = data.data;
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
      typeTitle,
      chevronForwardOutline,
      getMusictitle,
      indexMusic,
      getMusicIndex,
      currentMusicType,
      Scrollbar,
      modules,
      us,
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
        this.indexMusic = data;
      }
      this.currentMusicType = item.titleId;
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
