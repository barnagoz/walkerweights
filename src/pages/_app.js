import "@/styles/globals.css";
import {SessionProvider} from "next-auth/react";
import {Inter as FontSans} from "next/font/google";
import {cn} from "@/lib/utils";
import SEO from '/seo.config';
import {DefaultSeo} from "next-seo";

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
            <SessionProvider session={session}>
                <Component {...pageProps} />
            </SessionProvider>
        </div>
    );
}
