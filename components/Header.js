import Image from "next/image";
import Link from "next/link";
import { LogoAtom } from "../assets/images/index";

export default function Header() {
  return (
    <div className="flex justify-between px-8 py-2 border-b-2 ">
      <div className="flex gap-2 items-center">
        <Image
          src={LogoAtom}
          alt="logo-atom.png"
          height={"40"}
          width={"40"}
          priority={true}
          style={{ width: "auto", height: "auto" }}
        />
        <Link href="/">
          <p className="font-semibold text-xl">atom</p>
        </Link>
      </div>
    </div>
  );
}
