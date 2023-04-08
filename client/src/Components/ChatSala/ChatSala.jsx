import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import styles from "./chat.module.css"

const socket = io(`http://localhost:3001`);

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
const user = 'Ejemplo'

  const handleSubmit = (e) => {

    e.preventDefault();

    if (message !== "") {
      socket.emit("message", message, user );
      const newMessage = {
        body: message,
        from: "Me",
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  useEffect(() => {
    const receiveMessage = (message) => {
      setMessages([...messages, message]);
    };

    socket.on("message", receiveMessage);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        // Enviar mensaje al servidor para mantener la conexión activa
        socket.emit('keepalive');
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);


    return () => {
      socket.off("message", receiveMessage);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [messages]);

  return (
    <div className={styles.chatcontainer} >
      <div className={styles.chatHeader}>
        <h1 className={styles.titleH} >Chat Portamor</h1>
        </div> 
        <div className={styles.chatHistory} >
        <ul className={styles.ul}>
          {messages.map((message, index) => (
            <li
              key={index}
              className={`${message.from === "Me" ? styles.myMessage : styles.receivedMessage}`}

            >
              <b>{message.from}</b>:{message.body}
            </li>
          ))}
        </ul>
        </div>
        <div>
      <form onSubmit={handleSubmit}>
      
        <input
          name="message"
          type="text"
          placeholder="Write your message..."
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          autoFocus
          className={styles.inputText}
        />
      </form>
      </div>
    </div>
  );
};

export default Chat;