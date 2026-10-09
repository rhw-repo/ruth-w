import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import HomePage from "./pages/HomePage.tsx";

const router = createBrowserRouter([{ path: "/", Component: HomePage }]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
