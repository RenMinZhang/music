import request from ".";
export function imgStream(pic: string, source = 'https://www.zz123.com') {
    return `${request.getUri()}/img/imgStream?imgUrl=${pic}&imgSource=${source}`

}