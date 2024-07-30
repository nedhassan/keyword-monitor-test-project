# Keyword Monitoring API

## Description

The Keyword Monitoring API is a tool designed to monitor social media posts based on specific keywords. It provides RESTful endpoints for managing keywords, retrieving posts, and receiving real-time updates. This project is built using Node.js, express js and TypeScript.

## Features

Here are the updated features with different keywords:

- **Secure Access:** Provides token-based authentication to ensure secure interaction with the API.
- **Keyword Tracking:** Add and manage keywords for monitoring specific post.
- **Content Retrieval:** Access posts that include specified keywords, with options to filter by platform and date range.
- **Live Updates:** Receive notifications about the latest posts that match your monitored keywords.
- **Activity Logging:** Detailed logging of API activities for monitoring and debugging purposes.

## Technologies Used

- **Node.js:** JavaScript runtime for building server-side applications.
- **Express.js:** Web framework for building RESTful APIs.
- **TypeScript:** A superset of JavaScript that adds static typing.
- **dotenv:** Module for loading environment variables from a `.env` 
- **Morgan:** HTTP request logger middleware for Node.js.

## Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Create a `.env` file:**

   Set up your environment variables by creating a `.env` file in the root directory. Include the necessary configurations like your database URL, authentication secrets, etc.

   ```env
   USERNAME=username
   PASSWORD=password
   JWT_SECRET=secret_key
   PORT=4000
   ```

## Running the Server

To start the server in development mode, use the following command:

```bash
npm run dev
```

This command uses `nodemon` to automatically restart the server when changes are detected in the source files.

## API Endpoints

- **Authentication:**
  - `POST /api/auth`: Authenticate and receive a token.

- **Keywords:**
  - `POST /api/keywords`: Add a new keyword.
  - `GET /api/keywords`: List all keywords.

- **Posts:**
  - `GET /api/posts`: Retrieve posts with specified keywords.
  - `GET /api/recent-posts`: Get recently added posts.

- **Logs:**
  - `GET /api/app-logs`: Access the logs of all API requests.


# API Documentation

Welcome to the API documentation. This document outlines the available endpoints, request formats, and necessary authentication for interacting with the API.

## Authentication

To interact with the API, you need to obtain an authentication token. This token is required in the header of all subsequent requests.

### Get Token
**Endpoint:**
```http
POST /api/auth
```

**Response:**
```json
{
  "token": "test test-token"
}
```

Use this token for authentication in all API requests by including it in the `Authorization` header as follows:
```http
Authorization: Bearer test-token
```

---

## Endpoints

### Keywords

#### 1. Add Keyword
**Endpoint:**
```http
POST /api/keywords
```

**Request Body:**
```json
{
  "keyword": "example"
}
```

**Headers:**
```http
Authorization: Bearer <Token from POST /api/auth>
```

#### 2. List Keywords
**Endpoint:**
```http
GET /api/keywords
```

**Headers:**
```http
Authorization: Bearer <Token from POST /api/auth>
```

### Posts

#### 1. Get Posts with Keywords
**Endpoint:**
```http
GET /api/posts
```

**Headers:**
```http
Authorization: Bearer <Token from POST /api/auth>
```

#### 2. Get Recently Added Posts
**Endpoint:**
```http
GET /api/recent-posts
```

**Headers:**
```http
Authorization: Bearer <Token from POST /api/auth>
```

### Logs

#### 1. Get All API Logs
**Endpoint:**
```http
GET /api/app-logs
```

**Headers:**
```http
Authorization: Bearer <Token from POST /api/auth>
```

---

## Notes

- All requests that require authentication must include the `Authorization` header with the format `Bearer <token>`.
- The token obtained from the `/api/auth` endpoint is used to authorize all other requests.
