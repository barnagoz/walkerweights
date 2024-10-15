import Gate from "@/components/auth/gate";
import { RegisterClientForm } from "@/components/client/registerClientForm";
import Template from "@/components/common/template";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Account () {
	const {data: session} = useSession();
	const [Data, setData] = useState(null);

	async function getCompanyData () {
		const resp = await axios.post("/api/client/get-account", {
			client_id: session.user.id,
			session_token: session.user.session_token
		});

		if (resp.status === 200) {
			setData(resp.data.data);
		}
	}

	useEffect(() => {
		if (session) {
			getCompanyData();
		}
	}, [session]);

	return (
		<Gate permission="client">
			<Template>
				{session && (
					<div className={"p-4"}>
						<h1 className={"text-2xl font-semibold"}>Adatok módosítása</h1>
						<p className={"muted mb-4"}>Megtekintheted, valamint módosíthatod a kapcsolatfelvételkor
							megadott adatokat.</p>
						{Data && (
							<RegisterClientForm data={Data} isEdit={true}/>

						)}
					</div>
				)}
			</Template>
		</Gate>
	);
}