import React from "react";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import Header from "./components/header";
import Home from "./components/home";
import Add from "./components/add";
import ProductDetail from "./components/ProductDetail";
import Brands from "./components/brands";
import IndividualBrand from "./components/brand-individual";

function AppLayout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/add",
        element: <Add />,
      },
      {
        path: "/:id",
        element: <ProductDetail />,
      },
      {
        path : "/brands",
        element : <Brands/>
      },
      {
        path : "/brands/:brand",
        element : <IndividualBrand/>
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
