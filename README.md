# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# 🎓 Scholarship Management System (MERN Stack)

A comprehensive Scholarship Management System built with **React**, **Vite**, and **React Router**. This application streamlines the process of scholarship discovery, application submission, payment, and administrative management.

---

## 🚀 Features

### 👤 Role-Based Access Control (RBAC)
* **Admin:** Full access to manage users (roles), add/edit/delete scholarships, and view system-wide analytics.
* **Moderator:** Responsible for managing scholarship applications and monitoring all user reviews.
* **Student:** Can search scholarships, view details, apply (requires secure payment), and manage their own applications and reviews.

### 🛠 Core Functionalities
* **Secure Authentication:** Powered by Firebase with private and role-specific route protection.
* **Advanced Routing:** Nested layout structure for Main, Auth, and Dashboard views.
* **Payment Integration:** Secure checkout process for scholarship application fees.
* **Dynamic Dashboard:** Personalized dashboard experience based on the logged-in user's role.
* **Search & Filter:** Find scholarships easily by name, category, or university.

---

## 🚦 Routing Architecture

The application is structured using `createBrowserRouter` for clean and efficient navigation:

### 1. Main Layout (`RootLayout`)
* `/` - Home Page (Scholarship highlights)
* `/scholarships` - Browse all available scholarships
* `/scholarships/:id` - Detailed view of a specific scholarship
* `/checkout/:id` - Secure application fee payment (**Private**)
* `/payment-success` & `/payment-failed` - Transaction status pages

### 2. Auth Layout (`AuthLayouts`)
* `/login` - User sign-in
* `/register` - New account creation

### 3. Dashboard Layout (`DashboardLayout`)
All dashboard routes are protected.
* **Common:** `/dashboard` (My Profile)
* **Admin:** `/dashboard/add-scholarship`, `/dashboard/manage-scholarships`, `/dashboard/manage-users`, `/dashboard/analytics`
* **Moderator:** `/dashboard/manage-applications`, `/dashboard/reviews`
* **Student:** `/dashboard/my-applications`, `/dashboard/my-reviews`

---

## 🛠 Tech Stack

* **Frontend:** React (Vite)
* **Routing:** React Router v7
* **Styling:** Tailwind CSS & DaisyUI
* **Auth:** Firebase Authentication
* **State Management:** TanStack Query (React Query) & Axios

---

## 🔑 Environment Variables

To run this project, you will need to add the following environment variables to your `.env.local` file:

```env
# Firebase Configuration
VITE_apiKey=your_api_key
VITE_authDomain=your_auth_domain
VITE_projectId=your_project_id
VITE_storageBucket=your_storage_bucket
VITE_messagingSenderId=your_messaging_sender_id
VITE_appId=your_app_id

# Backend API URL
VITE_API_URL=http://localhost:5000

💻 Installation & Setup
Clone the Repository:

Bash

git clone [https://github.com/your-username/scholarship-management-client.git](https://github.com/your-username/scholarship-management-client.git)
Install Dependencies:

Bash

cd scholarship-management-client
npm install
Run Development Server:

Bash

npm run dev
Build for Production:

Bash

npm run build
📁 Project Structure
Plaintext

src/
├── components/      # UI components (Navbar, Footer, Cards)
├── layouts/         # Root, Dashboard, and Auth layouts
├── pages/           # Page components (Home, AllScholarships, etc.)
├── routes/          # Route definitions (router.jsx, PrivateRoute)
├── providers/       # Context Providers (AuthContext)
└── hooks/           # Custom Hooks (useAxiosSecure, useRole)


