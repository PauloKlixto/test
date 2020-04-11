const getFirstMatch = (re, val) => {
  var m = val.match(re)
  return (m && m.length > 1 && m[1]) || null
}

export default {
  ua() {
    return navigator.userAgent || ''
  },
  platform() {
    return navigator.platform || ''
  },
  isRetina() {
    if (window.matchMedia) {
      var mq = window.matchMedia(
        'only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)'
      )

      return mq.matches
    }
    return false
  },
  browserName(state, getters) {
    for (var m in state.matches) {
      if (state.matches[m].test.test(getters.ua)) {
        return state.matches[m].name
      }
    }
  },

  browserVersion(state, getters) {
    let version = getFirstMatch(/version\/(\d+(\.\d+)*)/i, getters.ua)
    if (version) {
      return version
    }

    for (var m in state.matches) {
      if (state.matches[m].test.test(getters.ua)) {
        return getFirstMatch(state.matches[m].version, getters.ua)
      }
    }
  },

  OS() {
    var result = undefined
    switch (navigator.platform.toLowerCase()) {
      case 'iphone':
      case 'ipod':
      case 'ipad':
      case 'iphone simulator':
      case 'ipod simulator':
      case 'ipad simulator':
        result = 'ios'
        break
      case 'macintosh':
      case 'macintel':
      case 'macppc':
      case 'mac68k':
        result = 'osx'
        break
      case 'android':
        result = 'android'
        break
      case 'os/2':
      case 'wince':
      case 'pocket pc':
      case 'windows':
        result = 'windows'
        break
      case 'blackberry':
        result = 'blackberry'
        break
    }

    if (/linux armv+(\d{1}l)/i.test(navigator.platform)) {
      result = 'android'
    } else if (/linux+\s?.*?$/im.test(navigator.platform)) {
      result = 'linux'
    } else if (/win\d{2}/i.test(navigator.platform)) {
      result = 'windows'
    }

    return result
  },

  orientation() {
    let ratio = window.outerWidth / window.outerHeight

    if (window.innerWidth > window.innerHeight && ratio > 1.3) {
      return 'landscape'
    } else {
      return 'portrait'
    }
  },

  isTouchScreen() {
    return (
      !!('ontouchstart' in window) ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    )
  },

  isTablet(state, getters) {
    return /(ipad.*|tablet(?!\s+pc).*|(android.*?chrome((?!mobi).)*))$/i.test(
      getters.ua
    )
  },
  isMobile(state, getters) {
    return (
      (!getters.isTablet &&
        !!getFirstMatch(/(ipod|iphone|ipad)/i, getters.ua)) ||
      /[^-]mobi/i.test(getters.ua)
    )
  },
  isDesktop(state, getters) {
    return !getters.isMobile && !getters.isTablet
  }
}
