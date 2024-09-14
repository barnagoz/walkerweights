import Navigation from "./navigation";
import Footer from "./footer";
import {cn} from "@/lib/utils";

export default function Template (
    {
        children,
        includeFooter = true,
        includeNavigation = true,
        className = ""
    }) {
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
