import React, { useState, useEffect, useRef} from "react";
import axios from "axios";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import { getMessageRoute, sendMessageRoute } from "../utils/APIroute";
import { v4 as uuidv4 } from "uuid";
import {IoPersonCircle} from "react-icons/io5"

import "react-toastify/dist/ReactToastify.css";


export default function ChatContainer(props) {
    const scrollRef = useRef();
    const [messages, setMessages] = useState([]);
    const [incoming, setIncoming] = useState(null);

    const getAllMessages = async()=>{
        const user = await JSON.parse(localStorage.getItem('chat-app-user'));
       
        const res = await axios.post(getMessageRoute,{
            from : user._id,
            to : props.currentChat._id
        })
        console.log(res.data);
        setMessages(res.data);
    }
    
    useEffect(()=>{
        if(props.currentChat){
            getAllMessages();
        }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.currentChat])


    const handleSend = async(msg) =>{
        const user = await JSON.parse(localStorage.getItem('chat-app-user'));

        await axios.post(sendMessageRoute,{
            from : user._id,
            to : props.currentChat._id,
            message : msg
        });
        props.socket.current.emit("send-msg",{
            to : props.currentChat._id,
            from : user._id,
            message : msg
        });

        props.socket.current.emit("send-notification",{
            to : props.currentChat._id,
            from : user._id,
            message : msg
        });

        const updatedMessages = [...messages];
        updatedMessages.push({fromSelf : true, message : msg});
        setMessages(updatedMessages)
    }

    useEffect(()=>{
        if(props.socket.current){
            props.socket.current.on("msg-recieve", (msg)=>{
                setIncoming({fromSelf : false, message: msg})
            });
        }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

    useEffect(()=>{
        incoming && (setMessages((prev) => [...prev, incoming]));
    },[incoming]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
      <>        
        <Container>
            <div className="chat-header">
                <div className="user-details">
                <div className="avatar">
                  {
                     props.currentChat.avatarImage ? 
                    (<img src={props.currentChat.avatarImage} alt=""/>) : 
                    (<IoPersonCircle/>)
                  }
                </div>
                <div className="username">
                    <h3>{props.currentChat.username}</h3>
                </div>
                </div>
            </div>
            <div className="chat-messages">
                {
                    messages.map((message)=>{
                        return(
                            <div ref={scrollRef} key={uuidv4()}>
                                <div className={`message ${message.fromSelf ? "sended" : "recieved"}`}>
                                    <p>{message.message}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <ChatInput sendMessage={handleSend}/>
        </Container>
        {/* <ToastContainer/> */}
      </>
    )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 10% 75% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem 0 1rem;
    background-color :#075e54;
    border-left-width: medium
    border-color : white;
    .user-details {
      display: flex;
      align-items: center;
      height : 0.5rem;
      .avatar {
        img {
          height: 3rem;
          width : 3rem;
          border-radius : 3rem;
        }
        svg {
          color : #A0A0A0;
          font-size: 3rem;
          cursor: pointer;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    color : black;
    background-color : #ece5dd;
    &::-webkit-scrollbar {
      margin-top: 10px;
      margin-bottom: 10px;
      width: 0.2rem;
     
      &-thumb {
        background-color: grey;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: inline-block;
      align-items: center;
      height : 100%;
      border-bottom-left-radius : 0.5rem;
      border-bottom-right-radius : 0.5rem;
      padding : 0.5rem;
      .content {
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      float : right;
      justify-content: flex-end;
      background-color: #dcf8c6;
      padding-right : 1rem;
      max-width : 60%;
      border-top-left-radius: 0.5rem;
    }
    .recieved {
      padding-left : 1rem;
      justify-content: flex-start;
      max-width : 60%;
      background-color: #ffff;
      border-top-right-radius: 0.5rem;
    }
  }
`;
