import UpdateAdminAccessPanel from "@/components/admin/updateAdminAccessPanel";
import AreYouSurePopup from "@/components/common/areYouSurePopup";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
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

export default function ActionMenu ({accessid, admin, getAdmins}) {
	const [deletePopup, setDeletePopup] = useState(false);
	const [editPanel, setEditPanel] = useState(false);

	async function deleteAccount () {
		const data = await axios.post("/api/admin/delete", {
			accessid: accessid,
			email: admin.email,
		});

		if (data.data.success){
			setDeletePopup(false);
			toast.success("Sikeres törlés");
			getAdmins();
		} else {
			setDeletePopup(false);
			toast.error("Hiba történt a törlés során");
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
					<DropdownMenuItem onClick={()=>setEditPanel(true)}>Jogosultságok szerkesztése</DropdownMenuItem>
					<DropdownMenuItem onClick={()=>setDeletePopup(true)}>Törlés</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<UpdateAdminAccessPanel admin={admin} accessid={accessid} isOpen={editPanel} setIsOpen={setEditPanel}/>
			<AreYouSurePopup title={"Biztosan kitörlöd a fiókot?"}
			                 message={"A törlést követően az" +
				                 " adminisztrátor nem fog tudni többet bejelentkezni, adatokat megtekinteni, megváltaztotni." +
				                 " Biztosan ezt akarod?"}
			                 onConfirm={deleteAccount}
			                 isOpen={deletePopup}
			                 setIsOpen={setDeletePopup}
			></AreYouSurePopup>
		</>
	);
}