import { createApp } from 'vue'
import { createStore } from 'vuex'
import aPlayer from "./modules/aPlayer";



// 将 store 实例作为插件安装
export default createStore({
    state: {
        // 
    },
    modules: {
        aPlayer
    }
})