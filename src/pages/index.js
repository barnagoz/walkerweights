import Image from "next/image";
import Template from "@/components/common/template";

export default function Home() {
  return (
    <Template>
      <div className="flex justify-center flex-col w-full h-auto py-24 px-10">
        <h1 className="text-4xl font-extrabold italic text-foreground">
          Teszt alkalmazás
        </h1>
        <p>Semmire nem jó, de jól néz ki</p>
      </div>
    </Template>
  );
}
