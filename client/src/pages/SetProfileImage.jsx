import React,{useState,useEffect} from 'react'
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";

import { setAvatarRoute, uploadMedia } from '../utils/APIroute';
import axios from "axios";

export default function SetProfileImage() {
    const navigate = useNavigate();

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleSelectFile = (e) =>{
      console.log(e);
      setFile(e.target.files[0]);
    }

    const setProfilePicture = async (img) => {
      if (img === null) {
        toast.error("Please select an image", toastOptions);
      } 
      else {
        const user = await JSON.parse(localStorage.getItem('chat-app-user'));
  
        const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
          image: img.secure_url,
        });
  
        if (data.isSet) {
          user.isAvatarImageSet = true;
          user.avatarImage = data.image;
          localStorage.setItem('chat-app-user',JSON.stringify(user));
          navigate("/");
        } 
        else {
          toast.error("Error setting profile image. Please try again.", toastOptions);
        }
      }
    };

    const handleUpload = async () => {
      try {
        setLoading(true);
        
        const data = new FormData();
        data.append("image", file);
        console.log(file);

        const response = await axios.post(uploadMedia, data);
        console.log('Image uploaded successfully:', response.data);
        setProfilePicture(response.data);
      }

      catch (error) {
        toast.error(error.message, toastOptions);
      }
      finally {
        setLoading(false);
      }
    };

    const existing = ()=>{
        if (!localStorage.getItem('chat-app-user'))
            navigate("/login");
    }

    useEffect(()=>{
        existing()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [])

  
    const toastOptions = {
      position: "bottom-right",
      autoClose: 8000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    };


    return (
        <FormContainer>
            <div>
                {file && 
                  <center> 
                    <img src={URL.createObjectURL(file)} alt="" height="200" width="200"/>
                  </center>
                }
                <input type="file" id="img" onChange={handleSelectFile} style={{display:"none"}}/>
                <label htmlFor="img">Click me to upload Profile Picture</label>
            
            {file && (
              <>
                <button onClick={handleUpload} className="btn-green">
                  {loading ? "uploading..." : "Save"}
                </button>
              </>
            )}
            </div>
            <ToastContainer />
        </FormContainer>
    )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background: linear-gradient(
    to bottom,
    #128c7e 0%,
    #128c7e 20%,
    #DCDCDC 20%,
    #DCDCDC 100%
  );
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: grey;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #ece5dd;
    padding: 3rem 5rem;
  }
  label {
    background-color: white;
    padding: 1rem;
    border: 0.1rem solid white;
    border-radius: 0.4rem;
    color: grey;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid 	#25d366;
      outline: none;
    }
  }
  button {
    background-color: #128c7e;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #075e54;
    }
  }
  span {
    color: grey;
    text-transform: uppercase;
    a {
      color: #128c7e;
      text-decoration: none;
      font-weight: bold;
    }
  }
`
