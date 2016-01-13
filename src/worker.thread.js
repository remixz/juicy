/*global self*/
import diff from 'virtual-dom/diff'
import serializePatch from 'vdom-serialized-patch/serialize'
import fromJson from 'vdom-as-json/fromJson'
import xhr from 'xhr'
import xtend from 'xtend'
import * as ud from 'ud'
import { updateState } from './create-state'
import app from './views/app'
import { routes, findViewForUrl } from './router'

let state, currentVDom
self.onmessage = ({data}) => {
  let { type, payload } = data
  let shouldReplace = false

  let messageHandlers = {
    start (cb) {
      state = payload.state
      currentVDom = fromJson(payload.virtualDom)
      state.update = updateState
      state.update({
        url: payload.url,
        firstLoad: true
      })
      if (!state.isLoggedIn) {
        state.update({
          url: '/login',
          view: 'login'
        })
        shouldReplace = true
      }
      cb()
    },

    setUrl (cb) {
      let viewName = findViewForUrl(payload)
      state.update({
        url: payload,
        view: viewName
      })

      if (routes[viewName].callback) {
        routes[viewName].callback(state, cb)
      } else {
        cb()
      }
    },

    login (cb) {
      state.update({
        isLoading: true
      })
      cb()

      xhr({
        url: 'https://v1.peachapi.com/login',
        method: 'POST',
        json: {
          email: payload.email,
          password: payload.password
        }
      }, (err, res) => {
        if (err) throw err

        state.update({
          isLoading: false,
          isLoggedIn: true,
          loginInfo: res.body.data
        })

        payload = '/'
        messageHandlers.setUrl(cb)
      })
    },

    render (cb) {
      cb()
    }
  }

  messageHandlers[type](newState => {
    if (newState) {
      state.update(newState)
    }

    const newVDom = app(state)
    const patches = diff(currentVDom, newVDom)
    currentVDom = newVDom

    let serializedState = xtend(state, { update: null })
    self.postMessage({url: state.url, payload: serializePatch(patches), replace: shouldReplace, state: serializedState})
  })
}
