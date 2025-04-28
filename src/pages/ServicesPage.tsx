import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Home as HomeIcon,
  Utensils,
  ShoppingBag,
  MapPin,
  Star,
  Search,
} from "lucide-react";

const ServicesPage = () => {
  const [flats, setFlats] = useState([]); // To store the flat data
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle error state

  useEffect(() => {
    const fetchFlats = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/data", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch flats");
        }
        const data = await response.json();
        console.log(data); // Logs the raw data from the backend
        setFlats(data);
        setLoading(false);
      } catch (err) {
        setError(err.message); // Set the error if there's an issue
        setLoading(false);
      }
    };

    fetchFlats();
  }, []);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Find Services Near You
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore our range of student-focused services - from flats and meals
            to local shops
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <Input className="pl-10" placeholder="Search for services..." />
            </div>
            <div className="flex-none w-full md:w-auto">
              <Button className="w-full bg-life-blue-500 hover:bg-life-blue-600">
                Search
              </Button>
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
              {loading ? (
                <p>Loading flats...</p>
              ) : error ? (
                <p>Error: {error}</p>
              ) : flats.length === 0 ? (
                <p>No flats available.</p>
              ) : (
                flats.map((flat) => (
                  <Card key={flat._id} className="overflow-hidden card-hover">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2">
                        {flat.title || "No title"}{" "}
                        {/* Fallback for missing title */}
                      </h3>
                      <div className="flex items-center text-gray-500 mb-2">
                        <MapPin size={16} className="mr-1" />
                        <span className="text-sm">
                          {flat.location || "Unknown location"}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-500 mb-3">
                        <span className="text-sm">
                          {flat.distanceFromCampus || "Distance unknown"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-life-blue-500 font-semibold">
                          {flat.pricePerMonth || "Price not available"}
                        </span>
                        <div className="flex items-center">
                          <Star
                            size={16}
                            className="text-yellow-500 mr-1 fill-yellow-500"
                          />
                          <span>4.5</span> {/* Example rating */}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ServicesPage;
