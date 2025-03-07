import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/layout";
import Dashboard from "../Pages/Dashboard/dashboard";
import ErrorPage from "../Components/ErrorBoundary/errorBoundary";
import Notfound from "../Pages/Notfound/notfound";

const AppRoutes = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "*",
        element: <Notfound />,
      },
    ],
  },
]);

export default AppRoutes;
