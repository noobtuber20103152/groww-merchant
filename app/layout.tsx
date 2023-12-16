import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/store/StoreProvider";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={inter.className}>
          {" "}
          <NextTopLoader />
          {children}
          <Toaster
            position="top-center"
            gutter={8}
            toastOptions={{
              duration: 3000,
            }}
          />
        </body>
      </html>
    </StoreProvider>
  );
}