import { RegisterClientForm } from "@/components/client/forms/register-client-form";
import Layout from "@/components/common/layout";

export default function Jelentkezes () {
	return (
		<Layout>
			<div className={"w-full py-8 px-4 bg-brand-green text-white"}>
				<h1 className={"text-2xl font-bold mb-2"}>Ingyenes konzultáció</h1>
				<p>Töltse ki űrlapunkat és kollégáink 24 órán belül visszahívják! Nálunk nincs semmi vesztenivalója,
					hiszen első konzultációnk teljesen ingyenes akár beruházóként, akár energiakereskedőként, vagy csak
					szakmai tanácsért fordul hozzánk.</p>
			</div>
			<div className={"w-full p-4"}>
				<RegisterClientForm/>
			</div>
		</Layout>
	);
}
