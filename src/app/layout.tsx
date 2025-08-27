import type { Metadata } from "next";
import "./globals.css";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";


export const metadata: Metadata = {
  title: "SeeFlix - filmes, series e animes online grátis",
  description: "Assistir filmes , series e animes online grátis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="Pt-BR">
      <body className="bg-black">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
