import { ClientNavigation, ClientNavigationSheet } from "@/components/client/client-navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";
import { AdminNavigation, AdminNavigationSheet } from "../admin/admin-navigation";
import Footer from "./footer";
import Navigation from "./navigation";

export default function Layout (
	{
		children,
		includeFooter = true,
		includeNavigation = true,
		className = ""
	}) {
	const router = useRouter();
	const isAdminSite = router.pathname.includes("app");
	const isClientSite = router.pathname.includes("portal");
	if (isAdminSite || isClientSite) {
		return (
			<SidebarProvider>
				{isAdminSite && <AdminNavigationSheet/>}
				{isClientSite && <ClientNavigationSheet/>}
				<main className={"overflow-x-hidden max-w-full flex-grow relative"}>
					{isAdminSite && <AdminNavigation/>}
					{isClientSite && <ClientNavigation/>}
					<div className={"p-4 min-w-full" + includeFooter && "pb-16"}>
						{children}
					</div>
					{includeFooter && <Footer/>}
				</main>
			</SidebarProvider>
		)
	} else {
		return (
			<div className={cn("relative min-h-screen h-full w-full", className)}>
				<div className={cn(includeFooter && "pb-20", includeNavigation && "pt-24")}>
					<div className="z-50">{includeNavigation && <Navigation/>}</div>
					<div className="z-0">{children}</div>
				</div>
				{includeFooter && <Footer/>}
			</div>
		);
	}
}