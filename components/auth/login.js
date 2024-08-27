"use client";

import Link from "next/link";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/AuthContext";

export default function Login() {
  const [formLogin, setFormLogin] = useState({
    email: "",
    pwd: "",
  });

  const [errors, setErrors] = useState({});
  const router = useRouter();
  const { login } = useContext(UserContext);

  const handleChangeForm = (e) => {
    setFormLogin({ ...formLogin, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors = {};
    if (!formLogin.email) errors.email = "Email is required";
    if (!formLogin.pwd) errors.pwd = "Password is required";
    return errors;
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrors(validateForm());

    const formComplete = formLogin.email && formLogin.pwd;
    if (formComplete) {
      try {
        const response = await fetch(
          "https://artstore.infinityfreeapp.com/backend/auth/login.inc.php",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formLogin),
          }
        );

        const data = await response.json();
        if (data.status == true) {
          localStorage.setItem("session_id", data.session_id);
          router.push("/profile");
        } else {
          const errorBox = document.getElementById("invalid");
          errorBox.textContent = data.message;
        }

        // useContext to save data.user to user state
        login(data.user, data.session_id);
      } catch (error) {
        console.log("error login");
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="text-center px-8 mt-10 flex flex-col mx-auto  max-w-96">
        <div className="bg-slate-200 pt-4 rounded w-full">
          <div className="my-5">Log in to continue</div>

          <div className="w-full border px-5 ">
            <form className="space-y-3 " onSubmit={handleLogin}>
              <div className="bg-amber-700">
                <input
                  name="email"
                  placeholder="Email"
                  className="w-full bg-slate-50 py-2 px-2"
                  onChange={handleChangeForm}
                ></input>
              </div>

              <div
                className="text-end  w-full text-xs  text-red-500"
                id="email-error"
              >
                {errors.email && <p>{errors.email}</p>}
              </div>

              <input
                name="pwd"
                placeholder="Password"
                className="w-full bg-slate-50 py-2 px-2"
                type="password"
                onChange={handleChangeForm}
              ></input>
              <div className="text-end text-xs   text-red-500" id="pwd-error">
                {errors.pwd && <p>{errors.pwd}</p>}
              </div>
              <div
                className="text-center text-xs   text-red-500"
                id="invalid"
              ></div>

              <button className="w-full py-2 text-white bg-black rounded">
                Log in
              </button>
            </form>
          </div>

          <div className="py-2">Forgot password</div>

          <div className="py-8">
            Not yet registered?
            <Link href="/signup">
              <p className="font-semibold">Create an account</p>
            </Link>
          </div>

          <div className="">
            <p className="pt-4">or</p>
            <Link href="/">
              <div className="bg-black text-white py-2 rounded my-5 mx-3 max-w-96 ">
                Continue as guest
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
