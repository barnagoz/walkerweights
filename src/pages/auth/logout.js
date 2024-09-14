import { CredentialForm } from "@/components/auth/credentialForm";
import ErrorAlert from "@/components/auth/error";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
        <Template includeFooter={false} className={"bg-gradient-to-bl from-black to-brand-green"}>
            <NextSeo
                title={"Kijelentkezés"}
                noindex={true}
            />
            <div className={"w-full flex items-center justify-center p-4"}>
                {status === "loading" && (
                    <Card className={"w-full md:w-1/3"}>
                        <CardHeader>
                            <CardTitle>Betöltés...</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <LoadingSpinner className={cn("mx-auto -mb-1")}/>
                        </CardContent>
                    </Card>
                )}
                {status === "authenticated" && (
                    <Card className={"w-full md:w-1/3"}>
                        <CardHeader>
                            <CardTitle>Lépjen ki fiókjából</CardTitle>
                            <CardDescription>Biztosan ki szeretne jelentkezni?</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button className={cn("w-full")} onClick={() => signOut()}>
                                Igen, kijelentkezem
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>
        </Template>
    );
}
