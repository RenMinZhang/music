<template>
    <div id="box">
        <div id="aplyer"></div>
    </div>

</template>

<script lang="ts">
import { defineComponent, Prop, onMounted, ref } from 'vue';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage';
import { MusicType, Music, Audio, MusicInfo, List, APlayerApi } from '../dom';
import APlayer from 'aplayer';
import { Item } from '@ionic/core/dist/types/components/item/item';
export default defineComponent({
    name: 'APlay',
    components: {

    },
    // props: {
    //     // music: {
    //     //     type: String,
    //     //     required: true,
    //     // }, list: {
    //     //     type: Array
    //     // },
    //     // showLrc: {
    //     //     type: Boolean,
    //     //     default: true,
    //     // }
    // },
    created() {

        // 
    },
    setup() {
        let ap = ref<null | APlayerApi>(null);

        return {
            ap
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
        this.ap.on("listadd", (a, b) => {
            console.log(a, b)
            return false;
        })
    },
    methods: {
        musicPlay(audio: Audio) {
            let index = this.ap?.list.audios.findIndex(item => item.name == audio.name) as number;
            if (index == -1) {
                this.ap?.list.add(audio);
                this.ap?.list.switch(this.ap?.list.audios.length - 1)
                this.ap?.play();
            } else {
                console.dir(audio.url, this.ap?.audio.src)
                if (this.ap?.audio.src == audio.url) {

                    return;
                }
                this.ap?.list.switch(index);
            }


        }
    }





});
</script>

<style scoped>
#box {
    background: #fff;
}
</style>

