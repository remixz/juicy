import messageList from './components/message-list'

export default (state) => {
  let name = state.url.replace('/connection/', '')

  let connections = state.connections.concat(state.ownStream)
  let conn = connections.find(c => c.name === name)

  state.update({ title: conn.displayName })

  return (
    <div className="connection">
      {messageList(conn.posts)}
    </div>
  )
}
