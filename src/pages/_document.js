import { cn } from "@/lib/utils";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="hu">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#bd9e00" />
        <meta
          name="apple-mobile-web-app-title"
          content="Walker &amp; Weights"
        />
        <meta name="application-name" content="Walker &amp; Weights" />
        <meta name="msapplication-TileColor" content="#2d89ef" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="og:title" content="Walker &amp; Weights" />
        <meta name="og:image" content="/og.png" />
        <meta name="og:url" content="https://walkerweights.barnagoz.com" />
        <meta name="author" content="Barnabás Gőz" />
      </Head>
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
