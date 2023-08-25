import React, { Suspense, lazy } from "react";
import { createBrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./components/Product";

const Layout = lazy(() => import("./components/Layout"));

const Router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense>
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
