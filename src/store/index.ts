import { Music } from './../dom/index';
import { createApp } from 'vue'
import { createStore } from 'vuex'
import aPlayer from "./modules/aPlayer";



// 将 store 实例作为插件安装
export default createStore({
    state: {
        componentName: "SlidesComponent",
        indexMusic: [],
        typeTitle: [],
        indexPage: 1,
        currentMusicType: ''
    },
    modules: {
        aPlayer
    },
    mutations: {
        setComponentName(state, name) {
            state.componentName = name
        },
        setIndexMusic(state, name) {
            state.indexMusic = name
        },
        putIndexMusic(state, name) {
            state.indexMusic.push(...name as never[])
        },
        setTypeTitle(state, name) {
            state.typeTitle = name
        },
        setIndexPage(state, name) {
            state.indexPage = name
        }

    }
})