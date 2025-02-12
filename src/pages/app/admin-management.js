import ActionMenu from "@/components/admin/menus/action-menu";
import CreateAdminPanel from "@/components/admin/menus/create-admin-panel";
import Gate from "@/components/auth/gate";
import Layout from "@/components/common/layout";
import { LoadingSpinner } from "@/components/ui/spinner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminManagement () {
	const {data: session} = useSession();
	const [Admins, setAdmins] = useState([]);
	const [loading, setLoading] = useState(false);

	async function getAdmins () {
		setLoading(true);
		if (!session) return;
		const data = await axios.post("/api/admin/list", {
			accessid: session.user.id,
		}).catch((e) => {
			toast.error("Hiba történt az adminisztrátorok lekérdezése során");
			console.log(e);
		});
		const admins = data.data.data;

		setAdmins(admins);
		setLoading(false);
	}

	useEffect(() => {
		getAdmins();
	}, [session]);

	return (
		<Gate permission={['app', 'admin-management']}>
			<Layout>
				<div className={"p-4"}>
					<div className={"flex justify-between"}>
						<h1 className={"text-2xl font-bold"}>Adminisztrátorok</h1>
						<CreateAdminPanel/>
					</div>
					{loading ? (
						<div className="flex items-center justify-center ga-2 p-4">
							<LoadingSpinner/>
							<p>Betöltés...</p>
						</div>
					) : (
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Vezetéknév</TableHead>
									<TableHead>Keresztnév</TableHead>
									<TableHead>Email cím</TableHead>
									<TableHead>Jogosultságok</TableHead>
									<TableHead></TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{Admins.map((admin, index) => (
									<TableRow key={index}>
										<TableCell>{admin.last_name}</TableCell>
										<TableCell>{admin.first_name}</TableCell>
										<TableCell>{admin.email}</TableCell>
										<TableCell className={""}>{admin.access_list.map((permission) => (<>
											<li>{permission}</li>
										</>))}</TableCell>
										<ActionMenu admin={admin} accessid={session.user.id} getAdmins={getAdmins}/>
									</TableRow>
								))}
							</TableBody>
						</Table>
					)}
				</div>
			</Layout>
		</Gate>
	);
}