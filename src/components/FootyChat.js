import React, {useState} from "react";
import '../css/FootyChat.css';
const FootyChat = () => {
  const [message, setMessage] = useState('');
  const [textarea, setTextarea] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    setMessage(message + textarea);
    setTextarea('');
  }

  const enterKeyPressHandle = e => {
    if (e.keyCode === 13 && !e.shiftKey) handleSubmit(e);
  }

  const generateUniqueId = () => {
    const timeStamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);

    return `id-${timeStamp}-${hexadecimalString}`
  }

  const chatStripe = (isAi, value, uniqueId) => {
    return (
      `
        <div class="wrapper ${isAi ? 'ai' : 'user'}">
          <div class="chat">
            <div class="profile">
              <img src="${isAi ? "/bot.svg" : '/user.svg'}" 
                alt="${isAi ? 'bot' : 'user'}" />
            </div>
            <div class="message ${isAi ? 'message-ai' : 'message-user'}" id=${uniqueId}>${value}</div>
          </div>
        </div>
      `
    )
  }

  const handleTextareaChange = e => {
    setTextarea(e.target.value);
  }

  return (
    <>
      <div className="message-container">
        {message}
      </div>
       <form onSubmit={ handleSubmit } onKeyUp={ enterKeyPressHandle }>
          <textarea name="prompt" rows="4" cols="1" placeholder="Ask anything..." onChange={ handleTextareaChange } value={textarea}></textarea>
          <button type="submit">
            <img src="/send.svg" alt="send message"/>
          </button>
        </form>
    </>
  )
}

export default FootyChat