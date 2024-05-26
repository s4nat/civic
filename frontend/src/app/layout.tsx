import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { UserProvider } from "@auth0/nextjs-auth0/client";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Civic.",
  description: "Maximizing Community Impact through Collaborative Funding and Corporate Support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <UserProvider>
        <body>
          <div className={``}>
            <div className={`$xl:max-w-full w-full`}>
              <Navbar />
            </div>
          </div>

          <main>{children}</main>
          <Footer />
        </body>
      </UserProvider>
    </html>
  );
}
