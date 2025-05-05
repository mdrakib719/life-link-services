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
  Home,
} from "lucide-react";

const ServicesPage = () => {
  const [flats, setFlats] = useState([]);
  const [shops, setShops] = useState([]);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [home, setHome] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [cartItem, setCartItem] = useState(null);
  const [emailInput, setEmailInput] = useState("");
  const [showCartPopup, setShowCartPopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const flatsResponse = await fetch("http://localhost:3000/api/data");
        const flatsData = await flatsResponse.json();
        setFlats(flatsData);

        const shopsResponse = await fetch("http://localhost:3000/api/shopi");
        const shopsData = await shopsResponse.json();
        setShops(shopsData);

        const mealsResponse = await fetch("http://localhost:3000/api/food");
        const mealsData = await mealsResponse.json();
        setMeals(mealsData);

        const homeResponse = await fetch("http://localhost:3000/api/home");
        const homeData = await homeResponse.json();
        setHome(homeData);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData(); // <- Call it here
  }, []);

  const handleAddToCart = (item: any) => {
    setCartItem(item);
    setShowCartPopup(true);
  };

  const handleCartSubmit = async () => {
    if (!emailInput) {
      alert("Please enter your email.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/add-cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailInput,
          item: cartItem,
          status: "process",
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Item added to cart successfully!");
      } else {
        alert(data.message || "Failed to add to cart.");
      }
    } catch (error) {
      alert("Network error. Please try again.");
    }

    setShowCartPopup(false);
    setEmailInput("");
  };

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
              <Input
                className="pl-10"
                placeholder="Search for services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="flats" className="w-full">
          <TabsList className="grid grid-cols-4 max-w-xl mx-auto mb-8">
            <TabsTrigger value="flats" className="flex gap-2 items-center">
              <HomeIcon size={18} />
              <span>Flats</span>
            </TabsTrigger>
            <TabsTrigger value="meals" className="flex gap-2 items-center">
              <Utensils size={18} />
              <span>Meals</span>
            </TabsTrigger>
            <TabsTrigger value="home" className="flex gap-2 items-center">
              <Utensils size={18} />
              <span>Home Service</span>
            </TabsTrigger>
            <TabsTrigger value="shops" className="flex gap-2 items-center">
              <ShoppingBag size={18} />
              <span>Shops</span>
            </TabsTrigger>
          </TabsList>

          {/* Flats */}
          <TabsContent value="flats" className="animate-fade-in">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {loading ? (
                <p>Loading flats...</p>
              ) : error ? (
                <p>Error: {error}</p>
              ) : (
                flats
                  .filter(
                    (flat) =>
                      flat.title
                        ?.toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      flat.location
                        ?.toLowerCase()
                        .includes(searchQuery.toLowerCase())
                  )
                  .map((flat) => (
                    <Card key={flat._id} className="overflow-hidden card-hover">
                      <CardContent className="p-6 space-y-3">
                        <h3 className="text-xl font-semibold">
                          {flat.title || "No title"}
                        </h3>
                        <div className="flex items-center text-gray-500">
                          <MapPin size={16} className="mr-1" />
                          <span className="text-sm">
                            {flat.location || "Unknown location"}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          {flat.distanceFromCampus}
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-life-blue-500 font-semibold">
                            {flat.pricePerMonth}
                          </span>
                          <Star
                            size={16}
                            className="text-yellow-500 mr-1 fill-yellow-500"
                          />
                        </div>

                        <Button
                          className="w-full bg-lime-500 hover:bg-lime-600"
                          onClick={() => handleAddToCart(flat)}
                        >
                          Add to Cart
                        </Button>
                      </CardContent>
                    </Card>
                  ))
              )}
            </div>
          </TabsContent>

          {/* Meals */}
          <TabsContent value="meals" className="animate-fade-in">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {loading ? (
                <p>Loading meals...</p>
              ) : error ? (
                <p>Error: {error}</p>
              ) : (
                meals
                  .filter(
                    (meal) =>
                      meal.title
                        ?.toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      meal.description
                        ?.toLowerCase()
                        .includes(searchQuery.toLowerCase())
                  )
                  .map((meal) => (
                    <Card key={meal._id} className="overflow-hidden card-hover">
                      <CardContent className="p-6 space-y-3">
                        <h3 className="text-xl font-semibold">{meal.title}</h3>
                        <div className="text-sm text-gray-500">
                          {meal.description}
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-life-blue-500 font-semibold">
                            {meal.price}
                          </span>
                          <Star
                            size={16}
                            className="text-yellow-500 mr-1 fill-yellow-500"
                          />
                        </div>
                        <Button
                          className="w-full bg-lime-500 hover:bg-lime-600"
                          onClick={() => handleAddToCart(meal)}
                        >
                          Add to Cart
                        </Button>
                      </CardContent>
                    </Card>
                  ))
              )}
            </div>
          </TabsContent>
          {/* Home Service */}
          <TabsContent value="home" className="animate-fade-in">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {loading ? (
                <p>Loading home services...</p>
              ) : error ? (
                <p>Error: {error}</p>
              ) : (
                home
                  .filter(
                    (home) =>
                      home.title
                        ?.toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      home.description
                        ?.toLowerCase()
                        .includes(searchQuery.toLowerCase())
                  )
                  .map((home) => (
                    <Card key={home._id} className="overflow-hidden card-hover">
                      <CardContent className="p-6 space-y-3">
                        <h3 className="text-xl font-semibold">{home.title}</h3>
                        <div className="text-sm text-gray-500">
                          {home.description}
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-life-blue-500 font-semibold">
                            {home.price}
                          </span>
                          <Star
                            size={16}
                            className="text-yellow-500 mr-1 fill-yellow-500"
                          />
                        </div>
                        <Button
                          className="w-full bg-lime-500 hover:bg-lime-600"
                          onClick={() => handleAddToCart(home)}
                        >
                          Add to Cart
                        </Button>
                      </CardContent>
                    </Card>
                  ))
              )}
            </div>
          </TabsContent>

          {/* Shops */}
          <TabsContent value="shops" className="animate-fade-in">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {loading ? (
                <p>Loading shops...</p>
              ) : error ? (
                <p>Error: {error}</p>
              ) : (
                shops
                  .filter(
                    (shop) =>
                      shop.title
                        ?.toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      shop.location
                        ?.toLowerCase()
                        .includes(searchQuery.toLowerCase())
                  )
                  .map((shop) => (
                    <Card key={shop._id} className="overflow-hidden card-hover">
                      <CardContent className="p-6 space-y-3">
                        <h3 className="text-xl font-semibold">{shop.title}</h3>
                        <div className="flex items-center text-gray-500">
                          <MapPin size={16} className="mr-1" />
                          <span className="text-sm">{shop.location}</span>
                        </div>
                        <div className="text-sm text-gray-500">
                          Distance: {shop.distance}
                        </div>
                        <div className="text-sm text-gray-500">
                          Rating: {shop.rating}
                        </div>
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11705.943215253761!2d90.42216452259211!3d23.768155839161903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7715a40c603%3A0xec01cd75f33139f5!2z4Kas4KeN4Kaw4KeN4Kav4Ka-4KaVIOCmrOCmv-CmtuCnjeCmrOCmrOCmv-CmpuCnjeCmr-CmvuCmsuCmr-CmvA!5e0!3m2!1sbn!2sbd!4v1746454386120!5m2!1sbn!2sbd"
                          style={{ border: 0, width: "100%", height: "250px" }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                        {/* <Button
                          className="w-full bg-lime-500 hover:bg-lime-600"
                          onClick={() => handleAddToCart(shop)}
                        >
                          Add to Cart
                        </Button> */}
                      </CardContent>
                    </Card>
                  ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Cart Popup */}
      {showCartPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-md w-96">
            <h2 className="text-xl mb-4 font-bold text-center">
              Enter your email
            </h2>
            <Input
              type="email"
              placeholder="Enter your email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="mb-4"
            />
            <div className="flex gap-4 justify-center">
              <Button
                className="bg-green-500 hover:bg-green-600"
                onClick={handleCartSubmit}
              >
                Confirm
              </Button>
              <Button variant="outline" onClick={() => setShowCartPopup(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ServicesPage;
