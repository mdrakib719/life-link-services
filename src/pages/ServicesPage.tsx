
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Home as HomeIcon, Utensils, ShoppingBag, MapPin, Star, Search } from "lucide-react";

const ServicesPage = () => {
  // Mock data for services
  const flats = [
    {
      id: 1,
      title: "Modern Studio Apartment",
      location: "North Campus Area",
      distance: "0.5 km from campus",
      price: "৳12,000/month",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxhbGx8fHx8fHx8fHwxNjIwOTEyMDEx&ixlib=rb-1.2.1&q=80&w=1080"
    },
    {
      id: 2,
      title: "Shared 3 Bedroom Apartment",
      location: "East Campus Area",
      distance: "0.8 km from campus",
      price: "৳8,000/month",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxhbGx8fHx8fHx8fHwxNjIwOTEyMDEx&ixlib=rb-1.2.1&q=80&w=1080"
    },
    {
      id: 3,
      title: "Cozy 1 Bedroom Flat",
      location: "South Campus Area",
      distance: "1.2 km from campus",
      price: "৳10,000/month",
      rating: 4.3,
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxhbGx8fHx8fHx8fHwxNjIwOTEyMDEx&ixlib=rb-1.2.1&q=80&w=1080"
    }
  ];

  const meals = [
    {
      id: 1,
      title: "Weekly Meal Plan",
      description: "7 days, 3 meals per day",
      price: "৳3,500/week",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxhbGx8fHx8fHx8fHwxNjIwOTEyMDEx&ixlib=rb-1.2.1&q=80&w=1080"
    },
    {
      id: 2,
      title: "Lunch Only Plan",
      description: "Monday to Friday lunch",
      price: "৳1,500/week",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxhbGx8fHx8fHx8fHwxNjIwOTEyMDEx&ixlib=rb-1.2.1&q=80&w=1080"
    },
    {
      id: 3,
      title: "Monthly Full Meal Plan",
      description: "30 days, 3 meals per day",
      price: "৳12,000/month",
      rating: 4.4,
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxhbGx8fHx8fHx8fHwxNjIwOTEyMDEx&ixlib=rb-1.2.1&q=80&w=1080"
    }
  ];

  const shops = [
    {
      id: 1,
      title: "Campus Stationery",
      location: "University Road",
      distance: "0.3 km",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1607435117741-10884f3f44e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxhbGx8fHx8fHx8fHwxNjIwOTEyMDEx&ixlib=rb-1.2.1&q=80&w=1080"
    },
    {
      id: 2,
      title: "Student Grocery Store",
      location: "North Campus Road",
      distance: "0.6 km",
      rating: 4.2,
      image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxhbGx8fHx8fHx8fHwxNjIwOTEyMDEx&ixlib=rb-1.2.1&q=80&w=1080"
    },
    {
      id: 3,
      title: "Tech Hub",
      location: "East Campus Area",
      distance: "1.0 km",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1601924582970-9238bcb495d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxhbGx8fHx8fHx8fHwxNjIwOTEyMDEx&ixlib=rb-1.2.1&q=80&w=1080"
    }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Find Services Near You</h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore our range of student-focused services - from flats and meals to local shops
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input className="pl-10" placeholder="Search for services..." />
            </div>
            <div className="flex-none w-full md:w-auto">
              <Button className="w-full bg-life-blue-500 hover:bg-life-blue-600">Search</Button>
            </div>
          </div>
        </div>
        
        {/* Services Tabs */}
        <Tabs defaultValue="flats" className="w-full">
          <TabsList className="grid grid-cols-3 max-w-xl mx-auto mb-8">
            <TabsTrigger value="flats" className="flex gap-2 items-center">
              <HomeIcon size={18} />
              <span>Flats</span>
            </TabsTrigger>
            <TabsTrigger value="meals" className="flex gap-2 items-center">
              <Utensils size={18} />
              <span>Meals</span>
            </TabsTrigger>
            <TabsTrigger value="shops" className="flex gap-2 items-center">
              <ShoppingBag size={18} />
              <span>Shops</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Flats Content */}
          <TabsContent value="flats" className="animate-fade-in">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {flats.map((flat) => (
                <Card key={flat.id} className="overflow-hidden card-hover">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={flat.image} 
                      alt={flat.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{flat.title}</h3>
                    <div className="flex items-center text-gray-500 mb-2">
                      <MapPin size={16} className="mr-1" />
                      <span className="text-sm">{flat.location}</span>
                    </div>
                    <div className="flex items-center text-gray-500 mb-3">
                      <span className="text-sm">{flat.distance}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-life-blue-500 font-semibold">{flat.price}</span>
                      <div className="flex items-center">
                        <Star size={16} className="text-yellow-500 mr-1 fill-yellow-500" />
                        <span>{flat.rating}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Meals Content */}
          <TabsContent value="meals" className="animate-fade-in">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {meals.map((meal) => (
                <Card key={meal.id} className="overflow-hidden card-hover">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={meal.image} 
                      alt={meal.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{meal.title}</h3>
                    <p className="text-gray-600 mb-4">{meal.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-life-green-500 font-semibold">{meal.price}</span>
                      <div className="flex items-center">
                        <Star size={16} className="text-yellow-500 mr-1 fill-yellow-500" />
                        <span>{meal.rating}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Shops Content */}
          <TabsContent value="shops" className="animate-fade-in">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {shops.map((shop) => (
                <Card key={shop.id} className="overflow-hidden card-hover">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={shop.image} 
                      alt={shop.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{shop.title}</h3>
                    <div className="flex items-center text-gray-500 mb-2">
                      <MapPin size={16} className="mr-1" />
                      <span className="text-sm">{shop.location}</span>
                    </div>
                    <div className="flex items-center text-gray-500 mb-3">
                      <span className="text-sm">{shop.distance} from campus</span>
                    </div>
                    <div className="flex justify-end items-center">
                      <Star size={16} className="text-yellow-500 mr-1 fill-yellow-500" />
                      <span>{shop.rating}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ServicesPage;
