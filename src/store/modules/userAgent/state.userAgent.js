export default {
  menuOpen: false,
  matches: [
    {
      name: 'Opera',
      nick: /opera/i,
      test: /opera|opr/i,
      version: /(?:opera|opr)[\s](\d+(\.\d+)*)/i
    },
    {
      name: 'Windows Phone',
      nick: /WindowsPhone/i,
      test: /windows phone/i,
      version: /iemobile\/(\d+(\.\d+)*)/i
    },
    {
      name: 'Edge',
      nick: /edge|edgehtml/i,
      test: /edge|msapphost|edgehtml/i,
      version: /(?:edge|edgehtml)\/(\d+(\.\d+)*)/i
    },
    {
      name: 'Internet Explorer',
      nick: /explorer|internetexplorer|ie/i,
      test: /msie|trident/i,
      version: /(?:msie |rv:)(\d+(\.\d+)*)/i
    },
    {
      name: 'Chrome',
      nick: /Chrome/i,
      test: /chrome|crios|crmo/i,
      version: /(?:chrome|crios|crmo)\/(\d+(\.\d+)*)/i
    },
    { name: 'iPod', nick: /iPod/i, test: /ipod/i },
    { name: 'iPhone', nick: /iPhone/i, test: /iphone/i },
    { name: 'iPad', nick: /iPad/i, test: /ipad/i },
    {
      name: 'FirefoxOS',
      nick: /FirefoxOS|ffos/i,
      test: /\((mobile|tablet);[^)]*rv:[d.]+\)firefox|iceweasel/i,
      version: /(?:firefox|iceweasel)[ /](\d+(\.\d+)?)/i
    },
    {
      name: 'Firefox',
      nick: /Firefox|ff/i,
      test: /firefox|iceweasel/i,
      version: /(?:firefox|iceweasel)[ /](\d+(\.\d+)?)/i
    },
    { name: 'Android', nick: /Android/i, test: /android/i },
    {
      name: 'BlackBerry',
      nick: /BlackBerry/i,
      test: /(blackberry)|(\bbb)|(rim\stablet)\d+/i,
      version: /blackberry[\d]+\/(\d+(\.\d+)?)/i
    },
    {
      name: 'WebOS',
      nick: /WebOS/i,
      test: /(web|hpw)os/i,
      version: /w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i
    },
    { name: 'Safari', nick: /safari/i, test: /safari/i }
  ]
}
