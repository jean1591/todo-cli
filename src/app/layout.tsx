import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import { StoreProvider } from "./lib/store/storeProvider";
import { classNames } from "@/utils";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="fr">
        <body
          className={classNames(
            inter.className,
            "bg-zinc-900 text-zinc-300 p-8 mx-auto"
          )}
        >
          {children}
          <Analytics />
        </body>
      </html>
    </StoreProvider>
  );
}
