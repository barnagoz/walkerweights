import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/spinner";
import { ShieldX } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Gate component to control access based on user permissions.
 *
 * @param {Object} props - The component props.
 * @param {string|string[]} props.permission - The required permission(s) for access.
 * @param {React.ReactNode} props.children - The child components to render if access is allowed.
 * @returns {React.ReactNode} The children if access is allowed, otherwise null.
 */
export default function Gate ({permission, children, inline}) {
	const {data: session, status} = useSession();
	const [isAllowed, setIsAllowed] = useState(undefined);

	useEffect(() => {
		if (status === "authenticated") {
			if (!permission) {
				// Allow access if no specific permission is required
				setIsAllowed(true);
			} else if (permission === "client") {
				setIsAllowed(session.user.type === "client");
			} else if (typeof permission === "string") {
				// Allow access if the user has the required permission
				if (session.user.type === "admin") {
					setIsAllowed(session.user.access_list.includes(permission));
				} else {
					setIsAllowed(false);
				}
			} else if (Array.isArray(permission)) {
				// Allow access if the user has all the required permissions
				if (session.user.type === "admin") {
					setIsAllowed(permission.every(p => session.user.access_list.includes(p)));
				} else {
					setIsAllowed(false);
				}
			}
		}
	}, [status, permission, session]);

	if (status === "unauthenticated") {
		return (<div className={"w-full h-screen flex items-center justify-center flex-col"}>
			<ShieldX className={"w-12 h-12 mb-4"}/>
			<h1 className={"text-lg font-bold"}>Hozzáférés megtagadva</h1>
			<p>Nincs jogosultsága megtekinteni az oldalt, mivel nincs bejelentkezve.</p>
			<Link href={"/auth/login"}><Button className={"px-12 mt-2"}>Bejelentkezés →</Button></Link>
		</div>);
	} else if (status === "loading" || isAllowed === undefined) {
		return <div className={`w-full ${inline ? "h-screen" : "h-auto"} flex items-center justify-center flex-col`}>
			<LoadingSpinner/>
			<p>Betöltés...</p>
		</div>;
	} else if (inline) {
		return isAllowed ? children : null;
	} else {
		return isAllowed ? children : (
			<div className={"w-full h-screen flex items-center justify-center flex-col"}>
				<ShieldX className={"w-12 h-12 mb-4"}/>
				<h1 className={"text-lg font-bold"}>Hozzáférés megtagadva</h1>
				<p>Nincs jogosultsága megtekinteni ezt az oldalt.</p>
				<Link href={"/"}><Button className={"px-12 mt-2"}>Visszatérés a kezdőlapra →</Button></Link>
			</div>
		)
	}
}