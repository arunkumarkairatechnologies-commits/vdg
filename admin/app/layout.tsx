import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VDG Admin Panel",
  description: "Premium e-commerce admin panel",
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