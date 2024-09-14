import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { CircleUserRoundIcon, LogInIcon, RotateCcwIcon } from "lucide-react"
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Navigation () {
	const {data: session, status} = useSession();
	return (
		<div className={cn("w-full fixed top-0 h-auto z-50")}>
			<NavigationMenu
				className={cn(
					"py-2 px-4 bg-white backdrop-blur-md bg-opacity-30" +
					" min-w-full justify-between"
				)}
			>
				<NavigationMenuList>
					<NavigationMenuItem className={cn("bg-white p-3 rounded-md flex justify-start items-center gap-2")}>
						<Image src="/asset/logo.svg" alt="Logo" width={75 / 3 * 4.5} height={34 / 3 * 4.5}/>

					</NavigationMenuItem>
				</NavigationMenuList>
				<NavigationMenuList className={"gap-2"}>
					<NavigationMenuItem>
						<Link href="/">
							<Button variant="ghost" className={cn("w-full text-brand-green bg-white bg-opacity-40" +
								" hover:text-brand-green hidden md:block")}>
								Kezdőlap
							</Button>
						</Link>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<Link href="/jelentkezes">
							<Button variant="default" className={cn("w-full text-white bg-brand-green" +
								" hover:bg-teal-950")}>
								Ingyenes konzultáció
							</Button>
						</Link>
					</NavigationMenuItem>
					{status == "loading" && (
						<NavigationMenuItem>
							<NavigationMenuTrigger arrowHidden={true} className={cn("my-2 px-2 border-gray-200" +
								" border shadow-md")}>
								<RotateCcwIcon className={"w-5 h-5 text-brand-green"}/>
							</NavigationMenuTrigger>
						</NavigationMenuItem>
					)}
					{status == "authenticated" && (
						<NavigationMenuItem>
							<NavigationMenuTrigger className={cn("my-2 px-3 border-gray-200 border shadow-md")}>
								<CircleUserRoundIcon className={"w-5 h-5 text-brand-green"}/>
							</NavigationMenuTrigger>
							<NavigationMenuContent>
								<div
									className={cn(
										" w-72 rounded-lg bg-white drop-shadow-md p-3 gap-2 flex flex-col"
									)}
								>
									<p>
										Bejelentkezve, mint {session.user.name}
									</p>
									<p className={"muted"}>{session.user.email}</p>
									<Link href={"/app"}>
										<Button variant="default" className={cn("w-full")}>
											Adminisztrációs panel
										</Button>
									</Link>
									<Link href="/auth/logout">
										<Button variant="secondary" className={cn("w-full")}>
											Kijelentkezés
										</Button>
									</Link>
								</div>
							</NavigationMenuContent>
						</NavigationMenuItem>
					)}
					{status == "unauthenticated" && (
						<NavigationMenuItem>
							<Link href={"/auth/login"}>
								<NavigationMenuTrigger arrowHidden={true} className={cn("my-2 px-2 border-gray-200" +
									" border shadow-md")}>
									<LogInIcon className={"w-5 h-5 text-brand-green"}/>
								</NavigationMenuTrigger>
							</Link>
						</NavigationMenuItem>
					)}
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	);
}
