import Navigation from "./navigation";
import Footer from "./footer";
import { cn } from "@/lib/utils";

export default function Template({
  children,
  includeFooter = true,
  includeNavigation = true,
}) {
  return (
    <div className={cn("relative min-h-screen w-screen")}>
      <div>
        {includeNavigation && <Navigation />}
        {children}
      </div>
      {includeFooter && <Footer />}
    </div>
  );
}
