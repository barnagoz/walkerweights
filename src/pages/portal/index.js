import Gate from "@/components/auth/gate";
import Template from "@/components/common/template";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

export default function Portal () {
	const {data: session} = useSession();
	const [companyData, setCompanyData] = useState(null);

	async function getCompanyData () {
		const resp = await axios.post("/api/client/get-account", {
			client_id: session.user.id,
			session_token: session.user.session_token
		}).catch((e) => {
			toast.error("Hiba történt az adatok lekérdezése során");
			console.log(e);
		});

		if (resp.status === 200) {
			setCompanyData(resp.data.data);
		}
	}

	useEffect(() => {
		if (session) {
			getCompanyData();
		}
	}, [session]);

	return (
		<Gate permission="client">
			<Template>
				{session && (
					<div className={"p-4"}>
						<h1 className={"text-2xl font-semibold"}>Üdvözlünk a
							Walker&Weights-nél, {session.user.name}!</h1>
						<p className={"muted"}>Ez itt az ügyfélportál. Erről a felületről szerkesztheted megadott
							adataid, fájlok feltöltésével segítheted auditoraink munkáját, valamint nyomon követheted
							projekted állapotát.</p>
						{companyData && (
							<Card className={"my-3"}>
								<CardHeader>
									<CardTitle
										className={"flex gap-2 items-center"}>{companyData.company_name} projektjének
										jelenlegi
										állapota: <Badge>{companyData.status}</Badge></CardTitle>
									<CardDescription>Alább láthatod az esetleges szükséges lépéseket a projekttel
										kapcsolatban.</CardDescription>
								</CardHeader>
								<CardContent>
									<Card className={"w-[350px]"}>
										<CardHeader>
											<CardTitle>Lecserélt kazán technikai paramétereinek megadása</CardTitle>
											<CardDescription>Kérjük töltse fel felületünkre az önök által lecserélt
												kazán paramétereit</CardDescription>
										</CardHeader>
										<CardFooter>
											<Link href={"/portal/data/add"}><Button variant={"link"}>Dokumentum
												feltöltése →</Button></Link>
										</CardFooter>
									</Card>
								</CardContent>
							</Card>

						)}
						<h2 className={"text-xl font-semibold mt-6"}>Egyéb lehetőségek:</h2>
						<div className={"grid grid-cols-1 md:grid-cols-2 gap-4 mt-2"}>
							<Card>
								<CardHeader>
									<CardTitle>Személyes adatok</CardTitle>
									<CardDescription>Megtekintheted, valamint módosíthatod a kapcsolatfelvételkor
										megadott adatokat.</CardDescription>
								</CardHeader>
								<CardFooter>
									<Link href={"/portal/account"}><Button variant={"link"}>Adatok szerkesztése
										→</Button></Link>
								</CardFooter>
							</Card>
							<Card>
								<CardHeader>
									<CardTitle>Feltöltött dokumentumok</CardTitle>
									<CardDescription>Tekintsd meg eddig feltöltött, vagy tölts fel új dokumentumot
										rendszerünkbe!</CardDescription>
								</CardHeader>
								<CardFooter>
									<Link href={"/portal/data"}><Button variant={"link"}>Dokumentumok
										→</Button></Link>
								</CardFooter>
							</Card>
						</div>
					</div>
				)}
			</Template>
		</Gate>
	);
}