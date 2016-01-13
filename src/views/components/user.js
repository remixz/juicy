function createPreviewText (posts) {
  let latestPost = posts[posts.length - 1]

  let text = ''
  let hasText = false
  latestPost.message.forEach(msg => {
    if (msg.text || msg.title) {
      text = (hasText ? text : '') + (msg.text || msg.title) + ' '
      hasText = true
    } else if (msg.subtype) {
      if (hasText) return
      text = msg.subtype.charAt(0).toUpperCase() + msg.subtype.slice(1)
    } else {
      if (hasText) return
      text = msg.type.charAt(0).toUpperCase() + msg.type.slice(1)
    }
  })

  return text
}

export default (user) => (
  <div className="user">
    <a href={`/connection/${user.name}`}>
      <div className="avatar" style={{ backgroundImage: `url(${user.avatarSrc || ''})`}}></div>
      <div className="overview">
        <div className="name"> {user.displayName} </div>
        <div className="preview"> {createPreviewText(user.posts)} </div>
      </div>
    </a>
  </div>
)
