import Image from "next/image";
import { useState, useEffect } from "react";
import Welcome from "./welcome";

export default function Home() {
  const [isAuth, setAuth] = useState(false);
  useEffect(() => {
    const userDataObject = JSON.parse(localStorage.getItem("userData"));
    userDataObject?.hasOwnProperty("token") ? setAuth(true) : setAuth(false);
  });
  return <div>{isAuth ? null : <Welcome />}</div>;
}
