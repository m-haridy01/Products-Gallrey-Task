import React, { useContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home/Home";
import Products from "./Pages/Products/Products";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import NotFound from "./Pages/NotFound/NotFound";
import { HandleThemeContext } from "../Contexts/ThemeContextProvider";
import Cart from "./Pages/Cart/Cart";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Register from "./Pages/Register/Register";
import { Toaster } from "react-hot-toast";

export default function App() {
  let { theme } = useContext(HandleThemeContext);

  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "products", element: <Products /> },
        { path: "productDetails/:id", element: <ProductDetails /> },
        { path: "cart", element: <Cart /> },
        { path: "register", element: <Register /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  let client = new QueryClient();

  return (
    <div className={`${theme} relative`}>
      <QueryClientProvider client={client}>
        <RouterProvider router={routes} />
        <Toaster position="top-right" />
      </QueryClientProvider>
    </div>
  );
}
