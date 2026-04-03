import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChronoTrips™ Temporal Transit Authority",
  description: "Authorized portal for civilian time displacement requests. Bureau of Chronological Transit — Form JT-88.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
