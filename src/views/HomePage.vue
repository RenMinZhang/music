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

    <ion-content :fullscreen="true" ref="test">
      <ion-slides pager mode="ios" :options="slideOpts">
        <ion-slide><img src="../assets/snowman.png" /></ion-slide>
        <ion-slide><img src="" />1</ion-slide>
        <ion-slide><img src="" />2</ion-slide>
        <ion-slide><img src="" />3</ion-slide>
      </ion-slides>
      <ion-grid :fixed="true">
        <ion-row class="row">
          <ion-col class="col" v-for=" (item, index) in typeTitle" :key="index" size="3">
            <ion-label><img :src="'src/assets/mszm.png'" /></ion-label>
            <ion-label>{{ item.titleId }} </ion-label>
            <ion-label>{{ item.titleName }} </ion-label>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonSpinner, IonIcon, onIonViewWillEnter, IonItem, IonLabel, IonInput, IonHeader, IonPage, IonTitle, IonToolbar, IonSlides, IonSlide, IonSearchbar } from '@ionic/vue';
import { defineComponent, ref, onMounted, getCurrentInstance, ComponentInternalInstance } from 'vue';
import { searchCircle, alarmOutline } from 'ionicons/icons';
import { HTTP } from '@awesome-cordova-plugins/http';
import { IsDebug } from '@awesome-cordova-plugins/is-debug';
import request, { RequestObg } from '../api';
import { MusicType } from '../dom';
import axios, { AxiosInstance } from 'axios'

export default defineComponent({
  name: 'HomePage',
  components: {

    IonContent,
    IonHeader,
    IonLabel,
    IonPage,
    IonTitle, IonSlides, IonSlide,
    IonToolbar, IonSearchbar,
  },

  setup() {


    let slideOpts = {
      autoplay: {
        delay: 2000,
      },
      loop: true,
      swiper: { height: 20 },
    };
    let typeTitle: any = ref([])

    const getMusictitle = () => {
      // request.get("/misic/musicTitle").then(data => {
      //   if (data.status == 200) {
      //     typeTitle.value = data.data
      //     alert(JSON.stringify(typeTitle))
      //   }
      // }).catch(err => {
      //   console.log(err)
      //   alert(JSON.stringify(err))
      // })

      // setInterval(() => {
      //   typeTitle.value.push({ titleId: "1", titleName: "123" })
      //   console.log(12)
      // }, 1000)
      HTTP.get("http://192.168.3.172:8080/misic/musicTitle", {}, {}).then(data => {
        alert(JSON.stringify(data))
      }).catch(err => {
        alert(JSON.stringify(err))
      })

    }

    onMounted(() => {
      getMusictitle()

    })
    // IsDebug.getIsDebug().then(isDebug => console.log('Is debug:', isDebug))
    //   .catch(err => console.error(err));




    return { slideOpts, searchCircle, alarmOutline, typeTitle, getMusictitle }
  },
  mounted() {

    // this.getMusictitle();
    console.log(2)
  },





});


</script>

<style scoped>
.col {
  display: flex;
  flex-direction: column;
  font-size: 20px;
  justify-content: space-around;
  text-align: center;

}

.row {
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
