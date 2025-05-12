import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Book,
  Home as HomeIcon,
  Utensils,
  ShoppingBag,
  Users,
  Calendar,
  Star,
  MessageSquare,
} from "lucide-react";

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Student Life,{" "}
              <span className="text-life-blue-500">Simplified</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              LocalConnect connects students with essential services - from
              finding the perfect flat to ordering meals and accessing local
              shops, all in one place.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/services">
                <Button className="bg-life-blue-500 hover:bg-life-blue-600 btn-hover text-white px-8 py-2 rounded-md">
                  Explore Services
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="outline" className="btn-hover">
                  Join Now
                </Button>
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 animate-fade-in">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 transform rotate-2 relative">
              <div className="absolute -top-4 -left-4 bg-life-green-500 text-white p-2 rounded-md">
                <Star size={20} />
              </div>
              <img
                src="https://czrzkrlkqywcczazeopo.supabase.co/storage/v1/object/public/blog-images//Screenshot%202025-05-05%20at%209.08.59%20PM.png"
                alt="Students using Local Connect services"
                className="w-fit h-auto rounded-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Our Services
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Everything you need for comfortable student life, all in one
            platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <HomeIcon className="h-6 w-6 text-life-blue-500" />
                </div>
                <h3 className="text-xl font-semibold ml-3">Flat Rentals</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Find comfortable and affordable accommodations near your campus.
              </p>
              <Link
                to="/services"
                className="mt-4 text-life-blue-500 hover:underline inline-block"
              >
                Browse Flats →
              </Link>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Utensils className="h-6 w-6 text-life-green-500" />
                </div>
                <h3 className="text-xl font-semibold ml-3">Meal Services</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Customizable meal plans with healthy, delicious options
                delivered to you.
              </p>
              <Link
                to="/services"
                className="mt-4 text-life-blue-500 hover:underline inline-block"
              >
                View Meal Plans →
              </Link>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-orange-100 p-3 rounded-full">
                  <ShoppingBag className="h-6 w-6 text-life-orange-500" />
                </div>
                <h3 className="text-xl font-semibold ml-3">Shop Listings</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Discover shops and services in your area with student discounts.
              </p>
              <Link
                to="/services"
                className="mt-4 text-life-blue-500 hover:underline inline-block"
              >
                Explore Shops →
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Local Connect
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We're building a community-focused platform that makes student
              life easier
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-life-blue-500 dark:text-blue-300" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Community Focused</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Built by students, for students - with your needs in mind.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-life-green-500 dark:text-green-300" />
              </div>
              <h3 className="font-semibold text-xl mb-2">
                Convenient Scheduling
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Easily book and manage your services on your schedule.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm">
              <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-life-orange-500 dark:text-orange-300" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Verified Providers</h3>
              <p className="text-gray-600 dark:text-gray-300">
                All services and accommodations are vetted for quality.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm">
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-purple-500 dark:text-purple-300" />
              </div>
              <h3 className="font-semibold text-xl mb-2">24/7 Support</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get help whenever you need it through our support system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-life-blue-500 dark:bg-life-blue-600 rounded-xl shadow-xl overflow-hidden">
          <div className="px-6 py-12 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to simplify your student life?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of students who are already enjoying the benefits
              of Local Connect Services.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/signup">
                <Button className="bg-white text-life-blue-500 hover:bg-gray-100 btn-hover">
                  Create Account
                </Button>
              </Link>
              <Link to="/services">
                <Button
                  variant="outline"
                  className="text-black border-white hover:bg-life-blue-600 btn-hover"
                >
                  Explore Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
