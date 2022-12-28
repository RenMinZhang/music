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
            lrcType: 3,
        }) as APlayerApi;
    },
    methods: {
        musicPlay(audio: Audio) {
            console.log(audio)
            this.ap?.list.add(audio);
        }
    }





});
</script>

<style scoped>
#box {
    background: #fff;
}
</style>

