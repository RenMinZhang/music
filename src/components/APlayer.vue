<template>
    <div id="box">
        <div id="aplyer"></div>
    </div>

</template>

<script lang="ts">
import { defineComponent, Prop, onMounted } from 'vue';

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

        return {

        }
    },
    mounted() {
        // this.getMusictitle();
        const ap = new APlayer({
            container: document.getElementById("aplyer"),
            order: 'random',
            listFolded: true,
            lrcType: 3,
        });

    },





});
</script>

<style scoped>
#box {
    background: #fff;
}
</style>

