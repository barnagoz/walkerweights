import Gate from "@/components/auth/gate";
import Template from "@/components/common/template";

export default function App () {
	return (
		<Gate permission="app">
			<Template>
				<div className={"p-4"}>
					<h1 className={"text-2xl font-bold"}>Adminisztrációs konzol</h1>
				</div>
			</Template>
		</Gate>
	);
}