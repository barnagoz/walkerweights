import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function TaskModal ({task, children, getData}) {
	const {data: session} = useSession();
	const [Comment, setComment] = useState("");
	const [DialogState, setDialogState] = useState(false);

	async function accept () {
		const data = await axios.post("/api/admin/data/task/accept", {
			accessid: session.user.id,
			taskid: task._id,
			comment: Comment,
		}).catch((e) => {
			toast.error("Hiba történt a feladat elfogadása során");
			console.log(e);
		});

		if (data.data.success) {
			toast.success("Feladat sikeresen elfogadva");
			setDialogState(false);
			getData();
		}
	}

	async function resend () {
		const data = await axios.post("/api/admin/data/task/resend", {
			accessid: session.user.id,
			taskid: task._id,
			comment: Comment,
		}).catch((e) => {
			toast.error("Hiba történt a feladat újraküldése során");
			console.log(e);
		});

		if (data.data.success) {
			toast.success("Feladat sikeresen újraküldve");
			setDialogState(false);
			getData();
		}
	}

	return (
		<Dialog open={DialogState} onOpenChange={() => setDialogState(!DialogState)}>
			<DialogTrigger>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle><Badge className={"mr-2"}>{task.status}</Badge>{task.title}</DialogTitle>
					<DialogDescription>{task.description}</DialogDescription>
				</DialogHeader>
				{task.status === "Új" && (
					<div className={"flex w-full p-4 justify-center items-center"}>
						<p>Várakozás beküldésre...</p>
					</div>
				)}
				{task.status !== "Új" && (
					<>
						{task.type === "form" && (
							<h2>Forms coming soon!</h2>
						)}
						{task.type === "pdf" && (
							<div>
								<Link href={task.file_submission?.file_url}><Button>Fájl megnyitása→</Button></Link>
								<p className={"text-muted muted mt-2"}>Beküldve
									ekkor: {new Date(task.file_submission?.submitted_at).toLocaleString()}</p>
							</div>
						)}
						{task.type === "xlsx" && (
							<div>
								<Link href={task.file_submission?.file_url}><Button>Fájl letöltése→</Button></Link>
								<p className={"text-muted muted mt-2"}>Beküldve
									ekkor: {new Date(task.file_submission?.submitted_at).toLocaleString()}</p>
							</div>
						)}
					</>
				)}
				{task.status === "Beküldve" && (
					<>
						<Separator/>
						<Textarea value={Comment} onChange={(e) => setComment(e.target.value)} id={"comment"}
						          placeholder={"Megjegyzés"}></Textarea>
						<div className={"flex w-full gap-2"}>
							<Button variant={"destructive"} className={"w-full"} onClick={resend}>Újraküldendő</Button>
							<Button className={"w-full"} onClick={accept}>Elfogadás</Button>
						</div>
					</>
				)}
			</DialogContent>
		</Dialog>
	)
}