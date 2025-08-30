import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";

import { RouterProvider } from "react-router/dom";
import Profile from "./pages/Profile";
import Create from "./pages/Create";
const Root = lazy(() => import("./Root"));
const Home = lazy(() => import("./pages/Home"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: Root,
      children: [
        { index: true, Component: Home },
        { path: "profile", Component: Profile },
        { path: "create", Component: Create },
        { path: "*", Component: ErrorPage },
      ],
    },
  ]);

  return (
    // <Suspense fallback={<div>Loading...</div>}>
    <RouterProvider router={router} />
    // </Suspense>
  );
}

export default App;
