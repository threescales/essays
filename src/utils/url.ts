var matcher = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;

export function isUrl(string) {
    return matcher.test(string);
  }
  