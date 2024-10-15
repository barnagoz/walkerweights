import {CredentialForm} from "@/components/auth/credentialForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {cn} from "@/lib/utils";
import Template from "@/components/common/template";
import {useEffect} from "react";
import Router from "next/router";
import {useSearchParams} from "next/navigation";
import {useSession} from "next-auth/react";
import {LoadingSpinner} from "@/components/ui/spinner";
import {NextSeo} from "next-seo";
import ErrorAlert from "@/components/auth/error";
import Link from "next/link";

export default function SignIn () {
    const {data: session, status} = useSession();

    const searchParams = useSearchParams();
    const error = searchParams.get("error");

    useEffect(() => {
        if (status === "authenticated") {
            if (session.user.type === "client") {
                Router.push("/portal");
            }
            if (session.user.type === "admin") {
                if (session.user.access_list.includes("app")) {
                    Router.push("/app");
                } else {
                    Router.push("/");
                }
            }
        }
    }, [status, session]);

    return (
        <Template includeFooter={false} className={"bg-gradient-to-bl from-brand-green to-black"}>
            <NextSeo
                title={"Bejelentkezés"}
                noindex={true}
            />
            <div className={"w-full h-full flex items-center justify-center p-4"}>

                    {status === "loading" || status === "authenticated" && (
                        <Card className={"w-full md:w-1/3"}>
                            <CardHeader>
                                <CardTitle>Betöltés...</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <LoadingSpinner className={cn("mx-auto -mb-1")}/>
                            </CardContent>
                        </Card>
                    )}
                    {status === "unauthenticated" && (
                        <Card className={"w-full md:w-1/3"}>
                            <CardHeader>
                                <CardTitle>Jelentkezzen be a fiókjába</CardTitle>
                                <CardDescription>Még nincs fiókja? Töltse ki ingyenes konzultációnkat!</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <CredentialForm buttonText={"Bejelentkezés"}/>
                                <Link href={"/auth/forgot-password"}>
                                  <Button variant={"ghost"} className={"w-full mt-2"}>Elfelejtett jelszó →</Button>
                                </Link>
                                <ErrorAlert error={error}/>
                            </CardContent>
                        </Card>
                    )}
            </div>
        </Template>
    );
}