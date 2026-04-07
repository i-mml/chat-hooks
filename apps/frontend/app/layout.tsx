import "./globals.css";
import type { Metadata } from "next";
import { QueryProvider } from "../lib/query-provider";

export const metadata: Metadata = {
  title: "Frontend Infrastructure Toolkit Demo",
  description: "Monorepo demo for chat hooks architecture",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
