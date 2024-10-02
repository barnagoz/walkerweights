import { UpdateAdminAccessForm } from "@/components/admin/updateAdminAccessForm";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export default function UpdateAdminAccessPanel ({admin, accessid, isOpen, setIsOpen, update}) {
	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>{`${admin.first_name} ${admin.last_name} jogosultságainak szerkesztése`}</SheetTitle>
					<UpdateAdminAccessForm defaultValues={admin.defaccesslist} accessid={accessid} email={admin.email}
					                       update={update} setPanelOpen={setIsOpen}/>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
}