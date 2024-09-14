import { PasswordForm } from "@/components/auth/passwordForm";
import { useRouter } from "next/router";

export default function AdminPasswordSetup () {
	const router = useRouter();
	const {token} = router.query;
	return (
		<div className={"w-full h-screen flex items-center justify-center"}>
			<div className={"w-auto p-4 rounded-lg border border-gray shadow-sm flex items-center justify-center" +
				" flex-col"}>
			<h1 className={"font-semibold text-lg mb-4"}>Adminiszrtátori jelszó beállítása</h1>
			<PasswordForm
				token={token}
				apiLink="/api/auth/admin-password"
			/>
			</div>
		</div>
	);
}