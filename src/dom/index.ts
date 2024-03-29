export interface MusicType {
    titleId: string;
    titleName: string;
}


export interface APlayerApi {
    play(): void,
    seek?(time: number): void,
    pause?(): void
    audio: HTMLAudioElement,
    list: List
    on(event: string, cb?: (arg1?: any, arg2?: any) => any): void
}


export interface Audio {
    url: string,
    name: string,
    cover: string,
    lrc: string
    artist: string
}
export interface List {
    audios: Array<Audio>,
    show(): void, hide(): void, toggle(): void, add(audios: Array<Audio> | Audio): void,
    remove(index: number): void, switch(index: number): void, clear(): void
}
export interface Music {
    datestr: string
    hot_num: number
    id: string
    mname: string
    mp3: string
    pic:
    string
    play_time
    :
    string
    sid
    :
    string
    sname
    :
    string
    tid
    :
    string
    url
    :
    string
}
export interface MusicInfo {
    lrc
    :
    string
    mname
    :
    string
    mp3
    :
    string
    pic
    :
    string
    playtime
    :
    string
    sid
    :
    string
    sname
    :
    string
}


