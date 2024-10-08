import { Inter, Lora } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import { UserProvider } from "@/context/AuthContext";

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
        <UserProvider>
          <CartProvider>
            <Header className="fixed" />
            <main className="flex-grow mt-4  pt-20 md:pt-28 px-5 md:px-10 lg:px-24">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </UserProvider>
      </body>
    </html>
  );
}
