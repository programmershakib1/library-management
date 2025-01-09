# Library Management System (LMS)

## Purpose

The Library Management System (LMS) is a cutting-edge platform designed to streamline the management of library operations. With a focus on efficiency, accessibility, and user experience, LMS empowers librarians and users alike to manage books, borrowing activities, and much more effortlessly. Whether you're a student looking for your next read or a librarian organizing thousands of titles, LMS has the tools to meet your needs with precision and ease.

---

## [Visit The Site](https://assignment-11-batch-10.netlify.app)

---

## Key Features

### **Book Management**

- Add, update, and delete books with detailed metadata such as title, author, category, quantity, and more.
- Search and filter books by category or availability, making it easy to find the perfect read.

### **Borrowing System**

- Borrow and return books with real-time updates on availability.
- Ensure users cannot borrow the same book twice without returning it first, promoting fair usage.

### **Gift a Book**

- Enable users to gift books to others with personalized messages and tracking.
- Manage gifting details like sender and recipient information, and return timelines seamlessly.

### **Authentication & Authorization**

- Secure user login and registration powered by Firebase Authentication.
- Protect private routes using JSON Web Tokens (JWT) to ensure data security.

### **User Management**

- Maintain detailed user profiles, borrowing history, and activity logs.
- Provide personalized dashboards for a seamless user experience.

### **Responsive Design**

- Fully optimized for all devices, ensuring a seamless experience whether on desktop, tablet, or mobile.

### **Dynamic Animations & User Experience**

- Enhance engagement with animations powered by Framer Motion and Lottie.
- Smooth transitions and captivating visuals ensure a modern, interactive interface.

### **Robust Backend**

- Efficient data handling and operations powered by MongoDB and Express.js.
- Well-structured APIs for handling books, users, borrowing, and more.

### **Real-Time Notifications**

- Keep users informed with toast notifications for actions like borrowing, returning, or gifting books.
- Alerts for overdue books and personalized reminders.

### **Backend API Endpoints**

- **Authentication:** Secure user authentication using JWT. Middleware protects private routes and ensures authorized access.
- **Book Management APIs:** Add, update, delete books with metadata. Fetch books by category or filter by availability.
- **Borrow Management APIs:** Borrow and return books, ensuring real-time availability updates.
- **User Management APIs:** Register users, login, and maintain profiles with borrowing history.

### **Database Integration**

- **MongoDB** for efficient data storage and retrieval of books, users, and borrowing data.

### **Cross-Origin Resource Sharing (CORS)**

- Secure cross-origin requests to ensure smooth client-server communication.

---

## NPM Packages Used

### **Core Functionality**

- `react-router-dom`: Smooth navigation and routing across the app.
- `firebase`: Provides authentication and real-time database capabilities.
- `axios`: Effortless API handling and secure server interactions.

### **Backend Frameworks and Utilities**

- `express`: Fast and robust web framework for Node.js.
- `dotenv`: Load environment variables from a `.env` file securely.
- `mongodb`: Driver for MongoDB to manage data storage and retrieval.
- `cookie-parser`: Parse cookies for handling user sessions.
- `jsonwebtoken`: Create and verify secure tokens for user authentication.
- `cors`: Enable secure cross-origin requests.

### **Styling and Design**

- `tailwindcss`: Utility-first CSS framework for sleek and responsive design.
- `daisyui`: Pre-built Tailwind CSS components for faster development.

### **Animations and Effects**

- `framer-motion`: High-performance and expressive animations.
- `animate.css`: Quick and easy CSS animations.
- `lottie-react`: Leverage Lottie animations for visually stunning effects.

### **Advanced Features**

- `react-awesome-reveal`: Adds modern and smooth reveal effects.
- `swiper`: Interactive carousels and sliders for book showcases.
- `react-rating-stars-component`: Easy-to-use star rating functionality.
- `react-countup`: Create dynamic, animated counters.
- `react-datepicker`: Effortless date selection with an elegant interface.

### **Interactive Elements**

- `react-icons`: Incorporate beautifully designed icons for an enhanced UI.
- `react-tooltip`: Provides helpful tooltips for a user-friendly experience.

### **Utilities**

- `date-fns`: Advanced date handling and manipulation.
- `prop-types`: Type-checking for better maintainability and reliability.
- `react-intersection-observer`: Optimize animations with on-screen detection.
- `react-hook-form`: For handling forms.

### **Notifications and Alerts**

- `react-hot-toast`: Sleek and customizable notifications.
- `sweetalert2`: Modern, customizable alert popups.

---

## Running the Project Locally

To get this project up and running on your local machine, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/library-management.git
   cd library-management
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure the environment variables:

   - Create a `.env` file in the root directory.
   - Add the necessary variables for MongoDB, Firebase, JWT.

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Start the backend server:
   ```bash
   node index.js
   ```

---

Thank you for Exploring the Library Management System (LMS)! 🚀
