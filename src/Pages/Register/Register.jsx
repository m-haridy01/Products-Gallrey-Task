import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { object, string } from "yup";
import axios from "axios";

export default function Register() {
  let navigate = useNavigate();
  let usersList = [];
  if (localStorage.getItem("usersList")) {
    const parsedList = JSON.parse(localStorage.getItem("usersList"));
    usersList = Array.isArray(parsedList) ? parsedList : [];
  }

  const passwordRegex = /^[A-Z][a-z0-9]{5,}$/;

  let validationSchema = object({
    name: string("Name Must Be String")
      .required("Name Is Requierd")
      .min(3, "Min Chars 3")
      .max(20, "Max Chars 20"),
    email: string("Email Must Be String")
      .required("Email Is Requierd")
      .email("Email Must Be Valid"),
    password: string("")
      .required("password Is Requierd")
      .matches(
        passwordRegex,
        "Password Must Start By Capital Letter And More Than 6 Chars"
      ),
  });

  const formikObject = useFormik({
    initialValues: {
      name: "",
      password: "",
      email: "",
    },
    validationSchema,
    onSubmit: register,
  });

  async function register(values) {
    try {
      let { data } = await axios.post(`https://fakestoreapi.com/users`, values);
      console.log(data);
      usersList.push(values);
      localStorage.setItem("usersList", JSON.stringify(usersList));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    document.title = "Register";
  }, []);

  return (
    <div className="h-screen fixed top-0 left-0 bottom-0 right-0 z-[60]  bg-white dark:bg-gray-950 flex justify-center items-center w-full">
      <form onSubmit={formikObject.handleSubmit}>
        <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-sm dark:bg-gray-800 ">
          <div className="space-y-4">
            <h1 className="text-center text-2xl font-semibold text-gray-600">
              Register
            </h1>
            {/* UserName */}
            <div>
              <label
                htmlFor="name"
                className="block mb-1 text-gray-600 font-semibold"
              >
                Username
              </label>
              <input
                name="name"
                value={formikObject.values.name}
                onChange={formikObject.handleChange}
                onBlur={formikObject.handleBlur}
                id="name"
                type="text"
                className="dark:border-gray-700 border border-slate-600 text-slate-600 px-4 py-2 outline-none rounded-md w-full"
              />
            </div>
            {formikObject.errors.name && formikObject.touched.name && (
              <p className="text-red-400 text-center font-semibold">
                {formikObject.errors.name}
              </p>
            )}
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block mb-1 text-gray-600 font-semibold"
              >
                Email
              </label>
              <input
                name="email"
                value={formikObject.values.email}
                onChange={formikObject.handleChange}
                onBlur={formikObject.handleBlur}
                id="email"
                type="email"
                className=" border border-slate-600 text-slate-600 px-4 py-2 outline-none rounded-md w-full"
              />
            </div>
            {formikObject.errors.email && formikObject.touched.email && (
              <p className="text-red-400 text-center font-semibold">
                {formikObject.errors.email}
              </p>
            )}
            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block mb-1 text-gray-600 font-semibold"
              >
                Password
              </label>
              <input
                name="password"
                value={formikObject.values.password}
                onChange={formikObject.handleChange}
                onBlur={formikObject.handleBlur}
                id="password"
                type="password"
                className="dark:border-gray-700 border border-slate-600 text-slate-600 px-4 py-2 outline-none rounded-md w-full"
              />
            </div>
            {formikObject.errors.password && formikObject.touched.password && (
              <p className="text-red-400 text-center font-semibold">
                {formikObject.errors.password}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="mt-4 w-full cursor-pointer bg-gradient-to-tr from-blue-600 to-indigo-600 text-indigo-100 py-2 rounded-md text-lg tracking-wide"
          >
            Register & Login
          </button>
        </div>
      </form>
    </div>
  );
}
