import "../styles/globals.css";
import Header from "../components/Header";
import sendDataToAtom from "../components/sendDataToAtom";
import { useEffect } from "react";
export default function App({ Component, pageProps }) {
  useEffect(() => {
    sendDataToAtom("app-open");
    if (!localStorage.getItem("userData")) {
      const userData = {
        userId: undefined,
        postLiked: [],
        token: undefined,
        isAuth: false,
        box_fields: false,
        column_fields: false,
      };
      localStorage.setItem("userData", JSON.stringify(userData));
    }
  }, []);
  return (
    <div className="flex flex-col ">
      <Header />
      <Component {...pageProps} />
    </div>
  );
}
