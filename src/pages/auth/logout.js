import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Template from "@/components/common/template";

export default function SignOut() {
  return (
    <Template includeFooter={false}>
      <div
        className={cn(
          "w-full lg:grid lg:grid-cols-2 h-screen flex flex-col justify-center"
        )}
      >
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
            Kijelentkezés
          </h2>
          <p className={cn("text-center")}>
            Biztosan ki szeretnél jelentkezni?
          </p>
          <Button className={cn("w-full")} onClick={() => signOut()}>
            Igen, kijelentkezem
          </Button>
        </div>
      </div>
    </Template>
  );
}
