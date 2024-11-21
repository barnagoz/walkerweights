import Gate from "@/components/auth/gate";
import Template from "@/components/common/template";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import StatCard from "@/components/ui/statcard";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import axios from "axios";
import { CalendarIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ShowClient () {
	const {data: session} = useSession();
	const router = useRouter();
	const {id} = router.query;
	const [client, setClient] = useState(undefined);

	async function getData () {
		if (!session) return;
		const data = await axios.post("/api/admin/data/company", {
			accessid: session.user.id,
			clientid: id,
		}).catch((e) => {
			toast.error("Hiba történt az adatok lekérdezése során");
			console.log(e);
		});
		console.log(data.data.data)
		setClient(data.data.data);
	}

	useEffect(() => {
		getData();
	}, [session]);

	return (
		<Gate permission={['app', 'client-list']}>
			<Template>
				{client && (
					<div className={"p-4"}>
						<Link href={"/app/client"}><Button variant={"link"} className={"h-auto p-0"}>←
							Vissza</Button></Link>
						<h1 className={"text-2xl font-bold"}>{client.company_name}</h1>
						<div className={"flex flex-row space-x-2 mt-4"}>
							<StatCard title={"Kapcsolatfelvétel dátuma"}
							          icon={<CalendarIcon className={"muted w-4 h-4"}/>}
							          value={new Date(client.created_at).toLocaleDateString()}/>
						</div>
						<div className={"flex flex-wrap w-full gap-2 mt-2"}>
							<Card className={"flex-grow"}>
								<CardHeader>
									<CardTitle>Kapcsolattartó</CardTitle>
								</CardHeader>
								<CardContent>
									<Table>
										<TableBody>
											<TableRow>
												<TableCell>Vezetéknév</TableCell>
												<TableCell></TableCell>
												<TableCell>{client.last_name}</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>Keresztnév</TableCell>
												<TableCell></TableCell>
												<TableCell>{client.first_name}</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>Email cím</TableCell>
												<TableCell></TableCell>
												<TableCell><Link href={`mailto:${client.email}`}><Button
													variant={"link"} className={"h-auto p-0"}>{client.email} →</Button></Link></TableCell>
											</TableRow>
											<TableRow>
												<TableCell>Telefonszám</TableCell>
												<TableCell></TableCell>
												<TableCell><Link href={`tel:${client.phone}`}><Button variant={"link"}
												                                                      className={"h-auto p-0"}>{client.phone} →</Button></Link></TableCell>
											</TableRow>
										</TableBody>
									</Table>
								</CardContent>
							</Card>
							<Card className={"flex-grow"}>
								<CardHeader>
									<CardTitle>Energetikai fejlesztések</CardTitle>
								</CardHeader>
								<CardContent>
									<Table>
										<TableBody>
											<TableRow>
												<TableCell>2021 óta történt energetikai beruházás</TableCell>
												<TableCell><Checkbox
													checked={client.energeticInvestment.since2021}
													disabled/></TableCell>
											</TableRow>
											<TableRow>
												<TableCell>Ennek befejezési éve</TableCell>
												<TableCell>{client.energeticInvestment.when}</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>Ennek típusa</TableCell>
												<TableCell>{client.energeticInvestment.type}</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>Ennek energia megtakarítása</TableCell>
												<TableCell>{client.energeticInvestment.amount}</TableCell>
											</TableRow>
										</TableBody>
									</Table>
								</CardContent>
							</Card>
							{client.registerMessage && (
							<Card className={"flex-grow"}>
								<CardHeader>
									<CardTitle>Megjegyzés</CardTitle>
								</CardHeader>
								<CardContent>
									{client.registerMessage}
								</CardContent>
							</Card>
							)}
						</div>
					</div>
				)}
			</Template>
		</Gate>
	)
}