import UpdateAdminAccessPanel from "@/components/admin/menus/update-admin-access-panel";
import ConfirmPopup from "@/components/ui/confirm-popup";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { EllipsisVerticalIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ActionMenu ({accessid, admin, getAdmins}) {
	const [deletePopup, setDeletePopup] = useState(false);
	const [passwordPopup, setPasswordPopup] = useState(false);
	const [editPanel, setEditPanel] = useState(false);

	async function deleteAccount () {
		const data = await axios.post("/api/admin/delete", {
			accessid: accessid,
			email: admin.email,
		}).catch((e) => {
			setDeletePopup(false);
			toast.error("Hiba történt a törlés során");
			console.log(e)
		});

		if (data.data.success) {
			setDeletePopup(false);
			toast.success("Sikeres törlés");
			getAdmins();
		}
	}

	async function resetPassword () {
		const data = await axios.post("/api/admin/password-email", {
			accessid: accessid,
			email: admin.email,
			first_name: admin.first_name,
			last_name: admin.last_name,
		}).catch((e) => {
			setDeletePopup(false);
			toast.error("Hiba történt a levél elküldése során");
			console.log(e)
		});

		if (data.data.success) {
			setDeletePopup(false);
			toast.success("Sikeresen elküldve");
			getAdmins();
		}
	}


	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger className={"mt-2"}>
					<Button className={"px-2.5"}
					        variant={"secondary"}>
						<EllipsisVerticalIcon
							className={"w-4 h-4"}/>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>Fiók kezelése</DropdownMenuLabel>
					<DropdownMenuSeparator/>
					<DropdownMenuItem onClick={() => setEditPanel(true)}>Jogosultságok szerkesztése</DropdownMenuItem>
					<DropdownMenuItem onClick={() => {
						setPasswordPopup(true)
					}}>Jelszó visszaállítása</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setDeletePopup(true)}>Törlés</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<UpdateAdminAccessPanel admin={admin} accessid={accessid} isOpen={editPanel} setIsOpen={setEditPanel}
			                        update={getAdmins}/>
			<ConfirmPopup title={"Biztosan visszaállítod a fiók jelszavát?"}
			              message={"A jelszó visszaállítása után az adminisztrátor emailt kap, amelyben egy link" +
				                 " segítségével megváltoztathatja a jelszavát. Amennyiben az adminisztrátor nem" +
				                 " kattint a linkre, a jelszó nem fog változni."}
			              onConfirm={resetPassword}
			              isOpen={passwordPopup}
			              setIsOpen={setPasswordPopup}
			></ConfirmPopup>
			<ConfirmPopup title={"Biztosan kitörlöd a fiókot?"}
			              message={"A törlést követően az" +
				                 " adminisztrátor nem fog tudni többet bejelentkezni, adatokat megtekinteni, megváltaztotni." +
				                 " Biztosan ezt akarod?"}
			              onConfirm={deleteAccount}
			              isOpen={deletePopup}
			              setIsOpen={setDeletePopup}
			></ConfirmPopup>
		</>
	);
}