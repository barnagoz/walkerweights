import { PasswordForm } from "@/components/auth/forms/password-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/router";

export default function AdminPasswordSetup () {
	const router = useRouter();
	const {token} = router.query;
	return (
		<div className={"w-full h-screen flex items-center justify-center bg-gradient-to-bl from-brand-green to-black"}>
			<Card className={"w-full md:w-1/3"}>
				<CardHeader>
					<CardTitle>Adminisztrátori jelszó beállítása</CardTitle>
				</CardHeader>
				<CardContent>
					<PasswordForm
						token={token}
						apiLink="/api/auth/admin-password"
					/>
				</CardContent>
			</Card>
		</div>
	);
}