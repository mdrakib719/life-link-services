import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white shadow-inner border-t dark:bg-gray-900 mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center">
              <div className="bg-life-blue-500 text-white p-1 rounded-md mr-2">
                <span className="font-bold">LC</span>
              </div>
              <span className="text-lg font-bold text-life-blue-500">
                LocalConnect
              </span>
              <span className="text-life-green-500 font-medium ml-1"></span>
            </Link>
            <p className="mt-2 text-sm text-gray-500">
              Connecting students with essential services - flats, meals, and
              more.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-300 mb-3">
              Services
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/services"
                  className="text-sm text-gray-600 hover:text-life-blue-500 dark:text-gray-400"
                >
                  Flat Rentals
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-sm text-gray-600 hover:text-life-blue-500 dark:text-gray-400"
                >
                  Shop Listings
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-sm text-gray-600 hover:text-life-blue-500 dark:text-gray-400"
                >
                  Meal Services
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-300 mb-3">
              Community
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/community"
                  className="text-sm text-gray-600 hover:text-life-blue-500 dark:text-gray-400"
                >
                  Discussion Forum
                </Link>
              </li>
              <li>
                <Link
                  to="/community"
                  className="text-sm text-gray-600 hover:text-life-blue-500 dark:text-gray-400"
                >
                  Help & Support
                </Link>
              </li>
              <li>
                <Link
                  to="/community"
                  className="text-sm text-gray-600 hover:text-life-blue-500 dark:text-gray-400"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-300 mb-3">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/terms-of-service"
                  className="text-sm text-gray-600 hover:text-life-blue-500 dark:text-gray-400"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-sm text-gray-600 hover:text-life-blue-500 dark:text-gray-400"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-6">
          <p className="text-sm text-center text-gray-500">
            &copy; {currentYear} LocalConnect Services. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
