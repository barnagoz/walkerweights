import "@/styles/globals.css";
import SEO from '/seo.config';
import { Toaster } from "@/components/ui/sonner"
import { EdgeStoreProvider } from "@/lib/edgestore";
import { cn } from "@/lib/utils";
import { SessionProvider } from "next-auth/react";
import { DefaultSeo } from "next-seo";
import { Inter as FontSans } from "next/font/google";

export const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

export default function App ({
	Component,
	pageProps: {session, ...pageProps},
}) {
	return (
		<div className={cn(fontSans.variable)}>
			<DefaultSeo {...SEO} />
			<EdgeStoreProvider>
				<SessionProvider session={session}>
					<Component {...pageProps} />
					<Toaster/>
				</SessionProvider>
			</EdgeStoreProvider>
		</div>
	);
}
