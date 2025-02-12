import Gate from "@/components/auth/gate";
import Layout from "@/components/common/layout";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/spinner";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import axios from "axios";
import { PlusIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

export default function DocumentUpload () {
	const {data: session} = useSession();
	const [Tasks, setTasks] = useState(null);
	const [loading, setLoading] = useState(false);

	async function getTasks () {
		setLoading(true);
		const resp = await axios.post("/api/client/task/get", {
			client_id: session.user.id,
			session_token: session.user.session_token
		}).catch((e) => {
			toast.error("Hiba történt az adatok lekérdezése során");
			console.log(e);
		});

		if (resp.data.success === true) {
			setTasks(resp.data.data);
		}
		setLoading(false);
	}

	useEffect(() => {
		if (session) {
			getTasks();
		}
	}, [session]);


	return (
		<Gate permission="client">
			<Layout>
				<>
					{session && (
						<div className={"p-4"}>
							<div className={"flex flex-row space-x-2 justify-between"}>
								<h1 className={"text-2xl font-semibold"}>Feltöltött dokumentumok</h1>
								<Link href={"/portal/data/add"}><Button className={"gap-1 pl-3"}><PlusIcon
									className={"w-4 h-4"}/> Dokumentum feltöltése</Button></Link>
							</div>
							<p className={"muted"}>Tekintsd meg eddig feltöltött, vagy tölts fel új
								dokumentumot rendszerünkbe!</p>
						</div>
					)}
					{loading ? (
						<div className={"w-full p-4 gap-2 flex justify-center items-center"}>
							<LoadingSpinner/>
							<p>Betöltés...</p>
						</div>
					) : (Tasks && (
						<div className={"px-4"}>
							<Table>
								<TableHeader>
									<TableRow>
										<TableCell>Cím</TableCell>
										<TableCell>Röv. leírás</TableCell>
										<TableCell>Típus</TableCell>
										<TableCell>Státusz</TableCell>
										<TableCell>Link</TableCell>
									</TableRow>
								</TableHeader>
								<TableBody>
									{Tasks.map((task, index) => (
										<TableRow key={index}>
											<TableCell>{task.title}</TableCell>
											<TableCell>{task.description}</TableCell>
											<TableCell>{task.type}</TableCell>
											<TableCell>{task.status}</TableCell>
											<TableCell>WorkInProgress</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					))}
				</>
			</Layout>
		</Gate>
	)
		;
}