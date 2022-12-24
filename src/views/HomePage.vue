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
      <ion-grid>
        <ion-row>
          <ion-col class="col">
            <ion-label><ion-icon :icon="searchCircle"></ion-icon></ion-label>
            <ion-label>1</ion-label>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonIcon, IonItem, IonLabel, IonInput, IonHeader, IonPage, IonTitle, IonToolbar, IonSlides, IonSlide, IonSearchbar } from '@ionic/vue';
import { defineComponent, ref, onMounted, getCurrentInstance, ComponentInternalInstance } from 'vue';
import { searchCircle, alarmOutline } from 'ionicons/icons';
import { HTTP } from '@awesome-cordova-plugins/http';
export default defineComponent({
  name: 'HomePage',
  components: {
    IonIcon,
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

    return { slideOpts, searchCircle, alarmOutline }
  },
  mounted() {
    console.log(123)
    HTTP.get("http://127.0.0.1:8080/misic/musicTitle", {}, {}).then(data => {
      console.log(data)
    })
    //  

  }
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
