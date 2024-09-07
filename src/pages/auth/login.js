import {CredentialForm} from "@/components/auth/credentialForm";
import {cn} from "@/lib/utils";
import Template from "@/components/common/template";
import {useEffect} from "react";
import Router from "next/router";
import {useSearchParams} from "next/navigation";
import {useSession} from "next-auth/react";
import {LoadingSpinner} from "@/components/ui/spinner";
import {NextSeo} from "next-seo";
import ErrorAlert from "@/components/auth/error";

export default function SignIn () {
    const {data: session, status} = useSession();

    const searchParams = useSearchParams();
    const error = searchParams.get("error");

    useEffect(() => {
        if (status === "authenticated") {
            alert(status)
            if (session.user.access_list.includes("app")) {
                Router.push("/app");
            } else {
                Router.push("/");
            }
        }
    }, [status, session]);

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
                    {status === "loading" && (
                        <>
                            <LoadingSpinner className={cn("mx-auto -mb-1")}/>
                            <p className={cn("text-center")}>Betöltés...</p>
                        </>
                    )}
                    {status === "unauthenticated" && (
                        <>
                            <h2 className={cn("text-2xl font-bold text-center")}>
                                Bejelentkezés
                            </h2>
                            <ErrorAlert error={error}/>
                            <CredentialForm buttonText={"Bejelentkezés"}/>
                        </>
                    )}
                </div>
            </div>
        </Template>
    );
}