import ActionMenu from "@/components/admin/actionMenu";
import CreateAdminPanel from "@/components/admin/createAdminPanel";
import Gate from "@/components/auth/gate";
import Navigation from "@/components/common/navigation";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function AdminManagement () {
	const {data: session} = useSession();
	const [Admins, setAdmins] = useState([]);

	async function getAdmins () {
		if (!session) return;
		const data = await axios.post("/api/admin/list", {
			accessid: session.user.id,
		});
		const admins = data.data.data;

		setAdmins(admins);
	}

	useEffect(() => {
		getAdmins();
	}, [session]);
	return (
		<Gate permission={['app', 'admin-management']}>
			<Navigation/>
			<div className={"mt-24 p-4"}>
				<div className={"flex justify-between"}>
					<h1 className={"text-2xl font-bold"}>Adminisztrátorok</h1>
					<CreateAdminPanel/>
				</div>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Keresztnév</TableHead>
							<TableHead>Vezetéknév</TableHead>
							<TableHead>Email cím</TableHead>
							<TableHead>Jogosultságok</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{Admins.map((admin, index) => (
							<TableRow key={index}>
								<TableCell>{admin.first_name}</TableCell>
								<TableCell>{admin.last_name}</TableCell>
								<TableCell>{admin.email}</TableCell>
								<TableCell className={""}>{admin.access_list.map((permission) => (<>
									<li>{permission}</li>
								</>))}</TableCell>
								<ActionMenu admin={admin} accessid={session.user.id} getAdmins={getAdmins}/>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</Gate>
	);
}