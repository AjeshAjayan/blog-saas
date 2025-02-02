import "./globals.css";
import { Nunito_Sans } from 'next/font/google';

const nunito = Nunito_Sans({
  variable: "--font-nunito-sans",
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
        className={`${nunito.variable} ${nunito.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
