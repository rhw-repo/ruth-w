import type { JSX } from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import HomePage from "@/pages/home-page.tsx";

const router = createBrowserRouter([{ path: "/", Component: HomePage }]);

function App(): JSX.Element {
  return <RouterProvider router={router} />;
}

export default App;
