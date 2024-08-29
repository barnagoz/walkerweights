import { EmailForm } from "@/components/auth/emailForm";
import { cn } from "@/lib/utils";
import Template from "@/components/common/template";
import Image from "next/image";
import { useEffect } from "react";
import Router from "next/router";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { LoadingSpinner } from "@/components/ui/spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
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
import Link from "next/link";
import {NextSeo} from "next-seo";

export default function SignIn() {
  const { data: session, status } = useSession();

  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    if (status == "authenticated") {
      Router.push("/");
    }
  }, [status]);

  return (
    <Template includeFooter={false}>
      <NextSeo
          title={"Bejelentkezés"}
          noindex={true}
      />
      <div
        className={cn(
          "w-full lg:grid lg:grid-cols-2 h-screen flex flex-col justify-center"
        )}
      >
        <div className={cn("lg:bg-amber-700 lg:mt-0 mt-4 flex justify-center")}>
        </div>
        <div className={cn("lg:p-8 p-4 gap-2 flex flex-col justify-center ")}>
          {status == "loading" && (
            <>
              <LoadingSpinner className={cn("mx-auto -mb-1")} />
              <p className={cn("text-center")}>Betöltés...</p>
            </>
          )}
          {status == "unauthenticated" && (
            <>
              <h2 className={cn("text-2xl font-bold text-center")}>
                Bejelentkezés
              </h2>
              {error && (
                <Alert variant="destructive">
                  <ExclamationTriangleIcon className={cn("h-4 w-4")} />
                  <AlertTitle>Hiba történt</AlertTitle>
                  <AlertDescription>
                    A bejelentkezés során hiba történt, kérlek próbáld meg újra,
                    vagy lépj kapcsolatba az adminisztrátorral.
                    <br />
                    <Link href="mailto:barnagoz@icloud.com">
                      <Button
                        variant="link"
                        className={cn(
                          "text-xs px-2 py-0 -my-1 text-destructive"
                        )}
                      >
                        Visszajelzés küldése
                      </Button>
                    </Link>
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <Button
                          variant="link"
                          className={cn(
                            "text-xs px-2 py-0 -my-1 text-destructive"
                          )}
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
                              A bejelentkezés közben &quot;{error}&quot; típusú
                              hiba történt.
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
              <EmailForm />
            </>
          )}
        </div>
      </div>
    </Template>
  );
}
