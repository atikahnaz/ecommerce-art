import Link from "next/link";

export default function Login() {
  return (
    <>
      <div className="text-center px-8 mt-10  flex flex-col items-center">
        <div className="bg-slate-200 pt-4 rounded max-w-96">
          <div className="my-5">Log in to continue</div>
          <div className="">
            <form className="space-y-5 mx-3">
              <input
                placeholder="Email"
                className="w-full bg-slate-50 py-2 px-2"
              ></input>
              <input
                placeholder="Password"
                className="w-full bg-slate-50 py-2 px-2"
                type="password"
              ></input>
              <button className="w-full py-2 text-white bg-black rounded">
                Log in
              </button>
            </form>
          </div>

          <div className="py-2">Forgot password</div>
          <div className="py-8">
            Not yet registered?
            <a href="/">
              <p className="font-semibold">Create an account</p>
            </a>
          </div>

          <div className="">
            <p className="pt-4">or</p>
            <Link href="/Checkout">
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
