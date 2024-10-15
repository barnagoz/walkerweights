import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export function ClientNavigation () {
	const {data: session} = useSession();

	return (
		<>
			<div className={"fixed top-0 w-full bg-gray-900 text-white text-sm font-semibold flex px-4 items-center" +
				"  h-7 z-50"}>
				<Link href={"/"}>Ügyfélportál - Visszatérés a főoldalra →</Link>
			</div>
			<nav
				className={"flex fixed top-7 h-auto z-50 bg-white backdrop-blur bg-opacity-30 items-center w-full" +
					" py-2" +
					" px-4" +
					" justify-between"}>
				<div className={"flex items-center gap-4 py-1.5"}>
					<NavigationSheet>
						<Button variant={"secondary"} className={"px-2"}>
							<MenuIcon className={"w-5 h-5"}/>
						</Button>
					</NavigationSheet>
					<Link href={"/app"}>
						<Image src="/asset/logo.svg" alt="Logo" width={75 / 3 * 4} height={34 / 3 * 4}/>
					</Link>
				</div>
				<div className={"flex items-center justify-end gap-4"}>
					<p>Üdv, {session?.user?.name ?? "Betöltés..."}!</p>
					<AccountDropdown>
						<Avatar className={"w-8 h-8"}>
							<AvatarImage src={session?.user?.image ?? ""}/>
							<AvatarFallback>{session?.user?.name[0] ?? ""}</AvatarFallback>
						</Avatar>
					</AccountDropdown>
				</div>
			</nav>
		</>
	);
}

export function NavigationSheet ({children}) {
	return (
		<Sheet>
			<SheetTrigger>{children}</SheetTrigger>
			<SheetContent side={"left"}>
				<SheetHeader>
					<SheetTitle>Lehetőségek</SheetTitle>
				</SheetHeader>
				<div className={"flex flex-col gap-2 mt-4"}>
					<Link href={"/portal"}><Button variant={"secondary"} className={"w-full"}>Főoldal</Button></Link>
					<Link href={"/portal/account"}><Button variant={"secondary"} className={"w-full"}>Személyes
						adatok</Button></Link>
				</div>
			</SheetContent>
		</Sheet>
	)
}

export function AccountDropdown ({children}) {
	const {data: session} = useSession();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>{children}</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Fiókom</DropdownMenuLabel>
				<DropdownMenuSeparator/>
				<div className={"flex justify-start px-3 py-2"}>
					<div className={"w-20 h-auto row-span-2"}>
						<Avatar className={"w-16 h-16"}>
							<AvatarImage src={session?.user?.image ?? ""}/>
							<AvatarFallback>{session?.user?.name[0] ?? ""}</AvatarFallback>
						</Avatar>
					</div>
					<div className={"flex flex-col justify-center items-start"}>
						<p className={"font-semibold"}>{session?.user?.name ?? "Betöltés..."}</p>
						<p className={"font-normal"}>{session?.user?.email ?? "Betöltés..."}</p>
					</div>
				</div>
				<DropdownMenuSeparator/>
				<Button onClick={() => signOut()} className={"w-full"}>Kijelentkezés</Button>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}