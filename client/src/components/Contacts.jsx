import React, { useEffect, useState } from 'react'
import {IoPersonCircle} from "react-icons/io5"
import Logout from './Logout';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import styled from "styled-components";

export default function Contacts(props) {
    const {contacts, currentUser, changeChat} = props;
    const [currentUserName, setCurrentUserName] = useState();
    const [currentSelected, setCurrentSelected] = useState();

    console.log(contacts);
    useEffect(()=>{
        if(currentUser){
            setCurrentUserName(currentUser.username);
        }
    },[currentUser])

    const changeCurrentChat = (index, contact)=>{
        setCurrentSelected(index)
        changeChat(contact)
    }

    return (
        <>
        {currentUserName && (
          <Container>
            <div className='contact-header'>
            <div className="current-user">
                <div className="avatar">
                    {
                      currentUser.avatarImage ? 
                      (<img src={currentUser.avatarImage} alt=""/>) : 
                      (<IoPersonCircle/>)
                    }
                </div>
                <div className="username">
                  <h2>{currentUserName}</h2>
                </div>
                
            </div>
            <div style={{position:"relative"}}>
              <Logout/>
            </div>
            </div>
            <div className="contacts">
              {contacts.map((contact, index) => {
                return (
                  <div
                    key={contact._id}
                    className={`contact ${
                      index === currentSelected ? "selected" : ""
                    }`}
                    onClick={() => changeCurrentChat(index, contact)}
                  >
                    <div className="avatar">
                        {props.loading && (
                            <Skeleton
                                circle
                                height="100%"
                                containerClassName="avatar-skeleton"
                            />
                        )}
                        {
                          contact.avatarImage ? 
                          (<img src={contact.avatarImage} alt=""/>) : 
                          (<IoPersonCircle/>)
                        }
                    </div>
                    <div className="username">
                      {props.loading ? <Skeleton width={70} /> : <h3>{contact.username}</h3>}
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        )}
      </>
    )
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: white;
  .contact-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color : #ededed; 
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 3rem;
      cursor: pointer;
      width: 100%;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
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
          color: black;
        }
      }
    }
    .selected {
      background-color: lightgrey;
    }
  }

  .current-user {
    background-color: transparent;
    display: flex;
    gap: 1rem;
    padding : 0.5rem;
    border-right-color
    height : 0.5rem;
    align-items: center;
    .avatar {
      img {
        height: 2rem;
        max-inline-size: 100%;
      }
      svg {
        color : #A0A0A0;
        font-size: 3rem;
        cursor: pointer;
      }
    }
    .username {
      h2 {
        color: grey;
      }
    }
    button{
      border: none;
      background: none;
      position : relative;
      margin-left : 100;
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
