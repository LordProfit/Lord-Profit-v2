import type { Metadata } from "next";
import { Jura } from "next/font/google";
import "./globals.css";

const jura = Jura({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jura",
});

export const metadata: Metadata = {
  title: "Art Castillo",
  description: "Front-end developer, UI/UX designer, brand identity specialist, and novelist.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jura.variable}>
      <body className={`${jura.className} bg-black antialiased`}>
        {children}
      </body>
    </html>
  );
}