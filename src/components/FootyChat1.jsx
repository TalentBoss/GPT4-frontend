import React, {useEffect, useRef, useState} from "react";
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


  console.log("propsArray", propsArray)
  const generateUniqueId = () => {
    const timeStamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);
    return `id-${timeStamp}-${hexadecimalString}`
  }


  const setNewState = async(isAI) => {
    const uniqueId = generateUniqueId();

    const newProps = {
      isAI: isAI,
      value: message,
      uniqueId: uniqueId
    }
    setMessage( '');
    setPropsArray([
      ...propsArray,
      newProps
    ]);

  }

  const sendMessageToGPT = (msg) => {
    console.log('@@@', msg)

    const response = msg;
    setMessage(response);
    await setNewState(() => true);
    return response;

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() !== '') {
      console.log('!!!!')
      await setNewState(false);
       await sendMessageToGPT('Hi how are you!');

    }
    else setMessage('');
  }

  const enterKeyPressHandle = async(e) => {
    if (e.keyCode === 13 && !e.shiftKey) await handleSubmit(e);
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
            <ChatStripe key={id} {...item }/>
          ))
        }
      </div>
       <form onSubmit={ handleSubmit } onKeyUp={ enterKeyPressHandle }>
          <textarea name="prompt" rows="4" cols="1" placeholder="Ask anything..." onChange={ handleMessageChange } value={ message }></textarea>
          <button type="submit">
            <img src="/send.svg" alt="send message"/>
          </button>
        </form>
    </>
  )
}

export default FootyChat