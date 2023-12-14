import { EmailForm } from "@/components/auth/emailForm";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function SignIn() {
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
      <div className={cn("lg:p-8 p-4 gap-2 flex flex-col justify-center ")}>
        <h2 className={cn("text-2xl font-bold text-center")}>Bejelentkezés</h2>
        <EmailForm />
      </div>
    </div>
  );
}
