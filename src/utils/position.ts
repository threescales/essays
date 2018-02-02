export function initPosition(element?) {
  document.documentElement.scrollTop = 0;
}

export function getInitPosition(element) {
  if (!element) {
    return {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      width: 0
    };
  }
  let offsetLeft: number = element.offsetLeft;
  let width: number = element.clientWidth;
  let screen = getPagearea();
  return {
    left: offsetLeft,
    right: screen.width - (offsetLeft + width),
    width: element.clientWidth
  };
}

export function getPagearea() {
  if (document.compatMode == "BackCompat") {
    return {
      width: Math.max(document.body.scrollWidth, document.body.clientWidth),
      height: Math.max(document.body.scrollHeight, document.body.clientHeight)
    };
  } else {
    return {
      width: Math.max(
        document.documentElement.scrollWidth,
        document.documentElement.clientWidth
      ),
      height: Math.max(
        document.documentElement.scrollHeight,
        document.documentElement.clientHeight
      )
    };
  }
}

export function getWindowScollPostion() {
  //滚动条位置
  var t, l, w, h;
  if (document.documentElement && document.documentElement.scrollTop) {
    t = document.documentElement.scrollTop;
    l = document.documentElement.scrollLeft;
    w = document.documentElement.scrollWidth;
    h = document.documentElement.scrollHeight;
  } else if (document.body) {
    t = document.body.scrollTop;
    l = document.body.scrollLeft;
    w = document.body.scrollWidth;
    h = document.body.scrollHeight;
  }
  return { top: t, left: l, width: w, height: h };
}
