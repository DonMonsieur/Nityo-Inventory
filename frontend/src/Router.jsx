import React, { Suspense, lazy } from "react";
import { createBrowserRouter, Route, Routes } from "react-router-dom"; // Import necessary components
import Product from "./components/Product";

const Layout = lazy(() => import("./components/Layout"));

const Router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Layout />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: <Product />,
      },
    ],
  },
]);

export default Router;
