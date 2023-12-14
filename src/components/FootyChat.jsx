import React, { useEffect, useRef, useState } from "react";
import '../css/FootyChat.css';
import ChatStripe from "./ChatStripe";
import axios from "axios";


const FootyChat = () => {
  const [message, setMessage] = useState('');
  const [propsArray, setPropsArray] = useState([]);
  const [isStart, setIsStart] = useState(true);

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


  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() !== '') {
      setNewState(false, message);
      sendMessageToGPT(message);
    }
    else setMessage('');
  }

  const setNewState = (isAI, message) => {
    const uniqueId = generateUniqueId();
    const newProps = {
      isAI: isAI,
      value: message.trimEnd(),
      uniqueId: uniqueId
    }

    setMessage('');
    let real = propsArray;
    real.push(newProps);
    setPropsArray([...real]);
  }

  const sendMessageToGPT = (msg) => {
    const request = {
      msg: msg,
      sender: 'user'
    };
    axios.post('/openai/get-response', request)
      .then(response => {
        setMessage(response.data.data);
        setNewState(true, response.data.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const enterKeyPressHandle = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) handleSubmit(e);
  }

  const handleMessageChange = e => {
    setMessage(e.target.value);
  }

  useEffect(() => {
    scrollToBottom();
    if (isStart === true) {
      axios.post('/openai/start-response')
        .then(response => console.log(response.data.data))
        .catch(err => err)
      setIsStart(false);
    }
  }, [propsArray]);

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