import { CredentialForm } from "@/components/auth/credentialForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Template from "@/components/common/template";
import axios from "axios";
import { useState } from "react";
import Router from "next/router";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { toast } from "sonner";

export default function ForgotPassword () {
	const [email, setEmail] = useState("");

	async function resetPassword () {
		const resp = await axios.post("/api/auth/forgot-password", {email: email});

		if (resp.status === 200) {
			toast.success("Jelszó visszaállítási email elküldve!");
			Router.push("/auth/login");
		} else {
			toast.error("Hiba történt a jelszó visszaállítás során!");
		}
	}

	return (
		<Template includeFooter={false} className={"bg-gradient-to-bl from-brand-green to-black"}>
			<NextSeo
				title={"Jelszó visszaállítása"}
				noindex={true}
			/>
			<div className={"w-full h-full flex items-center justify-center p-4"}>
				<Card className={"w-full md:w-1/3"}>
					<CardHeader className={"pb-3"}>
						<CardTitle>Jelszó visszaállítása</CardTitle>
						<CardDescription>Elfelejtette jelszavát? Adja meg email címét, hogy segíthessünk
							bejelentkezni!</CardDescription>
					</CardHeader>
					<CardContent className={"pt-0"}>
						<Label>E-mail cím</Label>
						<Input value={email} onChange={(e) => setEmail(e.target.value)} type={"email"}
						       className={"mt-2"}></Input>
						<Button className={"w-full mt-2"} onClick={resetPassword}>Jelszó visszaállítása</Button>
						<Link href={"/auth/login"}><Button variant={"ghost"} className={"w-full mt-2"}>Bejelentkezés
							→</Button></Link>
					</CardContent>
				</Card>
			</div>
		</Template>
	);
}