import { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
// import BackgroundBlurImage from "@/components/background";

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

      <body>
        <Navbar />

        {children}
        {/* <BackgroundBlurImage /> */}

        {/* <Footer /> */}
      </body>
    </html>
  );
}
