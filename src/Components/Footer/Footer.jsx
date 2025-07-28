import React from "react";

export default function Footer() {
  return (
    <footer className=" py-10 bg-slate-300 dark:bg-slate-800">
      <div className="container space-y-5 ">
        <div>
          <h2 className="text-2xl text-slate-600 font-semibold ">
            Get The Products Gallery App
          </h2>
          <p className="text-slate-400 my-2">
            We Will Send You a Link Open It In Your Phone To Download The App
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pl-10">
          <input
            className="px-2 py-1.5 rounded-md focus:outline-0 sm:grow-1 dark:border-0 border-2 border-slate-200 bg-white dark:bg-slate-400"
            type="email"
            placeholder="Email..."
          />
          <button className="bg-main py-2 text-sm cursor-pointer px-3 text-white rounded-md ">
            Share App Link
          </button>
        </div>
      </div>
    </footer>
  );
}
