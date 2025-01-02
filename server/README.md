# Library Management System (LMS)

## Purpose

The Library Management System (LMS) is a comprehensive platform designed to efficiently manage, track, and perform daily library operations with ease. It provides robust APIs for handling book, user, and borrowing operations seamlessly.

---

## [Visit The Site](https://assignment-11-batch-10.netlify.app)

---

## Key Features

- **Authentication**

  - Secure user authentication using JSON Web Tokens (JWT).
  - Middleware to protect private routes and ensure authorized access.

- **Book Management APIs**

  - Endpoints to add, update, and delete books with detailed information such as title, author, category, and quantity.
  - Fetch books by category or filter by availability.

- **Borrow Management APIs**

  - Borrow and return books with real-time updates on availability.
  - Prevents borrowing the same book without returning it first.

- **User Management APIs**

  - Manage user registration, login, and profile updates.
  - Maintain user borrowing history and restrictions.

- **Database Integration**

  - MongoDB for efficient storage and retrieval of books, users, and borrow data.

- **Cross-Origin Resource Sharing (CORS)**

  - Enable secure cross-origin requests to ensure smooth client-server communication.

---

## NPM Packages Used

### **Backend Frameworks and Utilities**

- `express`: Fast and robust web framework for Node.js.
- `dotenv`: Load environment variables from a `.env` file securely.
- `mongodb`: Driver for MongoDB to manage data storage and retrieval.
- `cookie-parser`: Parse cookies for handling user sessions.
- `jsonwebtoken`: Create and verify secure tokens for user authentication.
- `cors`: Enable secure cross-origin requests.

---

Thank you for Exploring the Library Management System (LMS)! 🚀
