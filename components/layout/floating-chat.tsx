"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
};

const questions = [
  { question: "What services do you offer?", answer: "We offer web development, app development, and AI solutions." },
  { question: "What are your working hours?", answer: "Our team is available from 9 AM to 6 PM (GMT)." },
  { question: "Do you provide customer support?", answer: "Yes, we provide 24/7 customer support." },
  { question: "How can I contact you?", answer: "You can reach us via email at support@example.com." },
  { question: "What payment methods do you accept?", answer: "We accept PayPal, credit cards, and bank transfers." },
  { question: "Can I request a custom feature?", answer: "Yes! We offer custom development services tailored to your needs." },
  { question: "Do you have a refund policy?", answer: "Yes, we offer a 30-day money-back guarantee." },
  { question: "Where are you located?", answer: "We are based in Ethiopia but work with clients worldwide." },
  { question: "Do you offer free trials?", answer: "Yes, we offer a 7-day free trial for new users." },
  { question: "How secure is my data?", answer: "We follow industry best practices to ensure your data is safe." }
];

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedMessages = localStorage.getItem("chat.json");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chat.json", JSON.stringify(messages));
    scrollToBottom();
  }, [messages]);

  const handleQuestionClick = (question: string, answer: string) => {
    const userMessage: Message = { id: Date.now().toString(), text: question, sender: "user" };
    const botMessage: Message = { id: (Date.now() + 1).toString(), text: answer, sender: "bot" };
    setMessages([...messages, userMessage, botMessage]);
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;
    const userMessage: Message = { id: Date.now().toString(), text: input, sender: "user" };
    let botMessage: Message;
    
    if (input.toLowerCase() === "hi" || input.toLowerCase() === "hello") {
      botMessage = { id: (Date.now() + 1).toString(), text: "Hello, I am Hulu General Commissions Bot. If you want to get information, please use the buttons below.", sender: "bot" };
    } else {
      botMessage = { id: (Date.now() + 1).toString(), text: "I am under development. Please use the buttons below for information.", sender: "bot" };
    }

    setMessages([...messages, userMessage, botMessage]);
    setInput("");
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const renderProfilePicture = (sender: "user" | "bot") => {
    if (sender === "user") {
      return (
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
          U
        </div>
      );
    } else {
      return (
        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
          🤖
        </div>
      );
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <Card className="w-80">
          <CardHeader className="bg-primary text-white p-4 flex flex-row justify-between items-center">
            <h3 className="font-semibold">Chat with us</h3>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white">
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent className="p-4 h-64 overflow-y-auto">
            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="bg-muted p-3 rounded-lg max-w-[80%]">
                  <p className="text-sm">Hello! How can we help you today?</p>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-3 rounded-lg max-w-[80%] ${message.sender === "user" ? "bg-primary text-white ml-auto" : "bg-muted"}`}
                  >
                    <div className="flex items-center gap-2">
                      {renderProfilePicture(message.sender)}
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          <CardFooter className="p-4 border-t flex flex-col gap-2">
            <div className="flex gap-2 pb-7">
              <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." className="flex-1" />
              <Button size="sm" onClick={handleSendMessage}>Send</Button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {questions.map((q, index) => (
                <div key={index} className="relative group">
                  <Button
                    size="sm"
                    className="overflow-hidden text-ellipsis whitespace-nowrap"
                    onClick={() => handleQuestionClick(q.question, q.answer)}
                  >
                    {q.question.length > 15 ? `${q.question.slice(0, 12)}...` : q.question}
                  </Button>
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 px-2 py-1 text-xs bg-gray-900 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity w-max">
                    {q.question}
                  </span>
                </div>
              ))}
            </div>
          </CardFooter>
        </Card>
      ) : (
        <Button className="h-14 w-14 rounded-full shadow-lg" onClick={() => setIsOpen(true)}>
          <MessageCircle className="h-6 w-6" />
          <span className="sr-only">Open chat</span>
        </Button>
      )}
    </div>
  );
}
