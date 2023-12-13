import { cn } from "@/lib/utils";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="hu">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito&display=optional"
          rel="stylesheet"
        />
      </Head>
      <body
        className={cn("min-h-screen bg-background font-sans antialiased")}
        style={{ fontFamily: "Nunito" }}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
