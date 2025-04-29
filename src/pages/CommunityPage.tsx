import Layout from "@/components/layout/Layout";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MessageSquare,
  ThumbsUp,
  MessageCircle,
  Search,
  Users,
  HelpCircle,
  Phone,
  Mail,
  Facebook,
  Linkedin,
} from "lucide-react";

const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState("discussions");
  const [discussions, setDiscussions] = useState([]);
  const [supportTopics, setSupportTopics] = useState([]);
  const [newTopic, setNewTopic] = useState({
    title: "",
    author: "",
    category: "",
  });
  const [commentText, setCommentText] = useState({});

  useEffect(() => {
    fetch("http://localhost:3000/api/discussions")
      .then((res) => res.json())
      .then((data) => setDiscussions(data));

    fetch("http://localhost:3000/api/support")
      .then((res) => res.json())
      .then((data) => setSupportTopics(data));
  }, []);

  const postDiscussion = async () => {
    if (!newTopic.title || !newTopic.author || !newTopic.category) return;

    await fetch("http://localhost:3000/api/discussions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTopic),
    });
    const updated = await fetch("http://localhost:3000/api/discussions").then(
      (res) => res.json()
    );
    setDiscussions(updated);
    setNewTopic({ title: "", author: "", category: "" });
  };

  const likeDiscussion = async (id) => {
    const likedDiscussions =
      JSON.parse(localStorage.getItem("likedDiscussions")) || [];

    if (likedDiscussions.includes(id)) {
      alert("You have already liked this post.");
      return;
    }

    await fetch(`http://localhost:3000/api/discussions/${id}/like`, {
      method: "POST",
    });

    localStorage.setItem(
      "likedDiscussions",
      JSON.stringify([...likedDiscussions, id])
    );

    const updated = await fetch("http://localhost:3000/api/discussions").then(
      (res) => res.json()
    );
    setDiscussions(updated);
  };

  const postComment = async (id) => {
    const comment = commentText[id];
    if (!comment?.text || !comment?.author) return;

    await fetch(`http://localhost:3000/api/discussions/${id}/reply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment),
    });
    const updated = await fetch("http://localhost:3000/api/discussions").then(
      (res) => res.json()
    );
    setDiscussions(updated);
    setCommentText((prev) => ({ ...prev, [id]: { text: "", author: "" } }));
  };
  const [selectedSupport, setSelectedSupport] = useState(null);

  const fetchSupportAnswer = async (id) => {
    const res = await fetch(`http://localhost:3000/api/support/${id}`);
    const data = await res.json();
    setSelectedSupport(data);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    const name = (document.getElementById("name") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const subject = (document.getElementById("subject") as HTMLInputElement)
      .value;
    const message = (document.getElementById("message") as HTMLInputElement)
      .value;

    const res = await fetch("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, subject, message }),
    });

    const data = await res.json();
    alert(data.message);
    (document.getElementById("name") as HTMLInputElement).value = "";
    if (res.ok) {
      (document.getElementById("name") as HTMLInputElement).value = "";
      (document.getElementById("email") as HTMLInputElement).value = "";
      (document.getElementById("subject") as HTMLInputElement).value = "";
      (document.getElementById("message") as HTMLTextAreaElement).value = "";
    }
  };
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Community & Support
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Connect with fellow students, share experiences, and get help from
            our support team
          </p>
        </div>

        <Tabs
          defaultValue="discussions"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid grid-cols-3 max-w-xl mx-auto mb-8">
            <TabsTrigger
              value="discussions"
              className="flex gap-2 items-center"
            >
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
          <TabsContent value="contact" className="animate-fade-in">
            <div className="mb-8 max-w-3xl mx-auto">
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Have a question or need assistance? Send us a message and we'll
                get back to you.
              </p>

              <Card>
                <CardContent className="p-6">
                  <form className="space-y-4" onSubmit={handleSendMessage}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Name
                        </label>
                        <Input id="name" placeholder="Enter your name" />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Subject
                      </label>
                      <Input
                        id="subject"
                        placeholder="Subject of your message"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-life-blue-500 focus:border-life-blue-500"
                        placeholder="Enter your message"
                      ></textarea>
                    </div>

                    <Button
                      type="submit"
                      className="w-full md:w-auto bg-life-blue-500 hover:bg-life-blue-600"
                    >
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="text-center p-4">
                  <Phone className="mx-auto text-life-blue-500 mb-2" />
                  <h4 className="font-semibold">Phone</h4>
                  <p className="text-gray-600 mt-2">+880 1234-567890</p>
                </Card>
                <Card className="text-center p-4">
                  <Mail className="mx-auto text-life-blue-500 mb-2" />
                  <h4 className="font-semibold">Email</h4>
                  <p className="text-gray-600 mt-2">support@lifelink.com</p>
                </Card>
                <Card className="text-center p-4">
                  <Facebook className="mx-auto text-life-blue-500 mb-2" />
                  <h4 className="font-semibold">Facebook</h4>
                  <p className="text-gray-600 mt-2">
                    facebook.com/lifelinkservices
                  </p>
                </Card>
                <Card className="text-center p-4">
                  <Linkedin className="mx-auto text-life-blue-500 mb-2" />
                  <h4 className="font-semibold">LinkedIn</h4>
                  <p className="text-gray-600 mt-2">
                    linkedin.com/company/lifelink
                  </p>
                </Card>
                <Card className="text-center p-4 col-span-full">
                  <MessageCircle className="mx-auto text-life-blue-500 mb-2" />
                  <h4 className="font-semibold">24/7 Support</h4>
                  <p className="text-gray-600 mt-2">
                    We are available around the clock to assist you.
                  </p>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="discussions">
            <div className="flex flex-col md:flex-row gap-2 mb-4">
              <Input
                placeholder="Title"
                value={newTopic.title}
                onChange={(e) =>
                  setNewTopic({ ...newTopic, title: e.target.value })
                }
              />
              <Input
                placeholder="Author"
                value={newTopic.author}
                onChange={(e) =>
                  setNewTopic({ ...newTopic, author: e.target.value })
                }
              />
              <Input
                placeholder="Category"
                value={newTopic.category}
                onChange={(e) =>
                  setNewTopic({ ...newTopic, category: e.target.value })
                }
              />
              <Button onClick={postDiscussion}>Post</Button>
            </div>

            <div className="space-y-4">
              {discussions.map((discussion) => (
                <Card
                  key={discussion._id}
                  className="hover:border-life-blue-200 transition-colors"
                >
                  <CardContent className="p-6 space-y-4">
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
                        <div
                          className="flex items-center text-gray-500 cursor-pointer"
                          onClick={() => likeDiscussion(discussion._id)}
                        >
                          <ThumbsUp size={16} className="mr-1" />
                          <span className="text-sm">{discussion.likes}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-sm text-gray-600 space-y-2">
                      {discussion.replies?.map((reply, idx) => (
                        <div key={idx} className="border rounded-md p-2">
                          <strong>{reply.author}:</strong> {reply.text}
                          <div className="text-xs text-gray-400">
                            {reply.time}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col md:flex-row gap-2">
                      <Input
                        placeholder="Your Name"
                        value={commentText[discussion._id]?.author || ""}
                        onChange={(e) =>
                          setCommentText((prev) => ({
                            ...prev,
                            [discussion._id]: {
                              ...prev[discussion._id],
                              author: e.target.value,
                            },
                          }))
                        }
                      />
                      <Input
                        placeholder="Write a comment..."
                        value={commentText[discussion._id]?.text || ""}
                        onChange={(e) =>
                          setCommentText((prev) => ({
                            ...prev,
                            [discussion._id]: {
                              ...prev[discussion._id],
                              text: e.target.value,
                            },
                          }))
                        }
                      />
                      <Button onClick={() => postComment(discussion._id)}>
                        Comment
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="support">
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">
                Popular Support Topics
              </h3>
              <div className="space-y-4">
                {supportTopics.map((topic) => (
                  <Card
                    key={topic._id}
                    className="hover:border-life-blue-200 transition-colors"
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4
                            className="font-medium hover:text-life-blue-500 cursor-pointer"
                            onClick={() => fetchSupportAnswer(topic._id)}
                          >
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
                {selectedSupport && (
                  <Card className="my-6 p-4 border-l-4 border-blue-500">
                    <h2 className="text-xl font-semibold mb-2">
                      {selectedSupport.title}
                    </h2>
                    <p className="text-gray-700 whitespace-pre-line">
                      {selectedSupport.answer}
                    </p>
                    <Button
                      onClick={() => setSelectedSupport(null)}
                      className="mt-4"
                    >
                      Close
                    </Button>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default CommunityPage;
