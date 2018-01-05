export function getImgWidth(width = 750) {
    let screeWidth = document.documentElement.clientWidth
    let maxWidth = 750
    return Math.min.apply(Math, [screeWidth, maxWidth, width])
}