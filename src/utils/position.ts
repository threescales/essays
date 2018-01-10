export function initPosition(element?) {
    document.documentElement.scrollTop = 0
}

export function getInitPosition(element) {
    if (!element) {
        return {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }
    }
    let offsetLeft: number = element.offsetLeft
    let width: number = element.clientWidth
    let screen = getPagearea()
    return {
        left: offsetLeft,
        right: screen.width - (offsetLeft + width)
    }
}

export function getPagearea() {
    if (document.compatMode == "BackCompat") {
        return {
            width: Math.max(document.body.scrollWidth,
                document.body.clientWidth),
            height: Math.max(document.body.scrollHeight,
                document.body.clientHeight)
        }
    } else {
        return {
            width: Math.max(document.documentElement.scrollWidth,
                document.documentElement.clientWidth),
            height: Math.max(document.documentElement.scrollHeight,
                document.documentElement.clientHeight)
        }
    }
}