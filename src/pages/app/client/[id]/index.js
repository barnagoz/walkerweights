import TaskModal from "@/components/admin/taskModal";
import Gate from "@/components/auth/gate";
import Template from "@/components/common/template";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
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
import { CalendarIcon, ChevronDown, LightbulbIcon, LucideNewspaper, PlusIcon } from "lucide-react";
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
	const [forms, setForms] = useState([]);

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [type, setType] = useState("");
	const [formID, setFormID] = useState("");
	const [status, setStatus] = useState("");
	const [projectType, setProjectType] = useState("");
	const [addTasks, setAddTasks] = useState(false);

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
		setStatus(data.data.data.status);
		setProjectType(data.data.data.project_type);
	}

	async function sendTask () {
		const data = await axios.post("/api/admin/data/task/send", {
			accessid: session.user.id,
			clientid: id,
			title: title,
			description: description,
			type: type,
			formID: formID,
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

	async function changeStatus () {
		const data = await axios.post("/api/admin/data/change-state", {
			accessid: session.user.id,
			clientid: id,
			status: status,
			type: projectType,
			addTasks: addTasks,
		}).catch((e) => {
			toast.error("Hiba történt a státusz módosítása során");
			console.log(e);
		});

		if (data.data.success) {
			toast.success("Státusz sikeresen módosítva");
			getData();
		}
	}

	async function getForms () {
		if (!session) return;
		const data = await axios.post("/api/admin/data/form/list", {
			accessid: session?.user?.id,
		}).catch((e) => {
			toast.error("Hiba történt az adatok lekérdezése során");
			console.log(e);
		});
		setForms(data.data.data);
	}

	useEffect(() => {
		getData();
		getForms();
	}, [session]);

	async function sendNotification (type) {
		const data = await axios.post("/api/admin/data/send-notification", {
			accessid: session.user.id,
			clientid: id,
			emailtemplate: type,
		}).catch((e) => {
			toast.error("Hiba történt az értesítés küldése során");
			console.log(e);
		});

		if (data.data.success) {
			toast.success("Értesítés sikeresen elküldve");
		}
	}

	return (
		<Gate permission={['app', 'client-list']}>
			<Template>
				{client && (
					<div className={"p-4"}>
						<Link href={"/app/client"}><Button variant={"link"} className={"h-auto p-0"}>←
							Vissza</Button></Link>
						<div className={"flex flex-row space-x-2 justify-between"}>
							<h1 className={"text-2xl font-bold"}>{client.company_name}</h1>
							<div className={"flex flex-row gap-2 justify-end"}>
								<Gate permission={"send-notification"} inline={true}>
									<DropdownMenu>
										<DropdownMenuTrigger><Button variant={"outline"}>Értesítés <ChevronDown
											className="ml-1" size={15}/></Button></DropdownMenuTrigger>
										<DropdownMenuContent>
											<DropdownMenuLabel>Értesítés küldése a kliensnek</DropdownMenuLabel>
											<DropdownMenuSeparator/>
											<DropdownMenuItem onClick={() => sendNotification("data-rejected")}>Adatfeltöltés
												elutasítva →</DropdownMenuItem>
											<DropdownMenuItem onClick={() => sendNotification("more-details-needed")}>További
												adatok feltöltése szükséges →</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</Gate>
								<Dialog>
									<DialogTrigger>
										<Button variant={"outline"}>Projekt státusz mód.</Button>
									</DialogTrigger>
									<DialogContent>
										<DialogHeader>
											<DialogTitle>Projekt státuszának módosítása</DialogTitle>
											<DialogDescription>
												Itt tudod a projekt státuszát, valamint típusát módosítani.
											</DialogDescription>
										</DialogHeader>
										<div className={"flex flex-col gap-2"}>
											<Label htmlFor="status">
												Státusz
											</Label>
											<Select onValueChange={(e) => setStatus(e)} defaultValue={status}>
												<SelectTrigger>
													<SelectValue placeholder="Státusz kiválasztása"/>
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="Feldolgozás alatt">Feldolgozás alatt</SelectItem>
													<SelectItem value="Folyamatban">Folyamatban</SelectItem>
													<SelectItem value="Késleltetett">Késleltetett</SelectItem>
													<SelectItem value="Befejezve">Befejezve</SelectItem>
													<SelectItem value="Törölve">Törölve</SelectItem>
												</SelectContent>
											</Select>
											<Label htmlFor="type">
												Típus
											</Label>
											<Select onValueChange={(e) => setProjectType(e)} defaultValue={projectType}>
												<SelectTrigger>
													<SelectValue placeholder="Típus kiválasztása"/>
												</SelectTrigger>
												<SelectContent>
													<SelectItem
														value="Világításkorszerűsítés">Világításkorszerűsítés</SelectItem>
												</SelectContent>
											</Select>
											<div className={"flex flex-row gap-2 items-center"}>
												<Checkbox checked={addTasks}
												          onCheckedChange={(e) => setAddTasks(e)}></Checkbox>
												<Label>Projekthez tartozó feladatok hozzáadása</Label>
											</div>
											<p className={"!text-red-600 muted"}>Figyelem! Amennyiben ez be van pipálva,
												akkor
												függetlenül a korábbi feladatoktól hozzá fogja adni a rendszer a
												projekt alapvető feladatait.</p>
										</div>
										<DialogFooter>
											<Button onClick={changeStatus}>Elküldés</Button>
										</DialogFooter>
									</DialogContent>
								</Dialog>
								<Gate permission={"client-task-send"}>
									<Sheet>
										<SheetTrigger asChild>
											<Button className={"gap-1 pl-3"}><PlusIcon className={"w-4 h-4"}/> Feladat
												kiosztása</Button>
										</SheetTrigger>
										<SheetContent>
											<SheetHeader>
												<SheetTitle>Feladat kiosztása</SheetTitle>
												<SheetDescription>
													Osszon ki egy feladatot az ügyfélnek, ezzel adatok megadását kérve
													tőle.
												</SheetDescription>
											</SheetHeader>
											<div className={"flex flex-col gap-2"}>
												<div>
													<Label htmlFor="title">
														Cím
													</Label>
													<Input id="title" value={title}
													       onChange={(e) => setTitle(e.target.value)}
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
															<SelectItem value="pdf">Feltöltött PDF
																dokumentum</SelectItem>
															<SelectItem value="xlsx">Feltöltött Excel
																táblázat</SelectItem>
														</SelectContent>
													</Select>
												</div>
												{type === "form" && (
													<div>
														<Label htmlFor="form">
															Kérdőív
														</Label>
														<Select onValueChange={(e) => setFormID(e)}
														        defaultValue={formID}>
															<SelectTrigger>
																<SelectValue placeholder="Kérdőív kiválasztása"/>
															</SelectTrigger>
															<SelectContent>
																{forms.map((form, index) => (
																	<SelectItem value={form._id}
																	            key={index}>{form.title}</SelectItem>
																))}
															</SelectContent>
														</Select>
													</div>
												)}
											</div>
											<SheetFooter className={"mt-4"}>
												<SheetClose asChild>
													<Button onClick={sendTask}>Küldés</Button>
												</SheetClose>
											</SheetFooter>
										</SheetContent>
									</Sheet>
								</Gate>
							</div>
						</div>
						<div className={"flex flex-row space-x-2 mt-4"}>
							<StatCard title={"Projekt státusza"}
							          icon={<LucideNewspaper className={"muted w-4 h-4"}/>}
							          value={client.status}/>
							<StatCard title={"Projekt típusa"}
							          icon={<LightbulbIcon className={"muted w-4 h-4"}/>}
							          value={client.project_type}/>
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