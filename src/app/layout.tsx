import { Metadata } from "next";
import "./globals.css";
import { Nunito_Sans } from 'next/font/google';
import { ToastContainer } from "react-toastify";

const nunito = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
	title: "Welcome..!",
	robots: "noindex, nofollow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} ${nunito.className} antialiased`}
      >
        <>
          <ToastContainer />
          {children}
        </>
      </body>
    </html>
  );
}
