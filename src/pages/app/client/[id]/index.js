import TaskModal from "@/components/admin/taskModal";
import Gate from "@/components/auth/gate";
import Template from "@/components/common/template";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from "@/components/ui/sheet";
import StatCard from "@/components/ui/statcard";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { CalendarIcon, PlusIcon } from "lucide-react";
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

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [type, setType] = useState("");

	async function getData () {
		if (!session) return;
		const data = await axios.post("/api/admin/data/company", {
			accessid: session.user.id,
			clientid: id,
			getTasks: true,
		}).catch((e) => {
			toast.error("Hiba történt az adatok lekérdezése során");
			console.log(e);
		});
		console.log(data.data.data)
		setClient(data.data.data);
	}

	async function sendTask () {
		const data = await axios.post("/api/admin/data/task/send", {
			accessid: session.user.id,
			clientid: id,
			title: title,
			description: description,
			type: type,
		}).catch((e) => {
			toast.error("Hiba történt a feladat kiosztása során");
			console.log(e);
		});

		if (data.data.success) {
			toast.success("Feladat sikeresen kiosztva");
			getData();
			setTitle("");
			setDescription("");
			setType("");
		}
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
						<div className={"flex flex-row space-x-2 justify-between"}>
							<h1 className={"text-2xl font-bold"}>{client.company_name}</h1>
							<Sheet>
								<SheetTrigger asChild>
									<Button className={"gap-1 pl-3"}><PlusIcon className={"w-4 h-4"}/> Feladat kiosztása</Button>
								</SheetTrigger>
								<SheetContent>
									<SheetHeader>
										<SheetTitle>Feladat kiosztása</SheetTitle>
										<SheetDescription>
											Osszon ki egy feladatot az ügyfélnek, ezzel adatok megadását kérve tőle.
										</SheetDescription>
									</SheetHeader>
									<div className={"flex flex-col gap-2"}>
										<div>
											<Label htmlFor="title">
												Cím
											</Label>
											<Input id="title" value={title} onChange={(e) => setTitle(e.target.value)}
											       placeholder={"pl." +
												       " Dokumentált" +
												       " fénymérést igazoló" +
												       " dokumentum feltöltése"} className="col-span-3"/>
										</div>
										<div>
											<Label htmlFor="description">
												Leírás
											</Label>
											<Textarea id="description" value={description}
											          onChange={(e) => setDescription(e.target.value)}
											          className="col-span-3"/>
										</div>
										<div>
											<Label htmlFor="type">
												Típus
											</Label>
											<Select onValueChange={(e) => setType(e)} defaultValue={type}>
												<SelectTrigger>
													<SelectValue placeholder="Típus kiválasztása"/>
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="form">Kérdőív</SelectItem>
													<SelectItem value="pdf">Feltöltött PDF dokumentum</SelectItem>
													<SelectItem value="xlsx">Feltöltött Excel táblázat</SelectItem>
												</SelectContent>
											</Select>
										</div>
									</div>
									<SheetFooter className={"mt-4"}>
										<SheetClose asChild>
											<Button onClick={sendTask}>Küldés</Button>
										</SheetClose>
									</SheetFooter>
								</SheetContent>
							</Sheet>
						</div>
						<div className={"flex flex-row space-x-2 mt-4"}>
							<StatCard title={"Kapcsolatfelvétel dátuma"}
							          icon={<CalendarIcon className={"muted w-4 h-4"}/>}
							          value={new Date(client.created_at).toLocaleDateString()}/>
						</div>
						<div className={"flex flex-wrap w-full gap-2 mt-2"}>
							<Card className={"flex-grow"}>
								<CardHeader>
									<CardTitle>Feladatok</CardTitle>
								</CardHeader>
								<CardContent>
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
											{client.tasks.map((task, index) => (
												<TableRow key={index}>
													<TableCell>{task.title}</TableCell>
													<TableCell>{task.description}</TableCell>
													<TableCell>{task.type}</TableCell>
													<TableCell>{task.status}</TableCell>
													<TableCell><TaskModal task={task} getData={getData}><Button
														variant={"link"}>Megtekintés →</Button></TaskModal></TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</CardContent>
							</Card>
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