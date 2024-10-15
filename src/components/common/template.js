import { ClientNavigation } from "@/components/common/clientNavigation";
import Navigation from "./navigation";
import Footer from "./footer";
import {cn} from "@/lib/utils";
import { useRouter } from "next/router";
import { AdminNavigation } from "./adminNavigation";

export default function Template (
    {
        children,
        includeFooter = true,
        includeNavigation = true,
        className = ""
    }) {
    const router = useRouter();
    const isAdminSite = router.pathname.includes("app");
    const isClientSite = router.pathname.includes("portal");
    if (isAdminSite) {
        return (
            <div className={cn("relative min-h-screen h-full w-full", className)}>
                <div className={cn(includeFooter && "pb-20", includeNavigation && "pt-24")}>
                    <div className="z-50">{includeNavigation && (<AdminNavigation/>)}</div>
                    <div className="z-0">{children}</div>
                </div>
            </div>
        );
    } else if (isClientSite) {
        return (
            <div className={cn("relative min-h-screen h-full w-full", className)}>
                <div className={cn(includeFooter && "pb-20", includeNavigation && "pt-24")}>
                    <div className="z-50">{includeNavigation && <ClientNavigation/>}</div>
                    <div className="z-0">{children}</div>
                </div>
                {includeFooter && <Footer/>}
            </div>
        );
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
