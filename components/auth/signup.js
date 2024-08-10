"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signup() {
  // object data form
  const [form, setForm] = useState({
    name: "",
    lastname: "",
    username: "",
    email: "",
    pwd: "",
  });

  const router = useRouter();

  const handleChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  console.log(form);

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "http://localhost/Ecommerce_art/backend/auth/signup.inc.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      const data = await response.json();
      console.log(data);
      console.log("Signup");

      const messageBox = document.getElementById("message");
      messageBox.textContent = data.name + data.email;

      console.log(data.status);
      console.log(data.message);

      router.push("/");
    } catch (error) {
      console.log("error occured:", error);
    }
  };

  return (
    <>
      <div className="max-w-96 my-10 mt-8 mx-auto">
        <div id="message"></div>
        <div className="m-5">Sign up</div>
        <form onSubmit={handleSignUp} className="mx-5 space-y-4">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            className="w-full"
            onChange={handleChangeForm}
          />
          <input
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Lastname"
            className="w-full"
            onChange={handleChangeForm}
          />
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            className="w-full"
            onChange={handleChangeForm}
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="w-full"
            onChange={handleChangeForm}
          />
          <input
            type="password"
            name="pwd"
            id="pwd"
            placeholder="Password"
            className="w-full"
            onChange={handleChangeForm}
          />
          <button
            type="submit"
            className="w-full bg-black text-white rounded py-2"
          >
            Signup
          </button>
        </form>
      </div>
    </>
  );
}
