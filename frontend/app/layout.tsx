import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
  title: "NovaSOC",
  description: "Cybersecurity SOC Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Navbar />
        <div className="pt-24"> {/* Push content below navbar */}
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
