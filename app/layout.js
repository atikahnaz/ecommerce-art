import { Inter, Lora } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({ subsets: ["latin"] });
const lora = Lora({ subsets: ["latin"] });

export const metadata = {
  title: "Art Store",
  description: "art print",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${lora.className} flex flex-col min-h-screen  `}>
        <CartProvider>
          <Header className="fixed" />
          <main className="flex-grow pt-20 md:pt-28">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
