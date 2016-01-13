import xhr from 'xhr'
import login from './views/login'
import connection from './views/connection'
import home from './views/home'
import defaultHeader from './views/components/header-default'
import connectionHeader from './views/components/header-connection'

export const routes = {
  login: {
    url: /^\/login$/,
    view: login,
    header: defaultHeader
  },

  home: {
    url: /^\/$/,
    view: home,
    header: defaultHeader,
    callback (state, cb) {
      cb({
        isLoading: true
      }) // render it first with an isLoading = true

      xhr({
        url: 'https://v1.peachapi.com/connections',
        headers: {
          'Authorization': 'Bearer ' + state.loginInfo.streams[0].token
        },
        json: true
      }, (err, res) => {
        if (err) throw err
        cb({
          connections: res.body.data.connections,
          ownStream: res.body.data.requesterStream,
          isLoading: false
        })
      })
    }
  },

  connection: {
    url: /^\/connection\/(\w*)/,
    view: connection,
    header: connectionHeader
  }
}

export function findViewForUrl (url) {
  return Object.keys(routes).find(view => routes[view].url.test(url))
}
