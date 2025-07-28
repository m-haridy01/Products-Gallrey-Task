import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";
export default function ProductDetails() {
  let { id } = useParams();
  const navigate = useNavigate();

  async function GetSingleProducts() {
    return await axios.get(`https://fakestoreapi.com/products/${id}`);
  }

  function handleAddToCart(product) {
  const user = JSON.parse(localStorage.getItem("usersList"));
  if (!user) {
    navigate("/register");
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const isExist = cart.some((p) => p.id === data?.data.id);

  if (isExist) {
    toast.error("This product is already in the cart!");
    return;
  }

  const newProduct = { ...data?.data, quantity: 1 };
  const updatedCart = [...cart, newProduct];

  localStorage.setItem("cart", JSON.stringify(updatedCart));
  toast.success("Item added to cart ✅");
}

  const { data } = useQuery({
    queryKey: ["product", id],
    queryFn: () => GetSingleProducts(),
  });

useEffect(() => {
    document.title= 'Product Details'
  }, [])
  return (
    <div className="mt-25">
      <div className="flex min-h-screen items-center justify-center p-5">
        <div className="relative flex w-full max-w-[48rem] flex-row rounded-xl bg-white dark:bg-slate-800 bg-clip-border text-main shadow-md">
          <div className="relative m-0 w-2/5 p-10 shrink-0 overflow-hidden rounded-xl rounded-r-none bg-white bg-clip-border text-gray-400">
            <img
              src={data?.data.image}
              alt={data?.data.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="p-6">
            <h6 className="mb-4 block font-sans text-base font-semibold uppercase leading-relaxed tracking-normal text-pink-500 antialiased">
              {data?.data.category}
            </h6>
            <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
              {data?.data.title}
            </h4>
            <p className="mb-8 block font-sans text-base font-normal leading-relaxed text-gray-400 antialiased">
              {data?.data.description}
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p>
                  Price : <span className="text-gray-400"> {data?.data.price} $ </span>
                </p>
                <p>
                  Rate : <span className="text-gray-400"> {data?.data.rating.rate} </span>
                </p>
                <span>
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i}>
                      {i < Math.round(data?.data?.rating.rate) ? "⭐" : ""}
                    </span>
                  ))}
                </span>
              </div>

              <button
                type="button"
                onClick={()=>handleAddToCart(data?.data)}
                className="text-white bg-gradient-to-r cursor-pointer hover:bg-gradient-to-br focus:ring-4 focus:outline-none bg-main font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
