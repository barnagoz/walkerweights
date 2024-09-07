import {cn} from "@/lib/utils";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {ExclamationTriangleIcon} from "@radix-ui/react-icons";
import {Button} from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";

export default function ErrorAlert ({error}) {

    return (
        <>
            {error && (
                <Alert variant="destructive">
                    <ExclamationTriangleIcon className={cn("h-4 w-4")}/>
                    <AlertTitle>Hiba történt</AlertTitle>
                    <AlertDescription>
                        A bejelentkezés során hiba történt, kérlek próbáld meg újra,
                        vagy lépj kapcsolatba az adminisztrátorral.
                        <br/>
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
        </>
    );
}
