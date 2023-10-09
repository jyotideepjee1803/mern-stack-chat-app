import React, { useState } from 'react'
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

import Picker from "emoji-picker-react"

import styled from "styled-components";

export default function ChatInput(props) {
    const [msg, setMsg] = useState("");
    
    const [showPicker, setShowPicker] = useState(false);

    const sendChat = (e)=>{
        e.preventDefault();
        if(msg.length > 0){
            props.sendMessage(msg)
            setMsg("");
        }
    }

    return (
      <>
      {
        showPicker && (
          <EmojiContainer className="emoji-menu" >
            <Picker onEmojiClick={(emojiObject)=> setMsg((prevMsg)=> prevMsg + emojiObject.emoji)}/>
          </EmojiContainer>
        )
      }
        <Container>
            <form onSubmit={(e)=>sendChat(e)} className="input-container">
                <div className='emoji'>
                    <MdOutlineEmojiEmotions onClick={()=>{setShowPicker(!showPicker)}}/>
                </div>
                <input
                    type="text"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    placeholder='Message'
                />
                <button type='submit'>
                    <IoMdSend/>
                </button>
            </form>
        </Container>
      </>
    )
}
const EmojiContainer = styled.div`
  
  position : absolute;
  margin-top : 7.1rem;
  margin-left : 30px;
  z-index:1;
  
`
const Container = styled.div`
  display : flex;
  align-items: center;
  justify-content : center;
  background-color: #ededea;
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 2rem;
    gap: 1rem;
  }
  
  .input-container {
    width: 100%;
    border-radius: 0.5rem;
    border-top-right-radius : 3rem;
    border-bottom-right-radius : 3rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color : white;
    .emoji {
      position: relative;
      margin-top : 0.4rem;
      margin-left : 1rem;
      svg {
        color : #A8A8A8;
        font-size: 1.5rem;
        cursor: pointer;
      }

    }
    input {
      width: 100%;
      height: 60%;
      background-color: white;
      color: grey;
      border: none;
      border-radius : 0.2rem;
      font-size: 1.2rem;
      &::placeholder{
        font-size : 1rem;
      }
      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      border-radius: 0.5rem;
      width : 4rem;
      height : 2.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #128c7e;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        svg {
          font-size: 1.5rem;
        }
      }
      svg {
        font-size: 1.5rem;
        color: white;
      }
    }
  }
`;
