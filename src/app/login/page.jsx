"use client";
import { login } from "@/api/api";
import Input from "@/components/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { toast } from "react-toastify";
import { setCookie } from "cookies-next";

const LoginPage = () => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const router = useRouter();

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
  return (
    <section className="bg-gray-50">
      <div className="max-w-md flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
        >
          <img className="w-40 h-8 mr-2" src="/logo.jpg" alt="logo" />
        </Link>
        <div className="w-full bg-white rounded-lg shadow">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
            </h1>
            <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
              <div>
                <label
                  for="username"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Username
                </label>
                <Input placeholder="username" type="text" ref={usernameRef} />
              </div>
              <div>
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>

                <Input
                  ref={passwordRef}
                  placeholder="password"
                  type="password"
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500">
                Don't have an account yet?{" "}
                <Link
                  href="/register"
                  className="font-medium text-red-600 hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
