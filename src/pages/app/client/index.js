import Gate from "@/components/auth/gate";
import Template from "@/components/common/template";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/spinner";
import StatCard from "@/components/ui/statcard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PersonIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { saveAs } from "file-saver";
import { CalendarIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ListClients () {
	const {data: session} = useSession();
	const [clients, setClients] = useState([]);
	const [loading, setLoading] = useState(false);

	async function getData () {
		setLoading(true);
		if (!session) return;
		const data = await axios.post("/api/admin/data/list-companies", {
			accessid: session.user.id,
		}).catch((e) => {
			toast.error("Hiba történt az adatok lekérdezése során");
			console.log(e);
		});
		setClients(data.data.data);
		setLoading(false)
	}

	async function exportData () {
		toast.loading("Exportálás folyamatban")
		if (!session) return;
		const spreadsheet = await axios.post("/api/admin/data/export", {
			accessid: session.user.id,
		}, {responseType: "arraybuffer"}).catch((e) => {
			toast.dismiss();
			toast.error("Hiba történt az adatok exportálása során");
			console.log(e);
		});
		const blob = new Blob([spreadsheet.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
		toast.dismiss();
		toast.success("Sikeres exportálás")
		saveAs(blob, `ugyfelek.xlsx`);
	}

	useEffect(() => {
		getData();
	}, [session]);
	return (
		<Gate permission={['app', 'client-list']}>
			<Template>
				<div className={"p-4"}>
					<div className={"flex flex-row justify-between"}>
						<h1 className={"text-2xl font-bold"}>Ügyfelek</h1>
						<Gate permission={"client-export"} inline><Button onClick={exportData}>Letöltés</Button></Gate>
					</div>
					<p className={"muted mt-2"}>Alább láthatók a különböző beérkezett jelentkezések &quot;Ingyenes
						konzultáció&quot; néven.</p>
					<div className={"flex flex-row space-x-2 mt-4"}>
						<StatCard title={"Ügyfelek száma"} icon={<PersonIcon className={"muted w-4 h-4"}/>}
						          value={clients.length} description={"Az összes ügyfél száma"} loading={loading}/>
						<StatCard title={"Utolsó kapcsolatfelvétel"} icon={<CalendarIcon className={"muted w-4 h-4"}/>}
						          value={new Date(clients[clients.length - 1]?.created_at).toLocaleDateString()}
						          loading={loading}
						          description={"Az utolsó" +
							          " jelentkezés befutásának időpontja"}/>
					</div>
					{loading ? (
						<div className={"flex justify-center items-center p-4 gap-2"}>
							<LoadingSpinner/>
							<p>Betöltés...</p>
						</div>
					) : (clients.length > 0 ? (
						<Card className={"mt-2"}>
							<CardContent className={"p-2"}>
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Státusz</TableHead>
											<TableHead>Cég neve</TableHead>
											<TableHead>Kapcsolattartó</TableHead>
											<TableHead>Email cím</TableHead>
											<TableHead>Telefonszám</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{clients.map((client, index) => (
											<TableRow key={index}>
												<TableCell><Badge>{client.status}</Badge></TableCell>
												<TableCell><Link href={`/app/client/${client._id}`}><Button
													variant={"link"}>{client.company_name} →</Button></Link></TableCell>
												<TableCell>{client.last_name + " " + client.first_name}</TableCell>
												<TableCell>{client.email}</TableCell>
												<TableCell>{client.phone}</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</CardContent>
						</Card>
					) : (
						<div className={"flex justify-center items-center p-4"}>
							<p>Még nincsenek ügyfelek...</p>
						</div>
					))}
				</div>
			</Template>
		</Gate>
	)
}