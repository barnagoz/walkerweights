import Image from "next/image";
import { Inter } from "next/font/google";
import Component from "@/components/login-btn";
import Template from "@/components/common/template";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Template>
      <Component />
    </Template>
  );
}
