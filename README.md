# WhatsApp Web Clone

This project is a functional, full-stack clone of the WhatsApp Web interface, built with the MERN stack (MongoDB, Express, React, Node.js) and styled with Tailwind CSS. It provides a clean, real-time chat experience, allowing users to view conversations and send messages. A key feature is its ability to process and display message data from external JSON payloads, simulating the handling of webhook events from services like the WhatsApp Business API.

![WhatsApp Clone Demo](https://webclonewtsapp.netlify.app/)

---

## ✨ Features

* **Conversation List**: View all active conversations, sorted by the most recent message.
* **Real-Time Chat Interface**: Select a conversation to view the full message history.
* **Optimistic Message Sending**: Messages appear in the UI instantly for a smooth user experience.
* **Message Status Indicators**: See message status (sent, delivered, read) for messages you've sent.
* **Webhook Payload Processor**: An interface to upload JSON files containing message data, which are then processed by the backend and integrated into the chat history.
* **Responsive Design**: A mobile-first design that adapts for both conversation list and chat views.

---

## 🛠️ Tech Stack

* **Backend**:
    * **Node.js**: JavaScript runtime environment.
    * **Express.js**: Web framework for creating the API.
    * **MongoDB**: NoSQL database for storing messages.
    * **Mongoose**: Object Data Modeling (ODM) library for MongoDB.
    * **CORS & Dotenv**: For handling cross-origin requests and environment variables.

* **Frontend**:
    * **React.js**: A JavaScript library for building user interfaces.
    * **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
    * **Fetch API**: For making requests to the backend.

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have the following software installed on your machine:
* [Node.js](https://nodejs.org/en/) (which includes npm)
* [MongoDB](https://www.mongodb.com/try/download/community) (or a MongoDB Atlas account)

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    cd your-repo-name
    ```

2.  **Set up the Backend (`backend`):**
    * Navigate to the backend directory:
        ```sh
        cd backend
        ```
    * Install the dependencies:
        ```sh
        npm install
        ```
    * Create a `.env` file in the `backend` directory and add your environment variables:
        ```env
        # The connection string for your local or cloud MongoDB instance
        CONNECTION_URL=mongodb://localhost:27017/whatsapp-clone

        # The port for the backend server
        PORT=5000
        ```

3.  **Set up the Frontend (`frontend`):**
    * Navigate to the frontend directory from the root folder:
        ```sh
        cd frontend
        ```
    * Install the dependencies:
        ```sh
        npm install
        ```
    * Open `src/App.js` and update the `API_BASE_URL` with the URL of your running backend server. For local development, this will be `http://localhost:5000`.
        ```javascript
        // In frontend/src/App.js
        const API_BASE_URL = 'http://localhost:5000';
        ```

### Running the Application

You will need to run the backend and frontend in two separate terminal windows.

1.  **Start the Backend Server:**
    * From the `backend` directory, run:
        ```sh
        npm start
        ```
    * The server should now be running on `http://localhost:5000` (or the port you specified).

2.  **Start the Frontend Application:**
    * From the `frontend` directory, run:
        ```sh
        npm start
        ```
    * The React development server will start, and the application will open in your browser at `http://localhost:3000`.

---

## Usage

* **Sending Messages**: Select a conversation from the list on the left. Type your message in the input box at the bottom of the chat window and press Enter or click the send button.
* **Processing Webhook Data**:
    1.  Click the "Upload" icon in the header of the conversation list.
    2.  An uploader tool will appear. Click the "Choose Files" button.
    3.  Select one or more `.json` files that match the expected webhook payload structure.
    4.  The files will be sent to the backend's `/api/webhook` endpoint, processed, and the new messages will appear in the UI after a successful import.

---

## API Endpoints

The backend exposes the following API endpoints under the `/api` prefix:

* `GET /messages`: Fetches all messages and groups them into conversations.
* `POST /messages`: Sends a new message to a specific conversation.
* `POST /webhook`: A dedicated endpoint to receive and process message data payloads.
