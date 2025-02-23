import React from "react";
import config from "../config";

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = "" }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`bg-gray-900 text-gray-300 py-12 px-4 ${className}`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-white font-semibold mb-4">About Our Workshops</h3>
          <p className="text-sm">{config.ABOUT_TEXT}</p>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact Information</h3>
          <div className="space-y-2 text-sm">
            <p>Email: {config.CONTACT_INFO.EMAIL}</p>
            <p>Phone: {config.CONTACT_INFO.PHONE}</p>
            <p>Address: {config.CONTACT_INFO.ADDRESS}</p>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <nav>
            <ul className="space-y-2 text-sm">
              {config.QUICK_LINKS.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:text-white transition-colors duration-200">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Footer Links & Copyright */}
      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© {currentYear} {config.COPYRIGHT_TEXT}</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            {config.FOOTER_LINKS.map((link, index) => (
              <a key={index} href={link.href} className="hover:text-white transition-colors duration-200">
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
