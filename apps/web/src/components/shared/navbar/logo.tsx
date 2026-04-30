import logo from "@/assets/logo.png";
import Image from "next/image";

export const Logo = () => (
  <Image
    width={256}
    height={99}
    className="w-24 h-auto aspect-256/99"
    src={logo}
    alt="Company Logo"
  ></Image>
);
