import { Store, StoreOptions, Module, ActionContext } from 'vuex';
import { APlayerApi, Audio } from './../../dom/index';


interface APlayerX {
    ap: APlayerApi | null,
    currentMusic: string,
    audios: Array<Audio>
}



const aplayerStore: Module<APlayerX, any> = {
    state: {
        ap: null,
        currentMusic: "",
        audios: [],
    },

    actions: {
        musicListAdd(store: any, audio: Audio): number {
            const ap = store.state.ap as APlayerApi
            const index = ap.list.audios.findIndex((item) => item.name == audio.name
            ) as number;
            if (index == -1) {
                store.state.audios.push(audio);
                store.state.ap?.list.add(audio);
            }
            return index;
        },

        async musicPlay(store: any, audio: Audio) {

            const index = await store.dispatch("musicListAdd", audio);
            const s = store.state.ap as APlayerApi
            if (index == -1) {
                s.audio
                    .play()
                    .then((value) =>
                        s.list.switch(s?.list.audios.length - 1)
                    )
                    .catch((err) => console.log(err));
            } else {
                if (s?.audio.src == audio.url) {
                    return;
                }
                s?.audio
                    .play()
                    .then((value) => s?.list.switch(index))
                    .catch(
                        (err) => console.log(err)
                        // alert(JSON.stringify(err))
                    );
            }
            store.commit("setCurrentMusic", audio.url);
        },
    },
    mutations: {
        setAp(state: any, ap: APlayerApi) {
            state.ap = ap;
        },
        setCurrentMusic(state, name) {
            state.currentMusic = name;
        },



    }

}








export default aplayerStore;
