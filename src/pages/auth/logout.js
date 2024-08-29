import {signOut, useSession} from "next-auth/react";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import Template from "@/components/common/template";
import {LoadingSpinner} from "@/components/ui/spinner";
import {useEffect} from "react";
import Router from "next/router";
import {NextSeo} from "next-seo";

export default function SignOut () {
    const {data: session, status} = useSession();

    useEffect(() => {
        if (status == "unauthenticated") {
            Router.push("/auth/login");
        }
    }, [status]);

    return (
        <Template includeFooter={false}>
            <NextSeo
                title={"Kijelentkezés"}
                noindex={true}
            />
            <div
                className={cn(
                    "w-full lg:grid lg:grid-cols-2 h-screen flex flex-col justify-center"
                )}
            >
                <div className={cn("lg:bg-amber-700 lg:mt-0 mt-4 flex justify-center")}>
                </div>
                <div
                    className={cn(
                        "lg:p-8 p-4 gap-2 flex flex-col justify-center text-center"
                    )}
                >
                    {status == "loading" && (
                        <>
                            <LoadingSpinner className={cn("mx-auto -mb-1")}/>
                            <p className={cn("text-center")}>Betöltés...</p>
                        </>
                    )}
                    {status == "authenticated" && (
                        <>
                            <h2 className={cn("text-2xl font-bold text-center")}>
                                Kijelentkezés
                            </h2>
                            <p className={cn("text-center")}>
                                Biztosan ki szeretnél jelentkezni?
                            </p>
                            <Button className={cn("w-full")} onClick={() => signOut()}>
                                Igen, kijelentkezem
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </Template>
    );
}
