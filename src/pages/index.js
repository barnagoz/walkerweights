import Image from "next/image";
import Template from "@/components/common/template";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <Template>
      <div
        className={cn("flex justify-center flex-col w-full h-auto py-24 px-10")}
      >
        <h1 className={cn("text-4xl font-extrabold italic text-foreground")}>
          Teszt alkalmazás
        </h1>
        <p>Semmire nem jó, de jól néz ki</p>
      </div>
    </Template>
  );
}
