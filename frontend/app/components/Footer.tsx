"use client";
import { FaInstagram, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black/70 text-gray-350 py-12 mt-20 border-t border-cyan-700/40">
      
      {/* Follow Us */}
      <h2 className="text-center text-2xl font-semibold mb-6 text-white">
        Follow Us
      </h2>

      {/* Social Icons */}
      <div className="flex justify-center gap-8 mb-8">
        <FaLinkedin className="footer-icon" />
        <FaGithub className="footer-icon" />
        <FaTwitter className="footer-icon" />
        <FaInstagram className="footer-icon" />
      </div>

      {/* Address */}
      <div className="text-center text-gray-400 text-sm leading-relaxed">
        <p>NovaSOC Cybersecurity Division</p>
        
      </div>

      {/* Bottom links */}
      <div className="text-center text-xs text-gray-500 mt-6">
        <a href="#" className="hover:text-cyan-400">Forward to a friend</a> |
      </div>

      {/* Copyright */}
      <p className="text-center text-gray-500 text-xs mt-5">
        © 2025 NovaSOC | Cybersecurity Automation Lab
      </p>
    </footer>
  );
}
