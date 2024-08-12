import { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/navbar';
import { Toaster } from '@/components/ui/toaster';

import { ClerkProvider } from '@clerk/nextjs';

export const metadata: Metadata = {
	title: 'Catchup!',
	description: "Catchup!'s website.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider>
			<html lang="en" suppressHydrationWarning>
				<meta charSet="utf-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="icon" type="image/x-icon" href="/favicon.ico" />

				<body suppressHydrationWarning>
					<Toaster />

					<Navbar />

					{children}

					{/* <Footer /> */}
				</body>
			</html>
		</ClerkProvider>
	);
}
