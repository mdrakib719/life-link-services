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
  Sparkles,
} from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Placeholder for auth state - will be replaced with actual auth
  const isLoggedIn = false;

  return (
    <nav className="sticky top-0 z-50 glass-effect border-b backdrop-blur-xl shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3 group">
              {/* Logo */}
              {/* <div className="relative w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6 text-white" fill="currentColor" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full border-2 border-white dark:border-gray-900"></div>
              </div> */}

              {/* Brand Name */}
              <div className="flex flex-col">
                <span className="text-xl font-bold gradient-text">
                  Life Link
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                  Student Services
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              to="/"
              className="flex items-center px-4 py-2 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 transition-all"
            >
              <Home size={18} className="mr-2" />
              Home
            </Link>
            <Link
              to="/services"
              className="flex items-center px-4 py-2 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
            >
              <Book size={18} className="mr-2" />
              Services
            </Link>
            <Link
              to="/community"
              className="flex items-center px-4 py-2 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all"
            >
              <MessageSquare size={18} className="mr-2" />
              Community
            </Link>

            {isLoggedIn ? (
              <div className="flex items-center space-x-2 ml-4">
                <Link
                  to="/notifications"
                  className="p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all relative"
                >
                  <Bell size={20} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </Link>
                <Link
                  to="/profile"
                  className="p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                >
                  <User size={20} />
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-2 ml-4">
                <Link to="/login">
                  <Button
                    variant="ghost"
                    className="flex items-center rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <LogIn size={18} className="mr-2" />
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white rounded-xl shadow-lg btn-hover">
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
              className="inline-flex items-center justify-center p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 focus:outline-none transition-all"
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
        <div className="md:hidden animate-fade-in glass-effect border-t">
          <div className="px-4 pt-4 pb-6 space-y-2">
            <Link
              to="/"
              className="flex items-center px-4 py-3 rounded-xl text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home size={18} className="mr-3" />
              Home
            </Link>
            <Link
              to="/services"
              className="flex items-center px-4 py-3 rounded-xl text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              <Book size={18} className="mr-3" />
              Services
            </Link>
            <Link
              to="/community"
              className="flex items-center px-4 py-3 rounded-xl text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              <MessageSquare size={18} className="mr-3" />
              Community
            </Link>

            {isLoggedIn ? (
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
                <Link
                  to="/notifications"
                  className="flex items-center px-4 py-3 rounded-xl text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Bell size={18} className="mr-3" />
                  Notifications
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center px-4 py-3 rounded-xl text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={18} className="mr-3" />
                  Profile
                </Link>
              </div>
            ) : (
              <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center rounded-xl"
                  >
                    <LogIn size={18} className="mr-2" />
                    Login
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white rounded-xl">
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
