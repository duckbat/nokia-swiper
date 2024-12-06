# Feedback Swiper local installation guide

This document will guide you on how to install and run the Feedback Swiper app backend and client projects locally.

## Prerequisites

Ensure that you have the following installed on your machine before proceeding:

- **Node.js** (v16.x or higher) and **npm** or **yarn**
- **MongoDB** (running locally or available as a service)
- **Git** (to clone the repository)

## Installation Steps

### Backend Setup

1. **Clone the Repository**

   First, clone the project repository from GitHub. Run the following command:

   ```bash
   git clone <repository-url>
   ```

   Replace `<repository-url>` with the actual URL of the repository.

2. **Navigate to the Backend Directory**

   Move into the backend directory of the cloned project:

   ```bash
   cd server
   ```

3. **Install Dependencies**

   Install the necessary Node packages using **npm** or **yarn**:

   ```bash
   npm install
   ```


4. **Create Environment Variables File**

   Create a `.env` file in the root directory of the backend project to set up the required environment variables. Add the following content to the `.env` file:

   ```env
    NODE_ENV=development
    PORT=3000
    DB_URL=<mongodb_url>
    OPENAI_API_URL=https://api.openai.com
    OPENAI_API_KEY=<your_openai_api_key>
   ```

   Replace `<your_openai_api_key>` and `<mongodb_url>` with your actual key and url.

5. **Run MongoDB**

   Ensure your MongoDB server is running. You can start MongoDB locally with the following command (if you have MongoDB installed locally):

   ```bash
   mongod
   ```

   If you're using a remote MongoDB server, make sure to update the `DB_URL` accordingly in your `.env` file.

6. **Start the Backend**

   To start the server, run:

   ```bash
   npm run dev
   ```

   The server should start on the port specified in your `.env` file (default is `3000`).

7. **Access the API**

   Once the server is running, the backend API should be accessible at:

   ```
   http://localhost:3000/api/v1
   ```

8. **Access API Documentation**

   Once the server is running, API Documentation can be accessible at:

   ```
   http://localhost:3000/api/docs
   ```

### Client Setup

1. **Navigate to the Client Directory**

   Open a new terminal and move into the client directory of the cloned project:

   ```bash
   cd client
   ```

2. **Install Dependencies**

   Install the necessary Node packages using **npm** or **yarn**:

   ```bash
   npm install
   ```

3. **Create Environment Variables File**

   Create a `.env` file in the root directory of the client project to set up the required environment variables. Add the following content to the `.env` file:

   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api/v1
   NEXT_PUBLIC_APP_NAME=Feedback Swiper
   ```

4. **Start the Client**

   To start the client application, run:

   ```bash
   npm run dev
   ```

   The client should start on `http://localhost:4000`



## Troubleshooting

- **MongoDB Connection Error**: If you receive an error related to connecting to MongoDB, ensure that the `DB_URL` in the `.env` file is correct and MongoDB is running.
- **OpenAI Key Missing**: If you receive an error related to OpenAI, make sure the `OPENAI_API_KEY` is correctly set in your `.env` file.

## Contact

If you encounter issues while setting up or running the project, please reach out to the development team for further support.

