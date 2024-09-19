import Gate from "@/components/auth/gate";
import Template from "@/components/common/template";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function App () {
	const {data: session} = useSession();

	return (
		<Gate permission="app">
			<Template>
				{session && (
					<div className={"p-4"}>
						<h1 className={"text-2xl font-semibold"}>Üdv, {session.user.name}!</h1>
						<p className={"muted"}>Ez itt az adminisztrációs központ. Az alábbi alkalmazásokból
							választhatsz, ezeket tudod használni.</p>
						<div className={"grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"}>
							<Gate permission={"client-list"} inline>
								<Card>
									<CardHeader>
										<CardTitle>Ügyfelek</CardTitle>
										<CardDescription>A nyilvános oldalon keresztül beérkezett &quot;Ingyenes
											konzultáció&quot; kéréseket itt találod. Jogosultságtól függően ezeket akár
											Excelbe is exportálhatod.</CardDescription>
									</CardHeader>
									<CardFooter>
										<Link href={"/app/client"}><Button variant={"link"}>Ügyfelek kezelése →</Button></Link>
									</CardFooter>
								</Card>
							</Gate>
							<Gate permission={"admin-management"} inline>
								<Card>
									<CardHeader>
										<CardTitle>Adminisztrátori fiókok</CardTitle>
										<CardDescription>Módosíthatod adminisztrátorok jogosultságait, meghívhatsz új
											adminisztrátorokat és még sok más ebben a menüben.</CardDescription>
									</CardHeader>
									<CardFooter>
										<Link href={"/app/admin-management"}><Button variant={"link"}>Adminisztrátori
											fiókok kezelése →</Button></Link>
									</CardFooter>
								</Card>
							</Gate>
						</div>
					</div>
				)}
			</Template>
		</Gate>
	);
}