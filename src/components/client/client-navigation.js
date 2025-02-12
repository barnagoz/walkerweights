import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton, SidebarRail, SidebarTrigger
} from "@/components/ui/sidebar";
import { PersonIcon } from "@radix-ui/react-icons";
import { HomeIcon, PaperclipIcon, ScanIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export function ClientNavigation () {
	const {data: session} = useSession();

	return (
		<div class={"relative w-full"}>
			<div className={"absolute top-0  left-0 w-full bg-gray-900 text-white text-sm font-semibold flex px-4" +
				" items-center" +
				"  h-7 z-50"}>
				<Link href={"/"}>Ügyfélportál - Visszatérés a nyilvános oldalra →</Link>
			</div>
			<nav
				className={"flex items-center w-full py-2 px-4 justify-between border-b border-gray-200" +
					" dark:border-gray-700 pt-9"}>
				<div className={"flex items-center gap-4"}>
					<SidebarTrigger/>
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
		</div>
	);
}

export function ClientNavigationSheet () {
	return (
		<Sidebar collapsible={"icon"}>
			<SidebarHeader className="group-data-[collapsible=icon]:hidden p-4 gap-2">
				<Link href={"/app"}>
					<Image src="/asset/logo.svg" alt="Logo" width={75 / 3 * 4} height={34 / 3 * 4}/>
				</Link>
				<h2 className={"text-xl font-semibold"}>Alkalmazásválasztó</h2>
			</SidebarHeader>
			<SidebarContent className={"group-data-[collapsible=icon]:p-2 p-4 pt-0"}>
				<SidebarMenu>
					<SidebarMenuButton asChild>
						<Link href="/portal">
							<HomeIcon/>
							<span>Kezdőlap</span>
						</Link>
					</SidebarMenuButton>
				</SidebarMenu>
				<SidebarMenu>
					<SidebarMenuButton asChild>
						<Link href="/portal/account">
							<PersonIcon/>
							<span>Személyes adatok</span>
						</Link>
					</SidebarMenuButton>
				</SidebarMenu>
				<SidebarMenu>
					<SidebarMenuButton asChild>
						<Link href="/portal/data">
							<PaperclipIcon/>
							<span>Adatok megtekintése</span>
						</Link>
					</SidebarMenuButton>
				</SidebarMenu>
				<SidebarMenu>
					<SidebarMenuButton asChild>
						<Link href="/portal/data/add">
							<ScanIcon/>
							<span>Adatok feltöltése</span>
						</Link>
					</SidebarMenuButton>
				</SidebarMenu>
			</SidebarContent>
			<SidebarFooter/>
			<SidebarRail/>
		</Sidebar>);
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
				<Link href={"/auth/logout"}><Button className={"w-full"}>Kijelentkezés</Button></Link>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}