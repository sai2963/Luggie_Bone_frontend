import React from "react";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import Header from "./components/header";
import Home from "./components/home";
import Add from "./components/add";
import ProductDetail from "./components/ProductDetail";
import Brands from "./components/brands";
import IndividualBrand from "./components/brand-individual";
import Categories from "./components/categories";
import Category_Individual from "./components/category-individual";
import Cart from "./components/cart";

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
      {
        path : "/categories",
        element : <Categories/>
      },
      {
        path : "/categories/:category",
        element : <Category_Individual/>
      },
      {
        path : "/cart",
        element : <Cart/>
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
