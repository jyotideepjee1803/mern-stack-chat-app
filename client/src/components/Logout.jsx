import React from "react";
import { useNavigate } from "react-router-dom";
import {GoSignOut} from "react-icons/go"
import { logoutRoute } from "../utils/APIroute";
import styled from "styled-components";
import axios from "axios";

export default function Logout() {
    const navigate = useNavigate();

    const handleClick = async () => {
        const user = await JSON.parse(localStorage.getItem('chat-app-user'));
        const id = user._id;

        const data = await axios.get(`${logoutRoute}/${id}`);
        
        if (data.status === 200) {
            localStorage.clear();
            navigate("/login");
        }
    };
    
    return (
        <Button onClick={handleClick}>
            <GoSignOut/>
        </Button>
    );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: grey;
  }
`;