import Link from "next/link";
import { Facebook, Mail, Phone, Twitter, Instagram } from "lucide-react";
import { FaTiktok, FaTelegramPlane } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className=" bg-blue-950 text-white py-12 pb-6 border-t border-gray-800">
      <div className="container mx-auto px-4">
        {/* Footer Title */}
        <div className="w-full border-b-2 pb-4 mb-6">
          <h2 className="text-2xl font-bold text-center">Stay Connected with Us</h2>
        </div>

        {/* Footer Content */}
        <div className="pt-8 flex flex-wrap justify-between items-start gap-8 md:gap-12">
          {/* Company Info (Left) */}
          <div className="flex-1 min-w-[200px]">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                <span>0960380000</span>
                <span>0967336700</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                <span>hulugeneralcommission@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links (Center) */}
          <div className="flex-1 min-w-[200px] text-center">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="flex flex-row gap-4 justify-center">
              {["Home", "About Us", "Services", "Case Studies", "Contact"].map((label, index) => (
                <li key={index}>
                  <Link href={`/${label.toLowerCase().replace(/ /g, "-")}`} className="text-gray-400 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media (Right) */}
          <div className="flex-1 min-w-[200px] text-right">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex justify-end space-x-4">
              {[
                { href: "https://www.facebook.com/share/1BSrXGFWaK/", icon: <Facebook className="h-6 w-6" />, label: "Facebook" },
                { href: "https://t.me/hulugeneral", icon: <Twitter className="h-6 w-6" />, label: "Twitter" },
                { href: "https://www.instagram.com/hulugeneralcommission?igsh=YzExcWtxOHd0dTN1", icon: <Instagram className="h-6 w-6" />, label: "Instagram" },
                { href: "https://www.tiktok.com/@hulugeneralcommission?_t=ZM-8u13dpT4OCj&_r=1", icon: <FaTiktok className="h-6 w-6" />, label: "TikTok" },
                { href: "https://t.me/hulugeneral", icon: <FaTelegramPlane className="h-6 w-6" />, label: "Telegram" },
                { href: "https://www.tiktok.com/@hulugeneralcommission?_t=ZM-8u13dpT4OCj&_r=1", icon: <Mail className="h-6 w-6" />, label: "Email" }
              ].map(({ href, icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-gray-400 hover:text-white transition-transform transform hover:scale-110"
                >
                  {icon}
                  <span className="sr-only">{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-400">
          <p>© 2024 Hulu General Commissions . All rights reserved.</p>
          <a className=" font-bold underline"  href="https://t.me/TD_lala">  connect the developers </a>
        </div>
      </div>
    </footer>
  );
}
