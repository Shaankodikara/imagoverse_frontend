import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from "../assets/Logo.svg";

export const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;

    if (email === "") {
      setEmailError("Email cannot be empty");
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      valid = false;
    } else {
      setEmailError("");
    }

    if (password === "") {
      setPasswordError("Password cannot be empty");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) {
      return;
    }

    axios.post(`https://d4b6-13-51-207-98.ngrok-free.app/auth/signin`, {
      email,
      password,
    }).then(res => {
      if (res.data.status === 'ok') {
        toast.success("Login successful!");
        navigate('/');
      } else {
        toast.error(res.data.message);
      }
    }).catch(err => {
      if (err.response && err.response.data) {
        toast.error(err.response.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    });
  };

  return (
    <>
      <div className="h-screen flex">
        <div className="w-1/2 h-full bg-teal-600 flex justify-center items-center">
          <div className="flex-col justify-center items-center">
            <div className="flex justify-center items-center">
              <img src={logo} alt="logo" className="w[100px] h[100px] py-5" />
            </div>
            <h1 className="text-3xl text-white font-bold">Imago Verse</h1>
          </div>
        </div>

        <div className="w-1/2 h-full bg-slate-300 flex justify-center items-center">
          <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl text-center font-semibold leading-tight tracking-tight md:text-2xl text-white">
                Sign in to your account
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    id="email"
                    className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-teal-500 focus:border-teal-500"
                    placeholder="name@company.com"
                    required=""
                  />
                  {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-teal-500 focus:border-teal-500"
                    required=""
                  />
                  {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <p className="text-sm font-light text-gray-400">
                      Don't have an account? &nbsp;
                      <Link
                        to="/signup"
                        className="font-medium hover:underline text-teal-500"
                      >
                        Sign up
                      </Link>
                    </p>
                  </div>
                  <Link to="/forgot-password" className="text-sm font-medium hover:underline text-blue-500">Forgot password?</Link>
                </div>
                <button
                  type="submit"
                  className="w-full font-medium rounded-lg text-sm px-5 py-2.5 text-white text-center bg-teal-600 hover:bg-teal-700 focus:ring-teal-800"
                >
                  Sign In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
