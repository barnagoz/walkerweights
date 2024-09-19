import Gate from "@/components/auth/gate";
import Template from "@/components/common/template";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import StatCard from "@/components/ui/statcard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PersonIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { CalendarIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { saveAs } from "file-saver";

export default function ListClients () {
	const {data: session} = useSession();
	const [clients, setClients] = useState([]);

	async function getData () {
		if (!session) return;
		const data = await axios.post("/api/admin/data/list-companies", {
			accessid: session.user.id,
		});
		setClients(data.data.data);
	}

	async function exportData () {
		if (!session) return;
		const spreadsheet = await axios.post("/api/admin/data/export", {
			accessid: session.user.id,
		}, {responseType: "arraybuffer"});
		const blob = new Blob([spreadsheet.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
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
						          value={clients.length} description={"Az összes ügyfél száma"}/>
						<StatCard title={"Utolsó kapcsolatfelvétel"} icon={<CalendarIcon className={"muted w-4 h-4"}/>}
						          value={new Date(clients[clients.length - 1]?.created_at).toLocaleDateString()}
						          description={"Az utolsó" +
							          " jelentkezés befutásának időpontja"}/>
					</div>
					<Card className={"mt-2"}>
						<CardContent className={"p-2"}>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Cég neve</TableHead>
										<TableHead>Kapcsolattartó</TableHead>
										<TableHead>Email cím</TableHead>
										<TableHead>Telefonszám</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{clients.map((client, index) => (
										<TableRow key={index}>
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
				</div>
			</Template>
		</Gate>
	)
}