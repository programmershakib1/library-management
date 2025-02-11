# 📚 Library Management System (LMS)

## 📌 Project Overview

The **Library Management System (LMS)** is a **comprehensive and user-friendly platform** designed to **streamline library operations**. Whether you're a student searching for books or a librarian managing an extensive collection, LMS provides the **tools to manage books, borrowing, and user activities with efficiency and ease**.

With a focus on **accessibility, security, and modern user experience**, LMS simplifies library management for **students, librarians, and administrators**.

### 🌟 Key Benefits:

- 📖 **For Students**: Search for books, borrow, return, and track your borrowing history easily.
- 🏛️ **For Librarians**: Organize and manage books, track lending activities, and ensure smooth library operations.
- 🔐 **For Admins**: Oversee book inventory, monitor user activities, and enforce borrowing policies.

LMS is built with a **modern, responsive, and mobile-friendly interface**, making it **accessible across all devices**.

---

## [🚀 Visit The Site](https://lms0.netlify.app)

---

## 🛠️ Technologies Used

### **Frontend:**

- **React.js** – Component-based UI development
- **React Router DOM** – Client-side navigation
- **Tailwind CSS & DaisyUI** – Modern UI design
- **Framer Motion & Lottie React** – Smooth animations

### **Backend & Database:**

- **Node.js & Express.js** – Backend framework & API development
- **MongoDB** – NoSQL database for efficient data storage

### **Authentication & Security:**

- **Firebase Authentication** – Secure user authentication
- **JWT (JSON Web Tokens)** – Role-based authentication system

### **Other Key Technologies:**

- **Axios** – API requests handling
- **TanStack Query** – Efficient data fetching & caching
- **dotenv & Cors** – Environment variables & security
- **React Hook Form** – Advanced form validation

---

## ✨ Core Features

### **Book Management**

✅ Add, update, and delete books with detailed metadata (title, author, category, quantity, etc.).  
✅ Search and filter books by **category or availability** for an easy browsing experience.

### **Borrowing System**

✅ Users can **borrow and return books** with real-time availability updates.  
✅ Ensures **users cannot borrow the same book twice** without returning it first.

### **Gift a Book**

✅ Users can **gift books** to others with personalized messages and tracking.  
✅ Manage recipient details and return timelines seamlessly.

### **User Authentication & Security**

✅ Secure login and registration using **Firebase Authentication**.  
✅ JWT-based authentication for **role-based access control** (Users, Librarians, Admins).

### **User Management**

✅ Detailed **user profiles**, borrowing history, and activity logs.  
✅ Personalized **user dashboards** for an enhanced experience.

### **Dynamic & Interactive UI**

✅ Fully **responsive design**, optimized for desktop, tablet, and mobile.  
✅ Modern animations with **Framer Motion & Lottie** for smooth user interactions.

### **Real-Time Notifications & Alerts**

✅ Users receive **notifications** for borrowing, returning, and gifting books.  
✅ Alerts for **overdue books** and personalized reminders.

### **Admin & Librarian Dashboard**

✅ **Manage books, borrowing activities, and user accounts** efficiently.  
✅ Ensure **borrow limits & library rules** are enforced.

### **Robust API System**

✅ Secure **RESTful API endpoints** for handling books, users, and borrowing.  
✅ Efficient database integration using **MongoDB & Express.js**.

---

## 📦 Dependencies

### **Frontend Dependencies**

- `react-router-dom` – Client-side routing
- `firebase` – Authentication and database integration
- `axios` – API communication
- `framer-motion` – UI animations
- `lottie-react` – Interactive animations
- `tailwindcss & daisyui` – Modern styling

### **Backend Dependencies**

- `express` – Lightweight Node.js framework
- `mongodb` – Database management
- `dotenv` – Manage environment variables
- `jsonwebtoken (JWT)` – Authentication security
- `cookie-parser` – Secure user sessions
- `cors` – Enable secure API requests

### **Other Utilities**

- `react-hook-form` – Form validation
- `react-icons` – UI icons
- `react-hot-toast` – User-friendly notifications
- `react-tooltip` – Interactive tooltips
- `swiper` – Carousel sliders for book showcases
- `date-fns` – Date and time formatting
- `sweetalert2` – Customizable pop-up alerts

---

## 🛠️ How to Run the Project Locally

To get this project up and running on your local machine, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/programmershakib1/lms.git
   cd lms
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure the environment variables:

   - Create a `.env` and `.env.local` file in the root directory server and client.
   - Add the necessary variables for MongoDB, Firebase, JWT.
   - 🚨 **Important:** Never expose your `.env` and `.env.local` file in public repositories. Use `.gitignore` to keep it secure.

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Start the backend server:
   ```bash
   node index.js
   ```

---

## 🔗 Live Project & Resources

🌍 **Live Site:** [LMS](https://library-management-system-lms1.netlify.app/)

📂 **GitHub Repository:** [GitHub Link](https://github.com/programmershakib1/lms)

---

Thank you for Exploring the Library Management System (LMS)! 🚀
