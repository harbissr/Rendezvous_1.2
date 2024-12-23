import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import AuthorizationPage from "./pages/AuthorizationPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "AuthorizationPage",
        element: <AuthorizationPage />,
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;