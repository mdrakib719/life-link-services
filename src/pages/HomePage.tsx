import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Home as HomeIcon,
  Utensils,
  ShoppingBag,
  Users,
  Calendar,
  Star,
  MessageSquare,
  ArrowRight,
  Sparkles,
  Shield,
  TrendingUp,
  Zap,
} from "lucide-react";

const HomePage = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section with Modern Gradient */}
      <section className="relative gradient-bg min-h-[90vh] flex items-center">
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 animate-slide-up">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 mb-6">
                <Sparkles className="w-4 h-4 mr-2 text-purple-600 dark:text-purple-400" />
                <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                  #1 Student Life Platform
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
                Student Life, <span className="gradient-text">Simplified</span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Connect with essential services - from finding your perfect flat
                to ordering delicious meals and discovering local shops.
                Everything you need in one beautiful platform.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/services">
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white px-8 py-6 text-lg rounded-xl btn-hover shadow-xl">
                    Explore Services
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    variant="outline"
                    className="px-8 py-6 text-lg rounded-xl btn-hover border-2"
                  >
                    Join Free
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12">
                <div>
                  <div className="text-3xl font-bold gradient-text">10K+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Active Students
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold gradient-text">500+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Service Providers
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold gradient-text">50K+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Happy Bookings
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 animate-fade-in">
              <div className="relative">
                {/* Main Image Card */}
                <div className="glass-effect rounded-3xl p-4 shadow-2xl transform hover:scale-105 transition-all duration-500">
                  <div className="absolute -top-6 -right-6 bg-gradient-to-r from-purple-600 to-blue-500 text-white p-4 rounded-2xl shadow-xl animate-bounce-subtle">
                    <Star className="w-8 h-8" fill="currentColor" />
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop"
                    alt="Students collaborating"
                    className="w-full h-[400px] object-cover rounded-2xl"
                  />
                </div>

                {/* Floating Cards */}
                <div className="absolute -bottom-6 -left-6 glass-effect p-4 rounded-xl shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-cyan-400 rounded-lg flex items-center justify-center">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">100% Verified</div>
                      <div className="text-xs text-gray-500">
                        Trusted Services
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
            <TrendingUp className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Premium Services
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Everything You Need,{" "}
            <span className="gradient-text">One Platform</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover our curated services designed specifically for student life
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="card-hover border-0 shadow-xl glass-effect group">
            <CardContent className="p-8">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <HomeIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Flat Rentals</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Find your perfect home near campus. Verified listings with
                  transparent pricing and flexible terms.
                </p>
              </div>
              <Link
                to="/services"
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:gap-2 transition-all font-semibold"
              >
                Browse Flats
                <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </CardContent>
          </Card>

          <Card className="card-hover border-0 shadow-xl glass-effect group">
            <CardContent className="p-8">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-400 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Utensils className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Meal Services</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Healthy, delicious meals delivered to your door. Customizable
                  plans that fit your schedule and diet.
                </p>
              </div>
              <Link
                to="/services"
                className="inline-flex items-center text-green-600 dark:text-green-400 hover:gap-2 transition-all font-semibold"
              >
                View Meal Plans
                <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </CardContent>
          </Card>

          <Card className="card-hover border-0 shadow-xl glass-effect group">
            <CardContent className="p-8">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-400 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <ShoppingBag className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Shop Listings</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Discover local shops and services with exclusive student
                  discounts and special offers.
                </p>
              </div>
              <Link
                to="/services"
                className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:gap-2 transition-all font-semibold"
              >
                Explore Shops
                <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 gradient-bg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Students <span className="gradient-text">Love Us</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Built by students, for students. We understand what you need.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-effect p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3">Community Focused</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Join a thriving community of students helping each other thrive.
              </p>
            </div>

            <div className="glass-effect p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Calendar className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3">Easy Scheduling</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Book services instantly and manage everything from one
                dashboard.
              </p>
            </div>

            <div className="glass-effect p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3">100% Verified</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Every provider is thoroughly vetted for quality and reliability.
              </p>
            </div>

            <div className="glass-effect p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-yellow-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3">Lightning Fast</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Get instant responses and 24/7 support whenever you need help.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl shadow-2xl">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-400"></div>

          {/* Pattern Overlay */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            ></div>
          </div>

          <div className="relative px-8 py-16 md:p-16 text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
              <Star className="w-4 h-4 mr-2 text-white" fill="currentColor" />
              <span className="text-sm font-medium text-white">
                Join 10,000+ Happy Students
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to Simplify Your
              <br />
              Student Life?
            </h2>

            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Get started today and discover why thousands of students trust
              Life Link Services for all their needs.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/signup">
                <Button className="bg-white text-purple-600 hover:bg-gray-100 px-10 py-6 text-lg rounded-xl btn-hover shadow-xl font-semibold">
                  Create Free Account
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/services">
                <Button
                  variant="outline"
                  className="text-white border-2 border-white hover:bg-white/10 px-10 py-6 text-lg rounded-xl btn-hover backdrop-blur-sm font-semibold"
                >
                  Browse Services
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span>Secure & Safe</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5" fill="currentColor" />
                <span>4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>10K+ Students</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
