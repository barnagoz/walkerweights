import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function Error() {
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
        <h2 className={cn("text-2xl font-bold text-center")}>Hiba történt</h2>
        <p className={cn("text-center")}>
          Rendszerünk a következő hibát tapasztalta bejelentkezés közben:
        </p>
        <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Hiba</AlertTitle>
          <AlertDescription>
            TODO: Error message from next-auth
          </AlertDescription>
        </Alert>
        <Link href="/auth/login">
          <Button className={cn("w-full")}>Vissza a bejelentkezéshez</Button>
        </Link>
      </div>
    </div>
  );
}
