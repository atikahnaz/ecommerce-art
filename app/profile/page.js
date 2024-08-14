// "use client";

// import Link from "next/link";
// import { useState } from "react";

// export default function Login() {
//   const [formLogin, setFormLogin] = useState({
//     email: "",
//     pwd: "",
//   });

//   const [errors, setErrors] = useState({});

//   const handleChangeForm = (e) => {
//     setFormLogin({ ...formLogin, [e.target.name]: e.target.value });
//   };

//   const validateForm = () => {
//     const errors = {};
//     if (!formLogin.email) errors.email = "Email is required";
//     if (!formLogin.pwd) errors.pwd = "Password is required";
//     return errors;
//   };

//   const handleLogin = async (event) => {
//     console.log("hadnelogin");
//     setErrors(validateForm());

//     const formComplete = formLogin.email && formLogin.pwd;
//     if (formComplete) {
//       try {
//         console.log("here");
//         const respose = await fetch(
//           "http://localhost/Ecommerce_art/backend/auth/login.inc.php",
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(formLogin),
//           }
//         );

//         const data = await respose.json();
//         console.log(data.message);
//       } catch (error) {
//         console.log("error login");
//       }
//     }
//   };

//   return (
//     <>
//       <div className="text-center px-8 mt-10  flex flex-col items-center">
//         <div className="bg-slate-200 pt-4 rounded max-w-96">
//           <div className="my-5">Log in to continue</div>
//           <div className="">
//             <form className="space-y-5 mx-3" onSubmit={handleLogin}>
//               <input
//                 name="email"
//                 placeholder="Email"
//                 className="w-full bg-slate-50 py-2 px-2"
//                 onChange={handleChangeForm}
//               ></input>
//               {errors.email && <p>{errors.email}</p>}
//               <input
//                 name="pwd"
//                 placeholder="Password"
//                 className="w-full bg-slate-50 py-2 px-2"
//                 type="password"
//                 onChange={handleChangeForm}
//               ></input>
//               {errors.pwd && <p>{errors.pwd}</p>}
//               <button className="w-full py-2 text-white bg-black rounded">
//                 Log in
//               </button>
//             </form>
//           </div>

//           <div className="py-2">Forgot password</div>
//           <div className="py-8">
//             Not yet registered?
//             <Link href="/signup">
//               <p className="font-semibold">Create an account</p>
//             </Link>
//           </div>

//           <div className="">
//             <p className="pt-4">or</p>
//             <Link href="/">
//               <div className="bg-black text-white py-2 rounded my-5 mx-3 max-w-96 ">
//                 Continue as guest
//               </div>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

import Login from "@/components/auth/login";

export default function Profile() {
  return (
    <>
      <div className="">
        <Login />
      </div>
    </>
  );
}
