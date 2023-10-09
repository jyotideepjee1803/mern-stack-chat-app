# MERN Stack Chat Application with Real-time One-to-One Messaging

![ChatApp Screenshot](/demo/login.png)
![ChatApp Screenshot](/demo/chat_page.png)
![ChatApp Screenshot](/demo/chats.png)

This MERN (MongoDB, Express.js, React.js, Node.js) stack chat application is designed to provide real-time one-to-one messaging with a user-friendly UI similar to WhatsApp. Users can create accounts, set profile images, and engage in seamless, real-time conversations with other users. The application uses Socket.io for real-time messaging.

## Features

- **One-to-One Real-time Chat**: Enjoy real-time messaging with other users, similar to WhatsApp.

- **User Authentication**: Create an account and log in securely.

- **Profile Image**: Set and display your profile image.

- **WhatsApp-like UI**: The application is designed with a user-friendly interface inspired by WhatsApp.

## Installation

To get started with this Chat Application, follow these steps:

1. Clone the repository:

   ```shell
   git clone https://github.com/jyotideepjee1803/mern-stack-chat-app.git

2. Install server dependencies :

    ```shell
    cd server
    npm install
    
3. Configure environment variables:
   Create a .env file in the server directory and set the following environment variables:
   
   ```shell
    MONGO_URL = <your_mongodb_connection_string>
    CLOUD_NAME = <your_cloudinary_cloud_name>
    API_KEY = <your_cloudinary_api_key>
    API_SECRET = <your_cloudinary_secret>

4. Install client dependencies :

    ```shell
    cd client
    npm install

5. Go to client/src/configs/envVariables.js :
    ``` 
    Either set APP_ENV = 'local'
    or import the value from .env file created in the folder client
6.  Start the server and client:
   In both the server directory and client:
    ```shell
      npm start
    
7.  Open your browser and visit http://localhost:3000 to use the Chat Application.


## Technologies Used

- **MongoDB**: A NoSQL database for storing user data and chat messages.
- **Express.js**: A Node.js web application framework for building the server.
- **React.js**: A JavaScript library for building the user interface.
- **Node.js**: A JavaScript runtime for building server-side applications.
- **Socket.io**: A library for real-time, bidirectional communication.
- **Cloudinary**: A cloud-based media management service for image upload and storage.

## Contributing
Contributions to this project are welcome! Feel free to submit issues or pull requests.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

Happy Chatting! 🚀📱💬


    
