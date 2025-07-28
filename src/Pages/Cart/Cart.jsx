import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import React, { useState, useEffect } from "react";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  function handleRemoveItem(indexToRemove) {
    const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    toast.success("Product removed from cart");
  }

  function updateQuantity(productId, type) {
    const updatedCart = cartItems.map((item) => {
      if (item.id === productId) {
        if (type === "increase") {
          toast.success("Quantity increased");
          return { ...item, quantity: item.quantity + 1 };
        } else if (type === "decrease") {
          if (item.quantity > 1) {
            toast.success("Quantity decreased");
            return { ...item, quantity: item.quantity - 1 };
          } else {
            toast.error("Cannot decrease quantity below 1");
          }
        }
      }
      return item;
    });

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  }

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(storedCart);
      setLoading(false);
    }, 700);
  }, []);

  useEffect(() => {
    document.title= 'Cart'
  }, [])

  const skeletons = Array.from({ length: 3 });

  return (
    <div className="my-[25vh] container space-y-4 px-4 md:px-0">
      {loading ? (
        skeletons.map((_, idx) => (
          <div
            key={idx}
            className="animate-pulse flex flex-col md:flex-row justify-between items-center gap-4 p-5 shadow-md border rounded-md bg-gray-100 dark:bg-slate-700"
          >
            <div className="flex items-center gap-6 w-full md:w-2/3">
              <div className="w-24 h-24 bg-gray-300 rounded"></div>
              <div className="flex flex-col gap-2 w-full">
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                <div className="h-3 bg-gray-300 rounded w-1/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/3"></div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-gray-300 rounded"></div>
              <div className="w-6 h-6 bg-gray-300 rounded"></div>
              <div className="w-8 h-8 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))
      ) : cartItems.length === 0 ? (
        <div className="text-center text-gray-500 text-lg font-semibold dark:text-white py-10">
          No items in the cart 🛒
        </div>
      ) : (
        cartItems.map((item, index) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row justify-between items-center gap-4 p-5 shadow-md border dark:border-slate-500 rounded-md bg-white dark:bg-slate-800"
          >
            <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-2/3">
              <div className="w-24 h-24 shrink-0">
                <img
                  className="w-full h-full object-cover rounded"
                  src={item?.image}
                  alt={item?.title}
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <p className="text-lg text-main font-semibold">{item?.title}</p>
                <p className="text-sm text-gray-600">
                  Category: <span className="font-medium">{item?.category}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Rating: <span className="font-medium">{item?.rating?.rate ?? "N/A"}</span>
                </p>
                <p className="text-base text-green-700 font-bold">
                  Price: {item?.price} $
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, "decrease")}
                  className="w-8 h-8 rounded bg-red-500 text-white text-xl font-bold cursor-pointer hover:bg-red-600"
                >
                  -
                </button>
                <span className="text-lg font-semibold dark:text-white">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, "increase")}
                  className="w-8 h-8 rounded bg-green-500 text-white text-xl font-bold cursor-pointer hover:bg-green-600"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => handleRemoveItem(index)}
                className="text-red-500 hover:text-red-700 cursor-pointer transition-colors"
                title="Remove item"
              >
                <Trash size={22} />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
