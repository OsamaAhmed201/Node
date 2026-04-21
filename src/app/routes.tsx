import { createBrowserRouter } from "react-router";
import HomePage from "./pages/HomePage";
import TX360Page from "./pages/TX360Page";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/tx360",
    Component: TX360Page,
  },
]);
