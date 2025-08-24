
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from "./Root";
import Home from "./pages/Home";
import About from "./pages/About";
function App() {
  const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      {
        // path: "auth",
        // Component: auth,
        children: [
          // { path: "login", Component: Login },
          // { path: "register", Component: Register },
        ],
      },
      {
        path: "concerts",
        children: [
          // { index: true, Component: ConcertsHome },
          // { path: ":city", Component: ConcertsCity },
          // { path: "trending", Component: ConcertsTrending },
        ],
      },
    ],
  },
]);


  return (
    <RouterProvider router={router} />
  );
}

export default App;
