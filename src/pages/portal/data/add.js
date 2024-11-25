import Gate from "@/components/auth/gate";
import Template from "@/components/common/template";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEdgeStore } from '@/lib/edgestore';
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";


export default function DocumentUpload () {
	const {data: session} = useSession();
	const {edgestore} = useEdgeStore();
	const [Tasks, setTasks] = useState(null);
	const [selected, setSelected] = useState(null);

	async function getTasks () {
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
	}

	useEffect(() => {
		if (session) {
			getTasks();
		}
	}, [session]);

	async function uploadFile () {
		toast.loading("Fájl feltöltése folyamatban...");
		const file = selected.type === "pdf" ? document.getElementById("pdf").files[0] : document.getElementById("xlsx").files[0];
		const res = await edgestore.publicFiles.upload({
			file,
		});
		const resp = await axios.post("/api/client/task/upload", {
			client_id: session.user.id,
			session_token: session.user.session_token,
			task_id: selected._id,
			file: res.url
		}).catch((e) => {
			toast.dismiss()
			toast.error("Hiba történt a fájl feltöltése során");
			console.log(e);
		});

		if (resp.data.success === true) {
			toast.dismiss()
			toast.success("Fájl sikeresen feltöltve");
			getTasks()
			setSelected()
		}
	}

	return (
		<Gate permission="client">
			<Template>
				<>
					{session && (
						<div className={"p-4"}>
							<h1 className={"text-2xl font-semibold"}>Dokumentumok feltöltése</h1>
							<p className={"muted"}>Ezen a felületen töltheted fel a szükséges dokumentumokat,
								amelyek alapján tovább tudunk dolgozni.</p>
						</div>
					)}
					{Tasks && (
						<div className={"p-4 pt-0"}>
							<Select onValueChange={setSelected}>
								<SelectTrigger className={"h-12"}>
									<SelectValue className={"!h-10 leading-normal"}
									             placeholder={"Válassz lépést"}></SelectValue>
								</SelectTrigger>
								<SelectContent>
									{Tasks.map((task, index) => (
										<SelectItem value={task} key={index}
										            disabled={task.status !== "Új" && task.status !== "Újraküldendő"}><Badge
											className={"mr-2"}>{task.status}</Badge>{task.title}</SelectItem>
									))}
								</SelectContent>
							</Select>
							{selected?.type === "form" && (
								<h2>Forms coming soon!</h2>
							)}
							{selected?.type === "pdf" && (
								<Card className={"mt-4"}>
									<CardHeader className={"pb-2"}>
										<CardTitle>{selected.title}</CardTitle>
										<CardDescription>{selected.description}</CardDescription>
										{selected.comment && (
											<Alert>
												<AlertTitle>Megjegyzés az előző feltöltés alapján:</AlertTitle>
												<AlertDescription>{selected.comment}</AlertDescription>
											</Alert>)}
									</CardHeader>
									<CardContent>
										<Input id={"pdf"} type={"file"} accept={".pdf"}></Input>
										<p className={"muted text-muted"}>Kiválasztható fájlkiterjesztések: .pdf</p>
									</CardContent>
									<CardFooter>
										<Button onClick={uploadFile}>Feltöltés</Button>
									</CardFooter>
								</Card>

							)}
							{selected?.type === "xlsx" && (
								<Card className={"mt-4"}>
									<CardHeader className={"pb-2"}>
										<CardTitle>{selected.title}</CardTitle>
										<CardDescription>{selected.description}</CardDescription>
										{selected.comment && (
											<Alert>
												<AlertTitle>Megjegyzés az előző feltöltés alapján:</AlertTitle>
												<AlertDescription>{selected.comment}</AlertDescription>
											</Alert>)}
									</CardHeader>
									<CardContent>
										<Input id={"xlsx"} type={"file"} accept={".xlsx.xlsm.xls"}></Input>
										<p className={"muted text-muted"}>Kiválasztható fájlkiterjesztések: .xlsx, .xls,
											.xlsm</p>
									</CardContent>
									<CardFooter>
										<Button onClick={uploadFile}>Feltöltés</Button>
									</CardFooter>
								</Card>
							)}
						</div>
					)}
				</>
			</Template>
		</Gate>
	)
		;
}