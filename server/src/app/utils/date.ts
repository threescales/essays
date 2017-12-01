export const maxAge = 1000 * 60 * 60 * 24 * 30;

export function getExpires() {
    let nowTime = new Date().getTime()
    return new Date(nowTime+maxAge)
}