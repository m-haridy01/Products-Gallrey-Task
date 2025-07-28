import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Card from "../../Components/Card/Card";
import { toast } from "react-hot-toast";
import Loading from "../../Components/Loading/Loading";

export default function Home() {
  const [showDropdown, setShowDropdown] = useState(false);

  const [products, setProducts] = useState(null);
  const [searchWord, setSearchWord] = useState(null);
  const [searchedProducts, setSearchedProducts] = useState(null);

  async function GetAllProducts() {
    return await axios.get(`https://fakestoreapi.com/products`);
  }

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => GetAllProducts(),
    onSuccess: () => toast.success("Products loaded successfully!"),
    onError: () => toast.error("Failed to load products"),
  });

  function sortLowPrice() {
    let sorted = [...products].sort((a, b) => a.price - b.price);
    setProducts(sorted);
    toast.success("Sorted: Price Low to High");
  }

  function sortHighPrice() {
    let sorted = [...products].sort((a, b) => b.price - a.price);
    setProducts(sorted);
    toast.success("Sorted: Price High to Low");
  }

  function sortAToZ() {
    let sorted = [...products].sort((a, b) => a.title.localeCompare(b.title));
    setProducts(sorted);
    toast.success("Sorted: Name A to Z");
  }

  useEffect(() => {
    if (searchWord?.trim()) {
      const filtered = products?.filter((product) =>
        product.title.toLowerCase().includes(searchWord.toLowerCase())
      );
      setSearchedProducts(filtered);

      if (filtered?.length === 0) {
        toast.error("No products match your search");
      }
    } else {
      setSearchedProducts(null);
    }
  }, [searchWord, products]);

  useEffect(() => {
    if (data?.data) {
      setProducts(data.data);
    }
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  const skeletons = Array.from({ length: 8 });

  return (
    <section className="mt-25 mb-15">
      <form className="max-w-lg mx-auto my-10">
        <div className="flex ">
          <label
            htmlFor="search-dropdown"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search Products
          </label>

          <button
            type="button"
            onClick={() => setShowDropdown((prev) => !prev)}
            className="shrink-0 cursor-pointer z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200  dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white dark:border-gray-600"
          >
            Sort By
            <svg
              className="w-2.5 h-2.5 ms-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          {showDropdown && (
            <div className="absolute mt-12 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 z-50">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                <li>
                  <button
                    onClick={() => {
                      sortLowPrice();
                      setShowDropdown(false);
                    }}
                    type="button"
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Price : Low To High
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      sortHighPrice();
                      setShowDropdown(false);
                    }}
                    type="button"
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Price : High To Low
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      sortAToZ();
                      setShowDropdown(false);
                    }}
                    type="button"
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Name : A To Z
                  </button>
                </li>
              </ul>
            </div>
          )}

          <div className="relative w-3/4">
            <input
              onInput={(e) => setSearchWord(e.target.value)}
              type="search"
              id="search-dropdown"
              className="block p-2.5 w-full z-20  focus:outline-0 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300   dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
              placeholder="Search..."
              required
            />
          </div>
        </div>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-center items-center container ">
        {isLoading ? (
          skeletons.map((_, idx) => (
            <div
              key={idx}
              className="animate-pulse bg-gray-200 rounded-lg p-4 shadow-lg h-[420px]"
            >
              <div className="bg-gray-300 h-[250px] w-full rounded mb-4"></div>
              <div className="h-4 bg-gray-400 rounded w-3/4 mb-2 mx-auto"></div>
              <div className="h-3 bg-gray-300 rounded w-2/3 mb-4 mx-auto"></div>
              <div className="h-8 bg-gray-400 rounded w-1/2 mx-auto"></div>
            </div>
          ))
        ) : searchedProducts ? (
          searchedProducts.length === 0 ? (
            <h2 className="py-25 mx-auto  text-4xl text-center font-semibold text-main col-span-full ">
              No Products For This Search
            </h2>
          ) : (
            searchedProducts?.map((item) => <Card key={item.id} item={item} />)
          )
        ) : (
          products?.map((item) => <Card key={item.id} item={item} />)
        )}
      </div>
    </section>
  );
}
