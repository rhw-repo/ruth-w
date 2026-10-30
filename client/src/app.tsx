import type { JSX } from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from "@/layouts/root-layout.tsx";
import HomePage from "@/pages/home-page.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [{ index: true, Component: HomePage }],
  },
]);

function App(): JSX.Element {
  return <RouterProvider router={router} />;
}

export default App;
