import Navigation from "./navigation";
import Footer from "./footer";

export default function Template({
  children,
  includeFooter = true,
  includeNavigation = true,
}) {
  return (
    <div className="relative min-h-screen w-screen">
      <div>
        {includeNavigation && <Navigation />}
        {children}
      </div>
      {includeFooter && <Footer />}
    </div>
  );
}
