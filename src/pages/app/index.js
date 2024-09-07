import Gate from "@/components/auth/gate";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function App () {
	return (
		<Gate permission="app">
			<div>
				<h1>App</h1>
				<Gate permission="admin-management" inline>
					<Link href={"/app/admin-management"}><Button>Adminisztrátori fiókok kezelése</Button></Link>
				</Gate>
			</div>
		</Gate>);
}