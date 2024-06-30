import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Restaurants from "./containers/Restaurants";
import Foods from "./containers/Foods";
import Orders from "./containers/Orders";

const router = createBrowserRouter([
  {
    path: "/restaurants",
    element: <Restaurants />,
  },
  {
    path: "/restaurants/:restaurantId/foods",
    element: <Foods />,
  },
  {
    path: "/orders",
    element: <Orders />,
  },
  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
