import { CreateAdminForm } from "@/components/admin/forms/create-admin-form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export default function CreateAdminPanel () {
	return (
		<Sheet>
			<SheetTrigger><Button>Fiók létrehozása</Button></SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Adminiszrtrátori fiók létrehozása</SheetTitle>
					<SheetDescription>
						Adminisztrátori fiók létrehozásához töltsd ki az alapvető adatokat, majd egy emailt küldünk, ahol a felhasználó meg tudja adni jelszavát.
					</SheetDescription>
					<CreateAdminForm buttonText={"Email küldése"}/>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
}