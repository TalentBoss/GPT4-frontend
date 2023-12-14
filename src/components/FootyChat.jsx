import React, { useEffect, useRef, useState } from "react";
import '../css/FootyChat.css';
import ChatStripe from "./ChatStripe";


const FootyChat = () => {
  const [message, setMessage] = useState('');
  const [propsArray, setPropsArray] = useState([]);
  const scrollRef = useRef(null);

  const scrollToBottom = () => {
    const element = scrollRef.current;
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  };


  const generateUniqueId = () => {
    const timeStamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);
    return `id-${timeStamp}-${hexadecimalString}`
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() !== '') {
      await setNewState(false, message);
      sendMessageToGPT('Hi how are you!');
    }
    else setMessage('');
  }

  const setNewState = async (isAI, message) => {
    const uniqueId = generateUniqueId();
    const newProps = {
      isAI: isAI,
      value: message,
      uniqueId: uniqueId
    }

    setMessage('');
    let real = propsArray
    real.push(newProps)
    setPropsArray([...real]);
    
    return
  }

  const sendMessageToGPT = (msg) => {
    const response = msg;
    setMessage(response);
    setNewState(true, msg);
    return response;

  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (message.trim() !== '') {
  //     console.log('!!!!')
  //     await setNewState(false);
  //     await sendMessageToGPT('Hi how are you!');

  //   }
  //   else setMessage('');
  // }

  const enterKeyPressHandle = async (e) => {
    if (e.keyCode === 13 && !e.shiftKey) handleSubmit(e);
  }

  const handleMessageChange = e => {
    setMessage(e.target.value);
  }

  useEffect(() => {
    scrollToBottom();
  }, [message]);

  return (
    <>
      <div className="message-container" ref={scrollRef}>
        {
          propsArray.map((item, id) => (
            <ChatStripe key={id} {...item} />
          ))
        }
      </div>
      <form onSubmit={handleSubmit} onKeyUp={enterKeyPressHandle}>
        <textarea name="prompt" rows="4" cols="1" placeholder="Ask anything..." onChange={handleMessageChange} value={message}></textarea>
        <button type="submit">
          <img src="/send.svg" alt="send message" />
        </button>
      </form>
    </>
  )
}

export default FootyChat