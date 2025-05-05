import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Home,
  User,
  Book,
  MessageSquare,
  Menu,
  X,
  LogIn,
  Bell,
} from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Placeholder for auth state - will be replaced with actual auth
  const isLoggedIn = false;

  return (
    <nav className="bg-white shadow-sm border-b dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="bg-life-blue-500 text-white p-2 rounded-md mr-2">
                <span className="font-bold">LC</span>
              </div>
              <span className="text-xl font-bold text-life-blue-500">
                LocalConnect
              </span>
              <span className="text-life-green-500 font-medium ml-1"></span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-life-blue-500"
            >
              <Home size={18} className="mr-2" />
              Home
            </Link>
            <Link
              to="/services"
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-life-blue-500"
            >
              <Book size={18} className="mr-2" />
              Services
            </Link>
            <Link
              to="/community"
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-life-blue-500"
            >
              <MessageSquare size={18} className="mr-2" />
              Community
            </Link>

            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/notifications"
                  className="text-gray-700 hover:text-life-blue-500"
                >
                  <Bell size={20} />
                </Link>
                <Link
                  to="/profile"
                  className="text-gray-700 hover:text-life-blue-500"
                >
                  <User size={20} />
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" className="flex items-center">
                    <LogIn size={18} className="mr-2" />
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-life-blue-500 hover:bg-life-blue-600">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-life-blue-500 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? (
                <X size={24} aria-hidden="true" />
              ) : (
                <Menu size={24} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-life-blue-500"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home size={18} className="mr-2" />
              Home
            </Link>
            <Link
              to="/services"
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-life-blue-500"
              onClick={() => setIsMenuOpen(false)}
            >
              <Book size={18} className="mr-2" />
              Services
            </Link>
            <Link
              to="/community"
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-life-blue-500"
              onClick={() => setIsMenuOpen(false)}
            >
              <MessageSquare size={18} className="mr-2" />
              Community
            </Link>

            {isLoggedIn ? (
              <div className="flex flex-col space-y-1">
                <Link
                  to="/notifications"
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-life-blue-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Bell size={18} className="mr-2" />
                  Notifications
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-life-blue-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={18} className="mr-2" />
                  Profile
                </Link>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 px-3 py-2">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center"
                  >
                    <LogIn size={18} className="mr-2" />
                    Login
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-life-blue-500 hover:bg-life-blue-600">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
