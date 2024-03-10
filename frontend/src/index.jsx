/* eslint-disable react-refresh/only-export-components */
import { createRoot } from "react-dom/client";
import { Navbar } from "./components/Navbar";
import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  //   createRoutesFromElements,
} from "react-router-dom";
import Home from "./Pages/Home.jsx";
import { WorkoutContextProvider } from "./context/WorkoutContext";

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <h1>Error</h1>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);

const root = createRoot(document.getElementById("root"));

root.render(
  <WorkoutContextProvider>
    <RouterProvider router={appRouter} />
  </WorkoutContextProvider>
);
