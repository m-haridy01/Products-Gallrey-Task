import React from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Card({ item }) {
  const navigate = useNavigate();

function handleAddToCart(product) {
  const user = JSON.parse(localStorage.getItem("usersList"));
  if (!user) {
    navigate("/register");
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const isExist = cart.some((p) => p.id === item.id);

  if (isExist) {
    toast.error("This product is already in the cart!");
    return;
  }

  const newProduct = { ...item, quantity: 1 };
  const updatedCart = [...cart, newProduct];

  localStorage.setItem("cart", JSON.stringify(updatedCart));
  toast.success("Item added to cart ✅");
}

  return (
    <div className="rounded-lg border-10 border-green-400 dark:border-slate-800 shadow-lg overflow-hidden">
      <Link to={`/productDetails/${item?.id}`}>
        <img
          src={item?.image}
          alt={item?.title}
          className="h-[300px] object-cover w-full"
        />
      </Link>

      <div className="bg-green-400 dark:bg-slate-800 text-center ">
        <p className="text-white text-xl font-bold pt-6">{item?.category}</p>
        <p className="text-white text-sm font-light pt-6">
          {item?.title.split(" ", 3).join(" ")}
        </p>
        <button
          onClick={() => handleAddToCart(item)}
          className="border border-white rounded-lg px-3 text-white font-semibold mt-6 mb-6 hover:bg-white hover:text-main transition cursor-pointer"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}
