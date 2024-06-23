import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components";
import { cn, constructMetadata } from "@/lib/utils";

import "react-loading-skeleton/dist/skeleton.css";
import "simplebar-react/dist/simplebar.min.css";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = constructMetadata();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen font-sans antialiased grainy",
          inter.className
        )}
      >
          <link rel="icon" href="pdficon.png" sizes="any" />
        <Toaster />

        <Navbar />

        {children}

        <Footer />
      </body>
    </html>
  );
}
