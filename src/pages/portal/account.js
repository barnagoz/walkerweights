import Gate from "@/components/auth/gate";
import { RegisterClientForm } from "@/components/client/registerClientForm";
import Template from "@/components/common/template";
import { LoadingSpinner } from "@/components/ui/spinner";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Account () {
	const {data: session} = useSession();
	const [Data, setData] = useState(null);
	const [loading, setLoading] = useState(false);

	async function getCompanyData () {
		setLoading(true);
		const resp = await axios.post("/api/client/get-account", {
			client_id: session.user.id,
			session_token: session.user.session_token
		}).catch((e) => {
			toast.error("Hiba történt az adatok lekérdezése során");
			console.log(e);
		});

		if (resp.status === 200) {
			setData(resp.data.data);
		}
		setLoading(false);
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

						{loading ? (
							<div className={"w-full p-4 flex justify-center items-center gap-2"}>
								<LoadingSpinner/>
								<p>Betöltés...</p>
							</div>
						) : (Data && (
							<RegisterClientForm data={Data} isEdit={true}/>
						))}
					</div>
				)}
			</Template>
		</Gate>
	);
}