import Gate from "@/components/auth/gate";
import Template from "@/components/common/template";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/spinner";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Portal () {
	const {data: session} = useSession();
	const [companyData, setCompanyData] = useState(null);
	const [loading, setLoading] = useState(false);

	async function getCompanyData () {
		setLoading(true);
		const resp = await axios.post("/api/client/get-account", {
			client_id: session.user.id,
			session_token: session.user.session_token
		}).catch((e) => {
			toast.error("Hiba történt az adatok lekérdezése során");
			console.log(e);
		});

		if (resp.status === 200) {
			const data = resp.data?.data;
			setCompanyData(data);
		}
		setLoading(false);
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
							adataid, fájlok feltöltésével segítheted auditoraink munkáját, valamint nyomonkövetheted
							projekted állapotát.</p>
						{loading ? (
							<div className={"w-full p-4 my-3 flex justify-center items-center gap-2"}>
								<LoadingSpinner/>
								<p>Betöltés...</p>
							</div>
						) : (companyData && (
							<Card className={"my-3"}>
								<CardHeader>
									<CardTitle
										className={"flex gap-2 items-center"}>{companyData.client.company_name} projektjének
										jelenlegi
										állapota: <Badge>{companyData.client.status}</Badge></CardTitle>
									<CardDescription>Alább láthatod az esetleges szükséges lépéseket a projekttel
										kapcsolatban.</CardDescription>
								</CardHeader>
								<CardContent className={"flex gap-2 overflow-x-scroll"}>
									{companyData.tasks.map((task, index) => (
										<Card className={"w-[350px] min-w-[300px]"} key={index}>
											<CardHeader>
												<CardTitle className={"leading-normal"}><Badge
													className={"mr-2"}>{task.status}</Badge>{task.title}</CardTitle>
												<CardDescription>{task.description}</CardDescription>
											</CardHeader>
											<CardFooter className={"flex flex-col items-start justify-start"}>
												{(task.status === "Új" || task.status === "Újraküldendő") && (
													<Link href={"/portal/data/add"}><Button
														variant={"link"}>{task.type === "form" ? "Kérdőív kitöltése →" : "Dokumentum feltöltése →"}</Button></Link>)}
												{task.comment && (
													<Alert>
														<AlertTitle>Megjegyzés:</AlertTitle>
														<AlertDescription>{task.comment}</AlertDescription>
													</Alert>)}
											</CardFooter>
										</Card>))}
								</CardContent>
							</Card>

						))}
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
									<Link href={"/portal/data/docs"}><Button variant={"link"}>Dokumentumok
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