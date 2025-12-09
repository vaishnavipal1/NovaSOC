"use client";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="pt-24">{children}</div>
      <Footer />
    </>
  );
}
