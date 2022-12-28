<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title class="hand">
          <img class="logo" src="../assets/snowman.png" />
          <ion-searchbar mode="ios"></ion-searchbar>
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-slides pager mode="ios" :options="slideOpts">
        <ion-slide><img src="../assets/snowman.png" /></ion-slide>
        <ion-slide><img src="" />1</ion-slide>
        <ion-slide><img src="" />2</ion-slide>
        <ion-slide><img src="" />3</ion-slide>
      </ion-slides>
      <ion-grid :fixed="true">
        <ion-row class="ion-justify-content-start">
          <template v-for=" (item, index) in typeTitle" :key="index">
            <ion-col size="2" v-if="index <= 10">
              <ion-label><img :src="require(`../assets/${item.titleId}.png`)" /></ion-label>
              <!-- <ion-label>{{ item.titleId }} </ion-label> -->
              <ion-label>{{ item.titleName }} </ion-label>
            </ion-col>
          </template>
        </ion-row>
      </ion-grid>
      <ion-item>
        <h2>推荐歌曲
          <ion-icon :icon="chevronForwardOutline"></ion-icon>
        </h2>
      </ion-item>
      <ion-grid :fixed="true">
        <ion-row class="ion-justify-content-start">
          <template v-for=" (item, index) in indexMusic" :key="index">
            <ion-col class="musicCol" size="5" v-if="index <= 10" @click="clickMusic(item)">
              <ion-label><img
                  :src="`http://192.168.3.172:8080/img/imgStream?imgUrl=${item.pic}&imgSource=https://www.zz123.com`" /></ion-label>
              <ion-label>{{ item.mname }} </ion-label>
            </ion-col>
          </template>
        </ion-row>
      </ion-grid>
      <APlayer class="aplayer" ref="aplayer"></APlayer>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonSpinner, IonGrid, IonCol, IonRow, IonIcon, onIonViewWillEnter, IonItem, IonLabel, IonInput, IonHeader, IonPage, IonTitle, IonToolbar, IonSlides, IonSlide, IonSearchbar } from '@ionic/vue';
import { defineComponent, ref, onMounted, getCurrentInstance, ComponentInternalInstance } from 'vue';
import { searchCircle, alarmOutline, chevronForwardOutline } from 'ionicons/icons';
import request, { RequestObg } from '../api';
import APlayer from '../components/APlayer.vue';
import { MusicType, Music, Audio, MusicInfo, List } from '../dom';
// import { Storage } from '@ionic/utils-stream';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage';

export default defineComponent({
  props: {
    name: {

    }
  },
  name: 'HomePage',
  components: {
    IonItem,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonContent,
    IonHeader,
    IonLabel,
    IonPage,
    IonTitle, IonSlides, IonSlide,
    IonToolbar, IonSearchbar,
    APlayer,
  },
  setup() {

    let slideOpts = {
      autoplay: {
        delay: 2000,
      },
      loop: true,
      swiper: { height: 20 },
    };
    // 获取音乐类型
    let typeTitle: any = ref([])
    const getMusictitle = () => {
      request.get("/misic/musicTitle").then(data => {
        if (data.status == 200) {
          typeTitle.value = data.data
          // alert(JSON.stringify(typeTitle))
        }
      }).catch(err => {
        console.log(err)
        alert(JSON.stringify(err))
      })
    }

    // 获取音乐主页音乐歌曲
    let indexMusic: any = ref([]);
    const getMusicIndex = () => {
      request.post("/misic/zz123", {
        act: "index_faxian",
        page: 1
      }).then(data => {
        if (data.status == 200) {
          indexMusic.value = data.data;
          console.log(indexMusic);
        }
      }).catch(err => {
        alert(err)
      })
    }

    onMounted(() => {
      getMusicIndex()
      getMusictitle()

    })

    return {
      slideOpts, searchCircle, alarmOutline, typeTitle, chevronForwardOutline,
      getMusictitle,
      indexMusic, getMusicIndex
    }
  },
  mounted() {
    // this.getMusictitle();
  },
  methods: {
    clickMusic(item: Music) {
      request.post("/misic/zz123", {
        act: "songinfo",
        id: item.id,
      }).then(data => {
        let audio: Audio = {
          url: `http://192.168.3.172:8080/music/musicStream?url=${item.url}$&musicSource=https://www.zz123.com`,
          name: item.mname,
          artist: item.sname,
          cover: `http://192.168.3.172:8080/img/imgStream?imgUrl=${item.pic}&imgSource=https://www.zz123.com`,
          lrc: data.data.lrc.replaceAll("种子音乐 网址 zz123.com", ""),
        }

        let aplayer: any = this.$refs.aplayer
        aplayer.musicPlay(audio);
      }).catch(err => {
        alert(JSON.stringify(err))
      })


    }


    //  NativeStorage.getItem("musicList").then(
    //    data => {
    //      let audios = data as Array<Audio>
    //      audios.unshift(audio)
    //      NativeStorage.setItem("musicList", audios).then(
    //        data => {
    //          alert(JSON.stringify(data))
    //        },
    //        error => alert(JSON.stringify(error))
    //      )
    //    },
    //    error => console.error(error)
    //  )
  }





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
  transform: translateY(-50px);
  filter: drop-shadow(#66ccff 0 50px);
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
  top: -20px
}

ion-slide img {
  height: 160px;
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
</style>

