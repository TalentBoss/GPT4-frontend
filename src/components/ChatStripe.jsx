import React from "react";
import '../css/ChatStripe.css';

const ChatStripe = ({ isAI, value, uniqueID }) => {
  return (
    <div className={isAI ? 'wrapper ai' : 'wrapper'}>
      <div className="chat">
        <div className="profile">
          <img src={isAI ? "/bot.svg" : '/user.svg'}
            alt={isAI ? 'bot' : 'user'} />
        </div>
        <div className={isAI ? 'message message-ai' : 'message message-user'} id={ uniqueID }>{ value }</div>
      </div>
    </div>
  )
}
export default ChatStripe;