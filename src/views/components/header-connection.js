export default state => {
  let name = state.url.replace('/connection/', '')

  let connections = state.connections.concat(state.ownStream)
  let conn = connections.find(c => c.name === name)

  return (
    <header className="header-connection">
      <a className="back" href="/"> <i className="fa fa-chevron-left"></i> </a>
      <div className="avatar" style={{ backgroundImage: `url(${conn.avatarSrc || ''})`}}></div>
      <div className="overview">
        <div className="name"> {conn.displayName} </div>
        <div className="username"> @{conn.name} </div>
      </div>
    </header>
  )
}
