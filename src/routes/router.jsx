import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import DashboardLayout from "../layouts/DashboardLayout";

// Main Pages
import AllScholarships from "../pages/AllScholarships/AllScholarships";
import Home from "../pages/Home/Home/Home";
import ScholarshipDetails from "../pages/ScholarshipDetails/ScholarshipDetails";

// Auth Pages
import AuthLayouts from "../layouts/AuthLayouts";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";

// Payment Pages
import Checkout from "../pages/Checkout/Checkout";
import PaymentSuccess from "../pages/Checkout/PaymentSuccess";
import PaymentFailed from "../pages/Checkout/PaymentFailed";

// Dashboard Pages
import MyProfile from "../pages/Dashboard/MyProfile/MyProfile";

// Admin
import AddScholarship from "../pages/Dashboard/Admin/AddScholarship";
import ManageScholarships from "../pages/Dashboard/Admin/ManageScholarships";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import Analytics from "../pages/Dashboard/Admin/Analytics";

// Moderator
import ManageApplications from "../pages/Dashboard/Moderator/ManageApplications";
import AllReviews from "../pages/Dashboard/Moderator/AllReviews";

// Student
import MyApplications from "../pages/Dashboard/Student/MyApplications";
import MyReviews from "../pages/Dashboard/Student/MyReviews";

// Error Page
import Error404 from "../pages/Error404/Error404";

// Private & Role Routes
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import ModeratorRoute from "./ModeratorRoute";
import StudentRoute from "./StudentRoute";
import ContactUs from "../pages/Home/Home/ContactUs";
import ProviderGuidelines from "../pages/Home/Home/ProviderGuidelines";
import PrivacyPolicy from "../pages/Home/Home/PrivacyPolicy ";
import TermsOfService from "../pages/Home/Home/TermsOfService";

export const router = createBrowserRouter([
  // ===============================
  // MAIN LAYOUT ROUTES
  // ===============================
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error404 />,
    children: [
      { index: true, element: <Home /> },

      { path: "scholarships", element: <AllScholarships /> },
      { path: "scholarships/:id", element: <ScholarshipDetails /> },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/provider-guidelines",
        element: <ProviderGuidelines />,
      },

      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },     
      {
      path: "/terms-of-service",
      element: <TermsOfService />,
      },

      // ✅ FIXED PAYMENT ROUTE
      {
        path: "checkout/:id",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },

      { path: "payment-success", element: <PaymentSuccess /> },
      { path: "payment-failed", element: <PaymentFailed /> },
    ],
  },

  // ===============================
  // AUTH ROUTES
  // ===============================
  {
    path: "/",
    element: <AuthLayouts />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },

  // ===============================
  // DASHBOARD (ROLE BASED)
  // ===============================
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // Common
      { index: true, element: <MyProfile /> },

      // ================= Admin Routes =================
      {
        path: "add-scholarship",
        element: (
          <AdminRoute>
            <AddScholarship />
          </AdminRoute>
        ),
      },
      {
        path: "manage-scholarships",
        element: (
          <AdminRoute>
            <ManageScholarships />
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "analytics",
        element: (
          <AdminRoute>
            <Analytics />
          </AdminRoute>
        ),
      },

      // ================= Moderator Routes =================
      {
        path: "manage-applications",
        element: (
          <ModeratorRoute>
            <ManageApplications />
          </ModeratorRoute>
        ),
      },
      {
        path: "reviews",
        element: (
          <ModeratorRoute>
            <AllReviews />
          </ModeratorRoute>
        ),
      },

      // ================= Student Routes =================
      // ================= Student Routes =================
      {
        path: "my-applications",
        element: (
          <StudentRoute>
            <MyApplications />
          </StudentRoute>
        ),
      },
      {
        path: "my-reviews",
        element: (
          <StudentRoute>
            <MyReviews />
          </StudentRoute>
        ),
      },
    ],
  },
]);
