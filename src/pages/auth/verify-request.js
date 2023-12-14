import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function SignOut() {
  return (
    <div className={cn("w-full lg:grid lg:grid-cols-2 min-h-screen")}>
      <div className={cn("lg:bg-secondary lg:mt-0 mt-4 flex justify-center")}>
        <div
          className={cn(
            "flex flex-col justify-center items-center h-full w-1/2"
          )}
        >
          <Image src="/logo.png" width={250} height={250} />
        </div>
      </div>
      <div className={cn("lg:p-8 p-4 gap-2 flex flex-col justify-center")}>
        <h2 className={cn("text-2xl font-bold text-center")}>
          Varázslink elküldve
        </h2>
        <p className={cn("text-center")}>
          Az általad megadott e-mail címre elküldtünk egy linket, melynek
          segítségével be tudsz jelentkezni.
        </p>
      </div>
    </div>
  );
}
