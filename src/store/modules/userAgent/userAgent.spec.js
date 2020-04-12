import mutations from './mutations.userAgent'
import getters from './getters.userAgent'
import actions from './actions.userAgent'

let platformGetter, state

const commit = jest.fn()

beforeEach(() => {
  state = {
    menuOpen: false,
    matches: [
      {name: 'Opera', nick: /opera/i, test: /opera|opr/i, version: /(?:opera|opr)[\s](\d+(\.\d+)*)/i},
      {name: 'Windows Phone', nick: /WindowsPhone/i, test: /windows phone/i, version: /iemobile\/(\d+(\.\d+)*)/i},
      {name: 'Edge', nick: /edge|edgehtml/i, test: /edge|msapphost|edgehtml/i, version: /(?:edge|edgehtml)\/(\d+(\.\d+)*)/i},
      {name: 'Internet Explorer', nick: /explorer|internetexplorer|ie/i, test: /msie|trident/i, version: /(?:msie |rv:)(\d+(\.\d+)*)/i},
      {name: 'Chrome', nick: /Chrome/i, test: /chrome|crios|crmo/i, version: /(?:chrome|crios|crmo)\/(\d+(\.\d+)*)/i},
      {name: 'iPod', nick: /iPod/i, test: /ipod/i},
      {name: 'iPhone', nick: /iPhone/i, test: /iphone/i},
      {name: 'iPad', nick: /iPad/i, test: /ipad/i},
      {name: 'FirefoxOS', nick: /FirefoxOS|ffos/i, test: /\((mobile|tablet);[^)]*rv:[d.]+\)firefox|iceweasel/i, version: /(?:firefox|iceweasel)[ /](\d+(\.\d+)?)/i},
      {name: 'Firefox', nick: /Firefox|ff/i, test: /firefox|iceweasel/i, version: /(?:firefox|iceweasel)[ /](\d+(\.\d+)?)/i},
      {name: 'Android', nick: /Android/i, test: /android/i},
      {name: 'BlackBerry', nick: /BlackBerry/i, test: /(blackberry)|(\bbb)|(rim\stablet)\d+/i, version: /blackberry[\d]+\/(\d+(\.\d+)?)/i},
      {name: 'WebOS', nick: /WebOS/i, test: /(web|hpw)os/i, version: /w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i},
      {name: 'Safari', nick: /safari/i, test: /safari/i}
    ]
  }
  platformGetter = jest.spyOn(window.navigator, 'platform', 'get')
})

describe('Mutations', () => {
  test('SET_RESPONSIVE_MENU_OPEN true', () => {
    mutations.SET_RESPONSIVE_MENU_OPEN(state, true)
    expect(state.menuOpen).toBe(true)
  })

  test('SET_RESPONSIVE_MENU_OPEN false', () => {
    mutations.SET_RESPONSIVE_MENU_OPEN(state, false)
    expect(state.menuOpen).toBe(false)
  })
})

describe('Getters', () => {
  test('ua', () => {
    expect(getters.ua()).toBe('Mozilla/5.0 (darwin) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/11.12.0')
  })

  test('platform', () => {
    expect(getters.platform()).toBe('')
  })

  test('isRetina', () => {
    expect(getters.isRetina()).toBe(false)

    window.matchMedia = jest.fn().mockImplementation(query => {
      return {
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      }
    })
    expect(getters.isRetina()).toBe(false)
  })

  test('browserName', () => {
    expect(getters.browserName(state, getters)).toBe(undefined)
  })

  describe('OS', () => {
    test('ios', () => {
      platformGetter.mockReturnValue('iphone')
      expect(getters.OS()).toBe('ios')

      platformGetter.mockReturnValue('ipod')
      expect(getters.OS()).toBe('ios')

      platformGetter.mockReturnValue('ipad')
      expect(getters.OS()).toBe('ios')

      platformGetter.mockReturnValue('iphone simulator')
      expect(getters.OS()).toBe('ios')

      platformGetter.mockReturnValue('ipod simulator')
      expect(getters.OS()).toBe('ios')

      platformGetter.mockReturnValue('ipad simulator')
      expect(getters.OS()).toBe('ios')
    })

    test('osx', () => {
      platformGetter.mockReturnValue('macintosh')
      expect(getters.OS()).toBe('osx')

      platformGetter.mockReturnValue('macintel')
      expect(getters.OS()).toBe('osx')

      platformGetter.mockReturnValue('macppc')
      expect(getters.OS()).toBe('osx')

      platformGetter.mockReturnValue('mac68k')
      expect(getters.OS()).toBe('osx')
    })

    test('android', () => {
      platformGetter.mockReturnValue('linux armv1l')
      expect(getters.OS()).toBe('android')

      platformGetter.mockReturnValue('android')
      expect(getters.OS()).toBe('android')
    })

    test('windows', () => {
      platformGetter.mockReturnValue('os/2')
      expect(getters.OS()).toBe('windows')

      platformGetter.mockReturnValue('wince')
      expect(getters.OS()).toBe('windows')

      platformGetter.mockReturnValue('pocket pc')
      expect(getters.OS()).toBe('windows')

      platformGetter.mockReturnValue('windows')
      expect(getters.OS()).toBe('windows')

      platformGetter.mockReturnValue('win12')
      expect(getters.OS()).toBe('windows')
    })

    test('blackberry', () => {
      platformGetter.mockReturnValue('blackberry')
      expect(getters.OS()).toBe('blackberry')
    })

    test('linux', () => {
      platformGetter.mockReturnValue('linux')
      expect(getters.OS()).toBe('linux')
    })
  })
  
  
  describe('orientation', () => {
    test('orientation landscape', () => {
      global.innerWidth = 1000
      global.innerHeight = 200

      global.outerWidth = 1000
      global.outerHeight = 200
      expect(getters.orientation()).toBe('landscape')
    })
    test('orientation portrait in landscape screen', () => {
      global.innerWidth = 100
      global.innerHeight = 200

      global.outerWidth = 1000
      global.outerHeight = 200
      expect(getters.orientation()).toBe('portrait')
    })
    test('orientation portrait', () => {
      global.innerWidth = 100
      global.innerHeight = 200

      global.outerWidth = 100
      global.outerHeight = 200
      expect(getters.orientation()).toBe('portrait')
    })
  })
  
  test('isTouchScreen', () => {
    expect(getters.isTouchScreen()).toBe(false)
  })

  test('isTablet', () => {
    expect(getters.isTablet(state, getters)).toBe(false)
  })

  test('isMobile', () => {
    expect(getters.isMobile(state, getters)).toBe(false)
  })

  test('isDesktop', () => {
    expect(getters.isDesktop(state, getters)).toBe(false)
  })
})

describe('Actions', () => {

  test('responsiveMenuOpen', async () => {
    await actions.responsiveMenuOpen({ commit }, true)
    expect(commit).toHaveBeenCalledWith('SET_RESPONSIVE_MENU_OPEN', true)
  })
})