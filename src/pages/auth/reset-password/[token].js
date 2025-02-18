import { PasswordForm } from "@/components/auth/forms/password-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/router";
import Image from "next/image";

export default function AdminPasswordSetup () {
	const router = useRouter();
	const {token} = router.query;
	return (
		<div className={"w-full h-screen flex items-center justify-center bg-gradient-to-bl from-brand-green to-black"}>
			<Card className={"w-full md:w-1/3"}>
				<CardHeader>
					<Image src={"/asset/logo.svg"} alt={"Walker&Weights"} className={"mb-4"} width={90} height={43}/>
					<CardTitle>Fiók jelszavának módosítása</CardTitle>
					<CardDescription>Kérjük adja meg a bejelentkezési email címét, valamint adjon meg egy új
						jelszót a fiókjához.</CardDescription>
				</CardHeader>
				<CardContent>
					<PasswordForm
						token={token}
						apiLink="/api/auth/reset-password"
					/>
				</CardContent>
			</Card>
		</div>
	);
}