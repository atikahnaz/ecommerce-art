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

  const [errors, setErrors] = useState({});

  const router = useRouter();

  const handleChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    // create error object
    const errors = {};
    if (!form.name) errors.name = "Name is required";
    if (!form.lastname) errors.lastname = "Last name is required";
    if (!form.username) errors.username = "Username is required";
    if (!form.email) errors.email = "Email is required";
    if (!form.pwd) errors.pwd = "Password is required";
    console.log(errors);
    return errors;
  };

  console.log(form);

  const handleSignUp = async (event) => {
    event.preventDefault();

    setErrors(validateForm());

    const formComplete =
      form.name && form.lastname && form.username && form.email && form.pwd;

    if (formComplete) {
      try {
        const response = await fetch(
          "https://artstore.infinityfreeapp.com/backend/auth/signup.inc.php",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          }
        );
        const data = await response.json();

        console.log("Signup");

        console.log(data.status);
        console.log(data.message);

        router.push("/");
      } catch (error) {
        console.log("error occured:", error);
      }
    } else {
      // const messageBox = document.getElementById("message");
      // messageBox.textContent = form.name + form.email;
      // console.log("please fill in ");
    }
  };

  return (
    <>
      <div className="max-w-96 my-10 mt-8 mx-auto">
        <div className="m-5">Sign up</div>
        <form onSubmit={handleSignUp} className="mx-5 space-y-4 ">
          <div>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              className="w-full border py-2 px-2 rounded"
              onChange={handleChangeForm}
            />
            <div
              className="text-end text-xs px-2  text-red-500"
              id="name-error"
            >
              {errors.name && <p>{errors.name}</p>}
            </div>
          </div>

          <input
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Lastname"
            className="w-full border py-2 px-2 rounded"
            onChange={handleChangeForm}
          />
          <div className="text-end text-xs px-2  text-red-500" id="name-error">
            {errors.lastname && <p>{errors.lastname}</p>}
          </div>

          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            className="w-full border py-2 px-2 rounded"
            onChange={handleChangeForm}
          />
          <div className="text-end text-xs px-2  text-red-500" id="name-error">
            {errors.username && <p>{errors.username}</p>}
          </div>

          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="w-full border py-2 px-2 rounded"
            onChange={handleChangeForm}
          />
          <div className="text-end text-xs px-2  text-red-500" id="name-error">
            {errors.email && <p>{errors.email}</p>}
          </div>

          <input
            type="password"
            name="pwd"
            id="pwd"
            placeholder="Password"
            className="w-full border py-2 px-2 rounded"
            onChange={handleChangeForm}
          />
          <div className="text-end text-xs px-2  text-red-500" id="name-error">
            {errors.pwd && <p>{errors.pwd}</p>}
          </div>
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
