import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/navbar/navbar";
import { ReduxProvider } from "./redux/ReduxProvider";
import { ProductLoader } from "./components/product-loader/productLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <ProductLoader />
          <Navbar />
          <main className="p-8 mt-16">
            {children}
          </main>
        </ReduxProvider>
      </body>
    </html>
  );
}

