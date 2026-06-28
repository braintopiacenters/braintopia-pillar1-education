import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Braintopia | Pillar 1: Education & Family Support",
  description: "Discover how neurofeedback supports teachers, parents, students, and families. Find your class and take the first step toward clearer focus and calmer regulation.",
  icons: {
    icon: "/braintopia-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
