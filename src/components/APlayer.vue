<!-- eslint-disable no-undef -->
<template>
    <ion-content id="box">
        <div id="aplyer"></div>
        <ion-icon :icon="personCircle"></ion-icon>
        <ion-modal @didDismiss="musicLIstIsShow = false" id="example-modal" :is-open="musicLIstIsShow" ref="modal"
            initial-breakpoint="0.5">
            <ion-content class="wrapper">
                <ion-list lines="none">
                    <ion-item v-for="(item, index) in audios" :key="index" :button="true" :detail="false"
                        @click="dismiss">
                        <ion-label>{{ item.name }}-{{ item.artist }}</ion-label>
                    </ion-item>
                </ion-list>
                <ion-infinite-scroll @ionInfinite="ionInfinite">
                    <ion-infinite-scroll-content></ion-infinite-scroll-content>
                </ion-infinite-scroll>
            </ion-content>
        </ion-modal>
    </ion-content>
</template>

<script lang="ts">
import {
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonList, IonModal, IonContent, IonGrid, IonRow, onIonViewWillEnter, IonItem, IonLabel, IonInput, IonHeader, IonPage, IonTitle, IonToolbar, IonSlides, IonSlide, IonSearchbar
} from '@ionic/vue';
import { searchCircle, alarmOutline, chevronForwardOutline, personCircle } from 'ionicons/icons';
import { defineComponent, reactive, onMounted, ref } from 'vue';

import { MusicType, Music, Audio, MusicInfo, List, APlayerApi } from '../dom';
import APlayer from 'aplayer';
export default defineComponent({
    name: 'APlay',
    components: {
        IonModal, IonList, IonItem, IonContent,
        IonInfiniteScroll,
        IonInfiniteScrollContent
    },
    setup() {
        const audios: Array<Audio> = reactive([]);
        let ap = ref<null | APlayerApi>(null);
        let musicLIstIsShow = ref(false)
        const showList = async () => {
            const ele = document.querySelector('.aplayer-list') as HTMLDivElement
            ele.style.display = "none"
            musicLIstIsShow.value = true;

        }
        const ionInfinite = (ev: any) => {
            setTimeout(() => ev.target.complete(), 500);
        };


        return {
            ap, showList, personCircle, ionInfinite, musicLIstIsShow, audios
        }
    },
    mounted() {
        this.ap = new APlayer({
            container: document.getElementById("aplyer"),
            order: 'random',
            listFolded: true,
            lrcType: 2,
            fixed: false,
        }) as APlayerApi;
        // this.showList()
        this.ap.on("listshow", (a, b) => {
            this.showList()
        })
        this.ap.on("listhide", (a, b) => {
            this.showList()
        })
    },
    methods: {
        musicPlay(audio: Audio) {
            let index = this.musicListAdd(audio);
            if (index == -1) {
                this.ap?.audio.play().then(
                    value => this.ap?.list.switch(this.ap?.list.audios.length - 1)
                ).catch(err =>
                    console.log(err)
                    // alert(JSON.stringify(err))
                )
            } else {
                if (this.ap?.audio.src == audio.url) {
                    return;
                }
                this.ap?.audio.play().then(
                    value => this.ap?.list.switch(index)
                ).catch(err =>
                    console.log(err)
                    // alert(JSON.stringify(err))
                )
            }


        },
        dismiss() {
            console.log(this.$refs.modal)
        },
        musicListAdd(audio: Audio): number {
            let index = this.ap?.list.audios.findIndex(item => item.name == audio.name) as number;
            if (index == -1) {
                this.audios.push(audio)
                this.ap?.list.add(audio);
            }
            return index;
        },




    }


});
</script>

<style scoped>
.aplayer .aplayer-withlist .aplayer-list {
    display: none !important;
}

ion-modal#example-modal {
    --width: fit-content;
    --min-width: 90%;
    --height: 50%;
    --border-radius: 6px;
    --box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
}

ion-modal#example-modal h1 {
    margin: 20px 20px 10px 20px;
}

ion-modal#example-modal .wrapper {
    margin-bottom: 10px;
}
</style>

