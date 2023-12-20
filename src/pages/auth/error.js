import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import Template from "@/components/common/template";
import { useSearchParams } from "next/navigation";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

export default function Error() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

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
        <div className={cn("lg:p-8 p-4 gap-2 flex flex-col justify-center ")}>
          <h2 className={cn("text-2xl font-bold text-center")}>Hiba történt</h2>
          <p className={cn("text-center")}>
            A bejeletkezés során hiba történt. Kérjük próbáld újra.
          </p>
          {error && (
            <Alert variant="destructive">
              <ExclamationTriangleIcon className="h-4 w-4" />
              <AlertTitle>Hiba történt</AlertTitle>
              <AlertDescription>
                A bejelentkezés során hiba történt, kérlek próbáld meg újra,
                vagy lépj kapcsolatba az adminisztrátorral.
                <br />
                <Link href="mailto:barnagoz@icloud.com">
                  <Button
                    variant="link"
                    className="text-xs px-2 py-0 -my-1 text-destructive"
                  >
                    Visszajelzés küldése
                  </Button>
                </Link>
                <AlertDialog>
                  <AlertDialogTrigger>
                    <Button
                      variant="link"
                      className="text-xs px-2 py-0 -my-1 text-destructive"
                    >
                      Fejlesztői információ
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogOverlay>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Fejlesztői információ
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          A bejelentkezés közben &quot;{error}&quot; típusú hiba
                          történt.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Bezárás</AlertDialogCancel>
                        <Link href="mailto:barnagoz@icloud.com">
                          <AlertDialogAction>
                            Visszajelzés küldése
                          </AlertDialogAction>
                        </Link>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialogOverlay>
                </AlertDialog>
              </AlertDescription>
            </Alert>
          )}
          <Link href="/auth/login">
            <Button className={cn("w-full")}>Vissza a bejelentkezéshez</Button>
          </Link>
        </div>
      </div>
    </Template>
  );
}
