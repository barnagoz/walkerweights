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
                <Alert variant="destructive" className={"mt-2"}>
                    <ExclamationTriangleIcon className={cn("h-4 w-4")}/>
                    <AlertTitle>Hibás e-mail cím vagy jelszó</AlertTitle>
                    <AlertDescription>
                        A bejelentkezés során hiba történt, kérlek próbáld meg újra.
                    </AlertDescription>
                </Alert>
            )}
        </>
    );
}
