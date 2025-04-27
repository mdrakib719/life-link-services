
import Layout from "@/components/layout/Layout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, ThumbsUp, MessageCircle, Search, Users, HelpCircle } from "lucide-react";

const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState("discussions");

  // Mock discussion data
  const discussions = [
    {
      id: 1,
      title: "Best affordable flats near North Campus?",
      author: "Ahmed S.",
      time: "2 hours ago",
      category: "Accommodation",
      replies: 12,
      likes: 8,
    },
    {
      id: 2,
      title: "Looking for meal plan recommendations",
      author: "Fatima K.",
      time: "5 hours ago",
      category: "Food",
      replies: 7,
      likes: 5,
    },
    {
      id: 3,
      title: "Study group for CSE courses",
      author: "Rahim M.",
      time: "Yesterday",
      category: "Academics",
      replies: 15,
      likes: 23,
    },
    {
      id: 4,
      title: "Any shops offering student discounts this semester?",
      author: "Nusrat J.",
      time: "2 days ago",
      category: "Offers",
      replies: 9,
      likes: 17,
    },
  ];

  // Mock support topics
  const supportTopics = [
    {
      id: 1,
      title: "How do I book a meal plan?",
      category: "Services",
      answered: true,
    },
    {
      id: 2,
      title: "Payment methods supported on LifeLink",
      category: "Payments",
      answered: true,
    },
    {
      id: 3,
      title: "Reporting issues with flat rentals",
      category: "Accommodation",
      answered: true,
    },
    {
      id: 4,
      title: "Account security and privacy settings",
      category: "Account",
      answered: true,
    },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Community & Support</h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Connect with fellow students, share experiences, and get help from our support team
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input className="pl-10" placeholder="Search community discussions..." />
            </div>
            <div className="flex-none w-full md:w-auto">
              <Button className="w-full bg-life-blue-500 hover:bg-life-blue-600">Search</Button>
            </div>
          </div>
        </div>
        
        {/* Community Tabs */}
        <Tabs defaultValue="discussions" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 max-w-xl mx-auto mb-8">
            <TabsTrigger value="discussions" className="flex gap-2 items-center">
              <MessageSquare size={18} />
              <span>Discussions</span>
            </TabsTrigger>
            <TabsTrigger value="support" className="flex gap-2 items-center">
              <HelpCircle size={18} />
              <span>Support</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex gap-2 items-center">
              <MessageCircle size={18} />
              <span>Contact Us</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Discussions Tab */}
          <TabsContent value="discussions" className="animate-fade-in">
            <div className="flex justify-between mb-6">
              <h2 className="text-2xl font-semibold">Community Discussions</h2>
              <Button className="bg-life-blue-500 hover:bg-life-blue-600">
                New Topic
              </Button>
            </div>
            
            <div className="space-y-4">
              {discussions.map((discussion) => (
                <Card key={discussion.id} className="hover:border-life-blue-200 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium hover:text-life-blue-500 cursor-pointer">
                          {discussion.title}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <span>Posted by {discussion.author}</span>
                          <span className="mx-2">•</span>
                          <span>{discussion.time}</span>
                          <span className="mx-2">•</span>
                          <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                            {discussion.category}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-gray-500">
                          <MessageCircle size={16} className="mr-1" />
                          <span className="text-sm">{discussion.replies}</span>
                        </div>
                        <div className="flex items-center text-gray-500">
                          <ThumbsUp size={16} className="mr-1" />
                          <span className="text-sm">{discussion.likes}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-8 flex justify-center">
              <Button variant="outline">Load More</Button>
            </div>
          </TabsContent>
          
          {/* Support Tab */}
          <TabsContent value="support" className="animate-fade-in">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Help & Support</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Browse through our help articles or contact our support team for assistance
              </p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <Card className="card-hover">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="bg-blue-100 p-4 rounded-full mb-4">
                      <HelpCircle className="h-8 w-8 text-life-blue-500" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">FAQ</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Browse our frequently asked questions
                    </p>
                    <Button variant="outline" className="mt-auto w-full">View FAQs</Button>
                  </CardContent>
                </Card>
                
                <Card className="card-hover">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="bg-green-100 p-4 rounded-full mb-4">
                      <MessageSquare className="h-8 w-8 text-life-green-500" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Live Chat</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Chat with our support team now
                    </p>
                    <Button className="mt-auto w-full bg-life-green-500 hover:bg-life-green-600">Start Chat</Button>
                  </CardContent>
                </Card>
                
                <Card className="card-hover">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="bg-orange-100 p-4 rounded-full mb-4">
                      <Users className="h-8 w-8 text-life-orange-500" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Community</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Get help from other students
                    </p>
                    <Button 
                      variant="outline" 
                      className="mt-auto w-full"
                      onClick={() => setActiveTab("discussions")}
                    >
                      View Discussions
                    </Button>
                  </CardContent>
                </Card>
              </div>
              
              <h3 className="text-xl font-semibold mb-4">Popular Support Topics</h3>
              <div className="space-y-4">
                {supportTopics.map((topic) => (
                  <Card key={topic.id} className="hover:border-life-blue-200 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium hover:text-life-blue-500 cursor-pointer">
                            {topic.title}
                          </h4>
                          <div className="text-sm text-gray-500 mt-1">
                            <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                              {topic.category}
                            </span>
                          </div>
                        </div>
                        {topic.answered && (
                          <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            Answered
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
          
          {/* Contact Tab */}
          <TabsContent value="contact" className="animate-fade-in">
            <div className="mb-8 max-w-3xl mx-auto">
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Have a question or need assistance? Send us a message and we'll get back to you.
              </p>
              
              <Card>
                <CardContent className="p-6">
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <Input id="name" placeholder="Enter your name" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <Input id="email" type="email" placeholder="Enter your email" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                      <Input id="subject" placeholder="Subject of your message" />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                      <textarea 
                        id="message" 
                        rows={4} 
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-life-blue-500 focus:border-life-blue-500"
                        placeholder="Enter your message"
                      ></textarea>
                    </div>
                    
                    <Button className="w-full md:w-auto bg-life-blue-500 hover:bg-life-blue-600">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              <div className="mt-8 grid md:grid-cols-3 gap-4">
                <Card className="text-center p-4">
                  <h4 className="font-semibold">Email</h4>
                  <p className="text-gray-600 mt-2">support@lifelink.com</p>
                </Card>
                <Card className="text-center p-4">
                  <h4 className="font-semibold">Phone</h4>
                  <p className="text-gray-600 mt-2">+880 1234-567890</p>
                </Card>
                <Card className="text-center p-4">
                  <h4 className="font-semibold">Office</h4>
                  <p className="text-gray-600 mt-2">University Campus, Building 3</p>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default CommunityPage;
