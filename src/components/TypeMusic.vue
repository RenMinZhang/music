<template>
  <ion-page>
    <ion-content>
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
            :class="
              us.state.currentMusicType == item.titleId ? 'colorBlue' : ''
            "
          >
            <ion-label
              ><img :src="require(`../assets/${item.titleId}.png`)"
            /></ion-label>
            <ion-label class="font12px">{{ item.titleName }} </ion-label>
          </ion-col>
        </swiper-slide>
      </swiper>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { typeMusic } from "@/api/musicRequest";
import { MusicType } from "@/dom";
import { Pagination, Scrollbar } from "swiper";
import { defineComponent } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "TypeMusic",
  setup() {
    let us = useStore();
    let modules = [Scrollbar, Pagination];
    return {
      us,
      modules,
    };
  },
  components: {},
  methods: {
    async getTypeMusic(item: MusicType, page = 1) {
      //
      let { status, data } = await typeMusic(item.titleId, page);
      if (status == 200) {
        this.us.state.indexMusic = data;
      }
      this.us.state.currentMusicType = item.titleId;
      this.us.state.indexPage = 1;
    },
  },
});
</script>
<style scoped>
</style>