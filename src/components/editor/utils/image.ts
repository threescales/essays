export function getImgWidth(width = 750) {
  let maxWidth = 750;
  return Math.min.apply(Math, [maxWidth, width]);
}
