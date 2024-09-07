import { CreateAdminForm } from "@/components/admin/createAdminForm";
import Gate from "@/components/auth/gate";
import Navigation from "@/components/common/navigation";

export default function AdminManagement () {
	return (
		<Gate permission={['app', 'admin-management']}>
			<Navigation/>
			<div className={"mt-24 p-4"}>
				<h1 class={"text-lg font-semibold"}>Adminisztrátori fiók létrehozása</h1>
				<CreateAdminForm buttonText={"Adminisztrátor hozzáadása"}/>
			</div>
		</Gate>
	);
}