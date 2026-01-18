import { Link } from "react-router-dom";
import {
  Sparkles,
  Mail,
  MapPin,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass-effect border-t mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 group mb-4">
              {/* <div className="relative w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6 text-white" fill="currentColor" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full border-2 border-white dark:border-gray-900"></div>
              </div> */}
              <div className="flex flex-col">
                <span className="text-xl font-bold gradient-text">
                  Life Link
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                  Student Services
                </span>
              </div>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Connecting students with essential services - flats, meals, shops,
              and more. Your all-in-one platform for student life.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gradient-to-br hover:from-purple-600 hover:to-blue-500 flex items-center justify-center transition-all group"
              >
                <Facebook className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gradient-to-br hover:from-purple-600 hover:to-blue-500 flex items-center justify-center transition-all group"
              >
                <Twitter className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gradient-to-br hover:from-purple-600 hover:to-blue-500 flex items-center justify-center transition-all group"
              >
                <Instagram className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gradient-to-br hover:from-purple-600 hover:to-blue-500 flex items-center justify-center transition-all group"
              >
                <Linkedin className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Services Section */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-lg">
              Services
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/services"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Flat Rentals
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Meal Services
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Shop Listings
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-600 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Student Discounts
                </Link>
              </li>
            </ul>
          </div>

          {/* Community Section */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-lg">
              Community
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/community"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Discussion Forum
                </Link>
              </li>
              <li>
                <Link
                  to="/community"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Help & Support
                </Link>
              </li>
              <li>
                <Link
                  to="/community"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="/community"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-600 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Legal Section */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-lg">
              Get in Touch
            </h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                <Mail className="w-4 h-4 mr-2 mt-0.5 text-purple-600" />
                <a
                  href="mailto:support@lifelink.com"
                  className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  support@lifelink.com
                </a>
              </li>
              <li className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                <Phone className="w-4 h-4 mr-2 mt-0.5 text-blue-600" />
                <a
                  href="tel:+1234567890"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  +8801234567890
                </a>
              </li>
              <li className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4 mr-2 mt-0.5 text-cyan-600" />
                <span>
                  123 Campus Street
                  <br />
                  BRAC University, Dhaka, Bangladesh
                </span>
              </li>
            </ul>

            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/terms-of-service"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} Life Link Services. All rights reserved. Made with
              💜 for students.
            </p>
            <div className="flex items-center gap-6">
              <Link
                to="/terms-of-service"
                className="text-xs text-gray-500 dark:text-gray-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                Terms
              </Link>
              <Link
                to="/privacy"
                className="text-xs text-gray-500 dark:text-gray-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                Privacy
              </Link>
              <a
                href="#"
                className="text-xs text-gray-500 dark:text-gray-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
