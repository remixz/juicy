import user from './components/user'

export default state => {
  state.update({ title: 'Home' })
  let hasLoaded = (state.connections && state.connections.length > 0)

  return (
    <div className="home">
      {!hasLoaded ? (
        <div className="loading">
          <div className="spinner">🍑</div>
        </div>
      ) : null}

      <div className="own-stream">
        {hasLoaded ? user(state.ownStream) : (
          <div className="user loading"></div>
        )}
      </div>

      <div className="friend-streams">
        {hasLoaded ? state.connections.map(item => user(item)) : (
          <div>
            <div className="user loading"></div>
            <div className="user loading"></div>
            <div className="user loading"></div>
            <div className="user loading"></div>
            <div className="user loading"></div>
            <div className="user loading"></div>
            <div className="user loading"></div>
            <div className="user loading"></div>
            <div className="user loading"></div>
            <div className="user loading"></div>
            <div className="user loading"></div>
            <div className="user loading"></div>
            <div className="user loading"></div>
            <div className="user loading"></div>
            <div className="user loading"></div>
          </div>
        )}
      </div>
    </div>
  )
}
