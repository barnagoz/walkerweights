import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <div className={cn(fontSans.variable)}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </div>
  );
}
