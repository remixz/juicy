export default (message) => {

  function messageRenderer (msg) {
    let types = {
      text: () => (
        <div className="text">
          {msg.text.split('\n').map(m => <p> {m} </p>)}
        </div>
      ),

      image: () => (
        <div className="image" style={{ height: `${Math.round((msg.height / msg.width) * 300)}px`}}>
          <img src={msg.src} />
        </div>
      ),

      gif: () => (
        <div className="image image-gif" style={{ height: `${Math.round((msg.height / msg.width) * 300)}px`}}>
          <img src={msg.src} />
        </div>
      ),

      video: () => (
        <div className="video" style={{ height: `${Math.round((msg.height / msg.width) * 300)}px`}}>
          <video src={msg.src} poster={msg.posterSrc} autoplay muted loop={msg.subtype === 'looping photo'} />
        </div>
      ),

      music: () => (
        <div className="music">
          <p> {msg.title} </p>
        </div>
      ),

      link: () => (
        <div className="link">
          Link: <a href={msg.url}> {msg.url} </a>
        </div>
      ),

      location: () => (
        <div className="location">
          <a href={`https://maps.google.com/?ll=${msg.lat},${msg.long}`}> {msg.name} </a>
        </div>
      )
    }

    if (types[msg.type]) {
      return types[msg.type]()
    } else {
      return (<pre>{JSON.stringify(msg)}</pre>)
    }

  }

  return (
    <div className="message">
      {message.map(m => messageRenderer(m))}
    </div>
  )
}
