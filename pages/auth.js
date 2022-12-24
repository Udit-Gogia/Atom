import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { InputComponent } from "../components/inputs";
import { SignupModal, alertUser } from "../components/Modals";

import {
  loginUser,
  signupUser,
  getUserDataObject,
  getUserDataFromApi,
  setUserDataObject,
} from "../components/authFunctions";

export function Signup() {
  const router = useRouter();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col mx-auto border-2 rounded-md p-8 sm:w-full my-8">
      <form className="flex flex-col gap-4">
        {/* username */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="username"
            className="font-semibold text-lg tracking-wide "
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            ref={usernameRef}
            required
            className="border-2 rounded-md p-2  focus:outline-[#191919]"
          ></input>
        </div>
        {/* password */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="font-semibold text-lg tracking-wide "
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            ref={passwordRef}
            required
            className="border-2 rounded-md p-2  focus:outline-[#191919]"
          ></input>
        </div>
        {/* confirm password */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="font-semibold text-lg tracking-wide "
          >
            Confirm Password
          </label>
          <input
            type="password"
            name="confirm-password"
            ref={confirmPasswordRef}
            required
            className="border-2 rounded-md p-2  focus:outline-[#191919]"
          ></input>
        </div>

        <button
          className="AuthButton"
          onClick={async (e) => {
            e.preventDefault();
            if (
              passwordRef.current.value === confirmPasswordRef.current.value
            ) {
              var res = await signupUser(
                usernameRef.current.value,
                passwordRef.current.value
              );
            } else {
              alertUser(
                "Please ensure that the password and confirm password are the same!"
              );
              res = undefined;
            }

            if (res != undefined) {
              setIsOpen(true);
            }
          }}
        >
          SignUp
        </button>
        <SignupModal
          username={usernameRef.current?.value}
          password={passwordRef.current?.value}
          isOpen={isOpen}
        />
      </form>
    </div>
  );
}

export function Login() {
  const router = useRouter();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col mx-auto border-2 rounded-md p-8 sm:w-full my-8">
      <form className="flex flex-col gap-4">
        {/* username */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="username"
            className="font-semibold text-lg tracking-wide "
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            ref={usernameRef}
            required
            className="border-2 rounded-md p-2  focus:outline-[#191919]"
          ></input>
        </div>
        {/* password */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="font-semibold text-lg tracking-wide "
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            ref={passwordRef}
            required
            className="border-2 rounded-md p-2  focus:outline-[#191919]"
          ></input>
        </div>

        <button
          className="AuthButton"
          onClick={async (e) => {
            e.preventDefault();

            const res = await loginUser(
              usernameRef.current.value,
              passwordRef.current.value
            );

            if (res != undefined) {
              router.push("/");
            }
          }}
        >
          SignUp
        </button>
        <SignupModal
          username={usernameRef.current?.value}
          password={passwordRef.current?.value}
          isOpen={isOpen}
        />
      </form>
    </div>
  );
}
// export function Login() {
//   const usernameRef = useRef();
//   const passwordRef = useRef();

//   const router = useRouter();
//   return (
//     <div className="flex flex-col mx-auto border-2 rounded-md p-8 sm:w-full my-8">
//       <form className="flex flex-col gap-4">
//         {/* username */}
//         <div className="flex flex-col gap-2">
//           <label
//             htmlFor="username"
//             className="font-semibold text-lg tracking-wide "
//           >
//             Username
//           </label>
//           <input
//             type="text"
//             name="username"
//             ref={usernameRef}
//             required
//             className="border-2 rounded-md p-2  focus:outline-[#191919]"
//           />
//         </div>
//         {/* password */}
//         <div className="flex flex-col gap-2">
//           <label
//             htmlFor="password"
//             className="font-semibold text-lg tracking-wide "
//           >
//             Password
//           </label>
//           <input
//             type="password"
//             name="password"
//             ref={passwordRef}
//             required
//             className="border-2 rounded-md p-2  focus:outline-[#191919]"
//           ></input>
//         </div>

//         <button
//           className="AuthButton"
//           onClick={async (e) => {
//             e.preventDefault();
//             const res = await loginUser(
//               usernameRef.current?.value,
//               passwordRef.current?.value
//             );

//             if (res != undefined) {
//               router.push("/");
//             }
//           }}
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }

export default function Auth() {
  const [showLogin, setShowLogin] = useState(true);

  const router = useRouter();
  useEffect(() => {
    const { isAuth } = getUserDataObject();
    if (isAuth) {
      router.back();
      alertUser("You are already authenticated");
    }
  }, []);
  return (
    <div className="">
      <div className="w-1/2 flex justify-center mx-auto">
        <button
          className={`p-2 text-2xl w-full transition duration-150 ${
            showLogin
              ? "border-b-2 border-primaryBlack font-semibold text-primaryBlack"
              : "border-b-0 text-neutral-400"
          }`}
          onClick={() => setShowLogin(!showLogin)}
        >
          Login
        </button>
        <button
          className={`p-2 text-2xl w-full transition duration-150 ${
            !showLogin
              ? "border-b-2 border-primaryBlack font-semibold text-primaryBlack"
              : "border-b-0 text-neutral-400"
          }`}
          onClick={() => setShowLogin(!showLogin)}
        >
          Signup
        </button>
      </div>

      <div className="w-1/2 flex justify-center mx-auto">
        {showLogin ? <Login /> : <Signup />}
      </div>
    </div>
  );
}
