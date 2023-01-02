import request from ".";

// 搜索音乐
const searchMusic = (name: string, page = 1) => {
    return request.post("/music/zz123",
        { act: 'search', key: name, page }
    )
}
// 音乐信息
const infoMusic = (id: string) => {
    return request.post("/music/zz123", {
        act: "songinfo",
        id,
    })
}

// 根据音乐类型获取音乐
const typeMusic = (titleId: string, page = 1) => {
    return request.post("/music/zz123", {
        act: "tag_music",
        page,
        tid: titleId,
        type: "tuijian",
    });
}
// 获取音乐类型
const titleMusic = () => {
    return request
        .get("/music/musicTitle")
}

// 获取主页音乐
const indexMusic = (page = 1) => {
    return request
        .post("/music/zz123", {
            act: "index_faxian",
            page,
        })
}



export function musicStream(mp3: string, source = 'https://www.zz123.com') {
    return `${request.getUri()}/music/musicStream?url=${mp3}&musicSource=${source}`
}

export {
    searchMusic,
    infoMusic,
    typeMusic,
    titleMusic,
    indexMusic

}