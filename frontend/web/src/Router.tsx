import { createBrowserRouter } from "react-router-dom";
import AddMovie from "./pages/AddMovie";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "movies",
        element: <Movies />,
      },
      {
        path: "add",
        element: <AddMovie />,
      },
    ],
  },
]);

export default router;