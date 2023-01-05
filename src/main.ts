import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { IonBackButton, IonButton, IonButtons, IonCol, IonGrid, IonicVue, IonItem, IonSearchbar, IonTitle, IonToolbar } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';
import 'swiper/css';
import '@ionic/vue/css/ionic-swiper.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

import store from './store'

/* Theme variables */
import './theme/variables.css';

/* global variables */
import './theme/global.css';



//APlayer
import 'aplayer/dist/APlayer.min.css';

//swiper
import "swiper/css";
import "@ionic/vue/css/ionic-swiper.css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/keyboard";
import "swiper/css/zoom";
import { Swiper, SwiperSlide } from "swiper/vue";

const app = createApp(App)
  .use(IonicVue)
  .use(store)
  .use(router);

//component
import {
  IonHeader,
  IonContent, IonPage, IonSlides, IonSlide, IonRouterOutlet,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from '@ionic/vue';
import APlayer from "./components/APlayer.vue";
import SlidesComponent from "./components/SlidesComponent.vue";
app.component('ion-content', IonContent)
  .component('ion-page', IonPage)
  .component("a-player", APlayer)
  .component("ion-slides", IonSlides)
  .component("ion-slide", IonSlide)
  .component("slides-component", SlidesComponent)
  .component("ion-router-outlet", IonRouterOutlet)
  .component("ion-infinite-scroll", IonInfiniteScroll)
  .component("ion-infinite-scroll-conten", IonInfiniteScrollContent)
  .component("ion-header", IonHeader)
  .component("ion-toolbar", IonToolbar)
  .component("ion-title", IonTitle)
  .component("ion-searchbar", IonSearchbar)
  .component("ion-button", IonButton)
  .component("ion-item", IonItem)
  .component("ion-back-button", IonBackButton)
  .component("ion-buttons", IonButtons)
  .component("swiper", Swiper)
  .component("swiper-slide", SwiperSlide)
  .component("ion-grid", IonGrid)
  .component("ion-col", IonCol)
  .component("ion-col", IonCol)
  .component("ion-col", IonCol)
  .component("ion-col", IonCol)
  .component("ion-col", IonCol)
  .component("ion-col", IonCol)
  .component("ion-grid", IonCol)


router.isReady().then(() => {
  app.mount('#app');
});