import Gate from "@/components/auth/gate";
import Template from "@/components/common/template";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { LoadingSpinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Forms () {
	const {data: session} = useSession();
	const [forms, setForms] = useState([]);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [questions, setQuestions] = useState([]);
	const [newQuestion, setNewQuestion] = useState("");
	const [loading, setLoading] = useState(false)

	async function getForms () {
		setLoading(true)
		if (!session) return;
		const data = await axios.post("/api/admin/data/form/list", {
			accessid: session?.user?.id,
		}).catch((e) => {
			toast.error("Hiba történt az adatok lekérdezése során");
			console.log(e);
		});
		setForms(data.data.data);
		setLoading(false)
	}

	function addQuestion () {
		setQuestions([...questions, newQuestion]);
		setNewQuestion("");
	}

	function removeQuestion (index) {
		setQuestions(questions.filter((_, i) => i !== index));
	}

	async function saveForm () {
		toast.loading("Űrlap mentése folyamatban...")
		const response = await axios.post("/api/admin/data/form/create", {
			accessid: session?.user?.id,
			title,
			description,
			questions
		}).catch((e) => {
			toast.dismiss();
			toast.error("Hiba történt az űrlap létrehozása során");
			console.log(e);
		});

		if (response.data.success === true) {
			toast.dismiss();
			toast.success("Űrlap sikeresen létrehozva");
			setTitle("");
			setDescription("");
			setQuestions([]);
		}
	}

	useEffect(() => {
		if (session?.user?.id) {
			getForms()
		}
	}, [session]);

	return (
		<Gate permission={["app", "form-list"]}>
			<Template>
				<div className={"p-4"}>
					<div className={"flex flex-row justify-between"}>
						<h1 className={"text-2xl font-bold"}>Űrlapok</h1>
						<Gate permission={"client-export"} inline><Sheet>
							<SheetTrigger asChild>
								<Button className={"gap-1 pl-3"}><PlusIcon className={"w-4 h-4"}/> Kérdőív
									létrehozása</Button>
							</SheetTrigger>
							<SheetContent>
								<SheetHeader>
									<SheetTitle>Kérdőív létrehozása</SheetTitle>
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
										<Label htmlFor="question">
											Kérdések
										</Label>
										<div className={"flex"}>
											<Input id="question" placeholder={"pl. Milyen fénymérőt használt?"}
											       className="col-span-3" value={newQuestion}
											       onChange={(e) => setNewQuestion(e.target.value)}/>
											<Button className={"ml-2 px-3"} onClick={addQuestion}><PlusIcon
												className={"w-4" +
													" h-4"}/></Button>
										</div>
										<div className={"mt-2 flex flex-col gap-2"}>
											{questions.map((question, index) => (
												<div key={index} className={"flex justify-between items-center"}>
													<p>{question}</p>
													<Button className={"ml-2 px-3"}
													        onClick={() => removeQuestion(index)}><MinusIcon
														className={"w-4 h-4"}/></Button>
												</div>
											))}
										</div>
									</div>
								</div>
								<SheetFooter className={"mt-4"}>
									<SheetClose asChild>
										<Button onClick={saveForm}>Mentés</Button>
									</SheetClose>
								</SheetFooter>
							</SheetContent>
						</Sheet>
						</Gate>
					</div>
					<p className={"muted mt-2"}>Alább láthatók a különböző űrlapok, amelyeket az ügyfeleknek lehet
						küldeni.</p>
					<div className={"flex flex-row space-x-2 mt-4 flex-wrap"}>
						{loading ? (
							<div className={"w-full flex justify-center items-center p-4 gap-2"}>
								<LoadingSpinner/>
								<p>Betöltés...</p>
							</div>
						) : (forms.length > 0 ? forms.map((form, index) => (
							<Card key={index} className={"min-w-[300px] flex-grow"}>
								<CardHeader>
									<CardTitle>{form.title}</CardTitle>
									<CardDescription>{form.description}</CardDescription>
								</CardHeader>
								<CardContent>
									<p>Felhasználva {form.usages} feladatban</p>
									<Collapsible>
										<CollapsibleTrigger className={"font-semibold hover:underline"}>Kérdések
											megjelenítése →</CollapsibleTrigger>
										<CollapsibleContent>
											{form.fields.map((question, index) => (
												<p key={index}>{question}</p>
											))}
										</CollapsibleContent>
									</Collapsible>
								</CardContent>
							</Card>
						)) : (
							<div className={"w-full flex justify-center items-center p-4 gap-2"}>
								<p>Nincsenek kérdőívek...</p>
							</div>
						))}
					</div>
				</div>
			</Template>
		</Gate>
	);
}