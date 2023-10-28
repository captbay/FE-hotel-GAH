"use client";

import { Eye, EyeOff } from "lucide-react";
import { login } from "@/api/api";
import Input from "@/components/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { setCookie } from "cookies-next";

const LoginPage = () => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    try {
      const res = await login(username, password);
      if (res.status === 200 || res.status === 201) {
        toast.success("Login success");
        setCookie(
          "token",
          {
            token: res.data.access_token,
            role: res.data.role,
            name: res.data.data.name,
          },
          {
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
          }
        );
        router.push("/dashboard");
      }
    } catch (error) {
      if (Array.isArray(error?.response?.data?.message)) {
        error?.response?.data?.message.map((err) => {
          toast.error(err);
        });
      } else {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <section className="bg-blue-100 flex flex-col md:flex-row min-w-max min-h-screen gap-20">
      <div
        className="w-full md:w-1/2 p-6 md:p-12 flex items-center justify-center"
        style={{
          backgroundImage: 'url("/images/superior.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div>
          <h1 className="text-2xl md:text-4xl font-bold text-blue-800 mb-2 md:mb-4">
            Welcome Back
          </h1>
          <p className="text-base md:text-lg text-blue-600">
            Sign in to your account
          </p>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
        <div className="max-w-md bg-white rounded-lg shadow p-6 md:p-12 space-y-4 md:space-y-6">
          <Link href="/" className=" mb-6 text-2xl font-semibold text-gray-900">
            <img className="w-40 h-8 mx-auto" src="/logo.jpg" alt="logo" />
          </Link>
          <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-blue-800"
              >
                Username
              </label>
              <Input
                placeholder="Enter your username"
                type="text"
                ref={usernameRef}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-blue-800"
              >
                Password
              </label>
              <div className="relative">
                <Input
                  ref={passwordRef}
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Sign in
            </button>
            <p className="text-sm font-light text-blue-600">
              Don't have an account yet?{" "}
              <Link
                href="/register"
                className="font-medium text-green-500 hover:underline"
              >
                Sign up here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
