import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Home, Building, FileText, Phone, Mail, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const faqCategories = [
  {
    title: "Buying Property",
    icon: Home,
    questions: [
      {
        question: "How do I start the property buying process?",
        answer: "To start buying a property, first browse our listings, schedule viewings for properties you're interested in, and contact our agents for assistance. We'll guide you through the entire process from selection to closing."
      },
      {
        question: "What documents do I need to buy a property?",
        answer: "You'll need your CNIC, proof of income, bank statements, and any existing property documents. For specific requirements, please consult with our agents who will guide you through the documentation process."
      },
      {
        question: "How do I get a mortgage?",
        answer: "We work with several banks and financial institutions. Our agents can help you understand the mortgage process and connect you with the right financial partner based on your requirements."
      }
    ]
  },
  {
    title: "Selling Property",
    icon: Building,
    questions: [
      {
        question: "How do I list my property for sale?",
        answer: "You can list your property by creating an account, clicking 'List Property', and following the step-by-step process. Our team will verify your listing and help you with professional photography and marketing."
      },
      {
        question: "What are the fees for selling a property?",
        answer: "Our commission rates vary based on the property type and value. Contact our sales team for detailed information about our competitive rates and services."
      },
      {
        question: "How long does it take to sell a property?",
        answer: "The selling timeline varies based on market conditions, property type, and pricing. Our agents will provide you with a market analysis and estimated timeline during the listing process."
      }
    ]
  },
  {
    title: "Account & Platform",
    icon: FileText,
    questions: [
      {
        question: "How do I create an account?",
        answer: "Click the 'Sign Up' button in the top right corner, fill in your details, verify your email, and you're ready to start using our platform."
      },
      {
        question: "How do I reset my password?",
        answer: "Click 'Forgot Password' on the login page, enter your email, and follow the instructions sent to your email address."
      },
      {
        question: "How do I update my profile?",
        answer: "Log in to your account, go to 'My Profile', and click 'Edit Profile' to update your information and preferences."
      }
    ]
  }
];

const HelpCenter = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <Phone className="w-8 h-8 mx-auto mb-4 text-green-600" />
            <h3 className="font-semibold mb-2">Call Support</h3>
            <p className="text-sm text-gray-600">+92 21 111 111 456</p>
          </Card>
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <Mail className="w-8 h-8 mx-auto mb-4 text-green-600" />
            <h3 className="font-semibold mb-2">Email Support</h3>
            <p className="text-sm text-gray-600">support@zameen.com</p>
          </Card>
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <MessageCircle className="w-8 h-8 mx-auto mb-4 text-green-600" />
            <h3 className="font-semibold mb-2">Live Chat</h3>
            <p className="text-sm text-gray-600">Available 24/7</p>
          </Card>
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <FileText className="w-8 h-8 mx-auto mb-4 text-green-600" />
            <h3 className="font-semibold mb-2">Documentation</h3>
            <p className="text-sm text-gray-600">Guides & Tutorials</p>
          </Card>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-8">
          {faqCategories.map((category, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="bg-gray-50">
                <div className="flex items-center gap-4">
                  <category.icon className="w-6 h-6 text-green-600" />
                  <CardTitle>{category.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, faqIndex) => (
                    <AccordionItem key={faqIndex} value={`item-${index}-${faqIndex}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent>
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default HelpCenter; 