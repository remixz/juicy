import message from './message'
import relativeDate from 'relative-date'

export default (messages) => {
  let reversedMessages = [...messages].reverse()
  return (
    <div className="message-list">
      {reversedMessages.map(msg => (
        <div className="message-container">
          {message(msg.message)}
          <p><em>{relativeDate(msg.createdTime * 1000)}</em></p>
        </div>
      ))}
    </div>
  )
}
