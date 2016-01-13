export function createState () {
  let state = {
    title: 'Juicy',
    view: 'login',
    url: '/login',
    isLoggedIn: false,
    loginInfo: {},
    isLoading: false,
    connections: [],
    ownStream: {},
    firstLoad: false
  }

  return state
}

export function updateState (obj) {
  Object.keys(obj).forEach(key => {
    if (key === 'update') return
    this[key] = obj[key]
  })
}
