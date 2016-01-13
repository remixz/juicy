import WorkerThread from './worker.thread'
import parser from 'vdom-parser'
import toJson from 'vdom-as-json/toJson'
import applyPatch from 'vdom-serialized-patch/patch'
import { getLocalPathname } from 'local-links'
import * as ud from 'ud'
import xtend from 'xtend'
import * as fs from 'fs'
import { remote, shell } from 'electron'
import { createState, updateState } from './create-state'
import './styles/main.css'

let configData = remote.app.getPath('userData') + '/config.json'
let state
if (!fs.existsSync(configData)) {
  state = createState()
  fs.writeFileSync(configData, JSON.stringify(state))
} else {
  state = JSON.parse(fs.readFileSync(configData))
}

let globalState = ud.defobj(module, state)
globalState.update = updateState

const setupWorker = ud.defn(module, (worker, state) => {
  let rootElement = document.body.firstChild

  worker.onmessage = ({data}) => {
    const { url, payload, replace } = data
    globalState.update(data.state)
    requestAnimationFrame(() => {
      document.body.className = `view-${data.state.view}`
      applyPatch(rootElement, payload)
    })
    if (location.pathname !== url) {
      if (replace) history.replaceState(null, null, url)
      else history.pushState(null, null, url)
    }
    rootElement.scrollTop = 0
    fs.writeFileSync(configData, JSON.stringify(data.state))
  }

  let serializedState = xtend(state, { update: null })
  worker.postMessage({type: 'start', payload: {
    virtualDom: toJson(parser(rootElement)),
    url: serializedState.url || location.pathname,
    state: serializedState
  }})

  window.addEventListener('popstate', () => {
    worker.postMessage({type: 'setUrl', payload: location.pathname})
  })

  document.body.addEventListener('click', ev => {
    const pathname = getLocalPathname(ev)

    if (pathname) {
      ev.preventDefault()
      worker.postMessage({type: 'setUrl', payload: pathname})
    } else if (ev.target.href) {
      ev.preventDefault()
      shell.openExternal(ev.target.href)
    }
  })

  document.body.addEventListener('submit', ev => {
    ev.preventDefault()

    worker.postMessage({type: 'login', payload: {
      email: ev.target[0].value,
      password: ev.target[1].value
    }})
  })
})

let worker = new WorkerThread()
if (module.hot) {
  module.hot.accept('./worker.thread', () => {
    worker.terminate()
    let NewWorker = require('./worker.thread')
    worker = new NewWorker()
    setupWorker(worker, globalState)
  })
}

setupWorker(worker, globalState)
