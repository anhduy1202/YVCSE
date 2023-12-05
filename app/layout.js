import Providers from "./components/Providers";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "YVCSE",
  description: "Youtube Video Comment Sentiment Explorer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.clame}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}