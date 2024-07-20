import { Metadata } from "next";
// import Head from "next/head";
import Script from "next/script";
import { Roboto, Rubik_80s_Fade, Raleway_Dots, Ubuntu } from "next/font/google";
// import { GeistSans } from "geist/font/sans";
// import { GeistMono } from "geist/font/mono";

import "./globals.css";
// import Footer from "../components/Footer";

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "300", "400", "500", "700"],
});
const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const rubik = Raleway_Dots({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Catchup!",
  description: "Catchup!'s website.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />

      {/* <Script src="https://www.googletagmanager.com/gtag/js?id=G-7VGWM7JV28" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-7VGWM7JV28');
        `}
      </Script> */}
      {/* <body className={GeistSans.className}> */}

      <body className={ubuntu.className}>
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}