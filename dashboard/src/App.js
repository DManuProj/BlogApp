import "./App.css";
import Layout from "./components/Layout";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import StarterPage from "./pages/StarterPage";
import { createTheme } from "@mui/material/styles";
import AdminDashboard from "./pages/AdminDashboard";
import OtpVerification from "./pages/OtpVerification";
import LoginForm from "./components/form/LoginForm";
import RegisterForm from "./components/form/RegisterForm";
import Analytics from "./pages/Analytics";
import Content from "./pages/Content";
import Followers from "./pages/Followers";
import Settings from "./pages/Settings";
import CreatePost from "./pages/CreatePost";
import DashboardHome from "./pages/DashboardHome";
import { MantineProvider } from "@mantine/core";

// Create a custom theme with Poppins font
export const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // Disable uppercase transformation
        },
      },
    },
  },
});

function App() {
  const router = createBrowserRouter([
    {
      path: "/",

      element: <Navigate to="/dashboard" />,
      index: true,
    },
    {
      path: "/auth",
      element: (
        <Layout>
          <StarterPage />
        </Layout>
      ),
    },

    {
      path: "/otp-verification",
      element: <OtpVerification />,
    },
    {
      path: "/dashboard",
      element: (
        <Layout>
          <AdminDashboard />
        </Layout>
      ),
      children: [
        {
          index: true,
          path: "/dashboard",
          element: <Navigate to="home" replace />, // Redirects from /dashboard to /dashboard/home
        },

        {
          path: "home",
          element: <DashboardHome />,
        },
        {
          path: "analytics",
          element: <Analytics />,
        },
        {
          path: "content",
          element: <Content />,
        },
        {
          path: "followers",
          element: <Followers />,
        },
        {
          path: "create-post",
          element: (
            <MantineProvider>
              <CreatePost />
            </MantineProvider>
          ),
        },
        {
          path: "settings",
          element: <Settings />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
