"use client";
import { login, register } from "@/api/api";
import Input from "@/components/Input";
import Link from "next/link";
import { useRef } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

// {
// 	"username": "dude",
//     "password": "12345678",
//     "name": "dude crazy rich",
//     "email" : "dude@gmail.com",
//     "no_identitas" : "0123818u38123",
//     "no_phone" : "082344876382",
//     "address" : "JL. Majapahit"
// }

const LoginPage = () => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const no_identitasRef = useRef(null);
  const no_phoneRef = useRef(null);
  const addressRef = useRef(null);

  const router = useRouter();

  const handleRegister = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const no_identitas = no_identitasRef.current.value;
    const no_phone = no_phoneRef.current.value;
    const address = addressRef.current.value;

    register({
      username,
      password,
      name,
      email,
      no_identitas,
      no_phone,
      address,
    })
      .then((res) => {
        toast.success("Register success, silahkan login");
        router.push("/login");
      })
      .catch((error) => {
        if (Array.isArray(error?.response?.data?.message)) {
          error?.response?.data?.message.map((err) => {
            toast.error(err);
          });
        } else {
          toast.error(error?.response?.data?.message);
        }
      });
  };
  return (
    <section className="bg-gray-50">
      <div className="max-w-xl flex flex-col items-center justify-center px-6 py-8 mx-auto md:min-h-screen lg:py-0">
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
            <form onSubmit={handleRegister} className="space-y-4 md:space-y-6">
              <div>
                <label
                  for="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Name
                </label>
                <Input placeholder="name" type="text" ref={nameRef} />
              </div>
              <div>
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <Input placeholder="email" type="text" ref={emailRef} />
              </div>
              <div>
                <label
                  for="no_identitas"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  No Identitas
                </label>
                <Input
                  placeholder="no_identitas"
                  type="text"
                  ref={no_identitasRef}
                />
              </div>
              <div>
                <label
                  for="no_phone"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  No Phone
                </label>
                <Input placeholder="no_phone" type="text" ref={no_phoneRef} />
              </div>

              <div>
                <label
                  for="address"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Address
                </label>
                <Input placeholder="address" type="text" ref={addressRef} />
              </div>

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
                Have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-red-600 hover:underline"
                >
                  Login
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
