import Navigation from "./navigation";
import Footer from "./footer";

export default function Template({ children }) {
  return (
    <div className="relative min-h-screen">
      <div className="pb-4">
        <Navigation />
        {children}
      </div>
      <Footer />
    </div>
  );
}
