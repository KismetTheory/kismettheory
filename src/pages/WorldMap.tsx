
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MobileHeader from '@/components/navigation/MobileHeader';
import Sidebar from '@/components/navigation/Sidebar';
import NavigationMenu from '@/components/navigation/NavigationMenu';
import { ArrowLeft, Mail, Phone, MapPin, MessageSquare, HelpCircle, BookOpen } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const WorldMap = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle menu function
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-background dark:bg-black relative overflow-hidden">
      <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <MobileHeader isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <NavigationMenu isMenuOpen={isMenuOpen} />
      
      <main 
        className={`w-full md:w-[calc(100vw-120px)] min-h-screen transition-transform duration-300 ${
          isMenuOpen 
            ? 'translate-x-full md:translate-x-[300px]' 
            : 'translate-x-0'
        } ${
          'md:ml-[120px]'
        }`}
      >
        <div className="max-w-7xl mx-auto pt-20 md:pt-6 px-4 md:px-8 pb-16">
          <Link to="/" className="flex items-center text-primary mb-6 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5CC6D0] focus-visible:rounded-sm focus-visible:ring-offset-2">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to home
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Contact/Customs/Questions</h1>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-4">Get In Touch</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Have questions or want to collaborate? We'd love to hear from you! 
                Reach out to KismetTheory using any of the methods below.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-[#D946EF] dark:text-[#5CC6D0] mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <a 
                      href="mailto:kismetcrew@gmail.com" 
                      className="text-[#D946EF] dark:text-[#5CC6D0] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5CC6D0] focus-visible:rounded-sm focus-visible:ring-offset-2"
                    >
                      kismetcrew@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-[#D946EF] dark:text-[#5CC6D0] mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold">Phone (For Customs and Questions)</h3>
                    <a 
                      href="tel:+13028581535" 
                      className="text-[#D946EF] dark:text-[#5CC6D0] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5CC6D0] focus-visible:rounded-sm focus-visible:ring-offset-2"
                    >
                      (302) 858-1535
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-[#D946EF] dark:text-[#5CC6D0] mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold">Location</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Delmar, DE
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <form className="space-y-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#5CC6D0]"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#5CC6D0]"
                    placeholder="Your email"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#5CC6D0]"
                    placeholder="Subject"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#5CC6D0]"
                    placeholder="Your message"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full md:w-auto px-6 py-2 bg-[#D946EF] dark:bg-[#5CC6D0] text-white rounded-md hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#5CC6D0] focus:ring-offset-2"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12">
            <div className="flex items-center mb-6">
              <HelpCircle className="w-6 h-6 text-[#D946EF] dark:text-[#5CC6D0] mr-3" />
              <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            </div>
            
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              Please reach us at <a href="mailto:kismeticcrew@gmail.com" className="text-[#D946EF] dark:text-[#5CC6D0] hover:underline">kismeticcrew@gmail.com</a> if you cannot find an answer to your question.
            </p>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>I like what I see! Can I talk to who made it?</AccordionTrigger>
                <AccordionContent>
                  <p>Absolutley! You can either email us at the above address with the subject line "Who?" and a description of the product. (the more detail the better) Or you can check out our artist page!</p>
                  <Link to="/iphone-sketches" className="block mt-2 text-[#D946EF] dark:text-[#5CC6D0] hover:underline">Meet your makers</Link>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>How can I see your product in person?</AccordionTrigger>
                <AccordionContent>
                  <p>In the above link "Meet your Makers," There is a way to contact The associated craftsmen. Along with a link to their own sites, stores, or social pages.</p>
                  <p className="mt-2">In addition we appear at live events which we would be happy to see you at!! To find out where we will be check out our calender!</p>
                  <Link to="/photo-journal" className="block mt-2 text-[#D946EF] dark:text-[#5CC6D0] hover:underline">Connect</Link>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>What types of products do you sell?</AccordionTrigger>
                <AccordionContent>
                  <p>We sell a variety of products from multiple artists and craftsmen with an ever rotating inventory. Our main categories remain the same, however our products are never the same and are limited as most items are handmade.</p>
                  <p className="mt-2">Items may be requested to be made or personalized with individual artists who can find on the Meet Your Makers page.</p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>Um, how do I clean this?</AccordionTrigger>
                <AccordionContent>
                  <p>Got some gunk on it? Check out our how to care for sections by scrolling down past our Q&A.</p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>What is your shipping policy?</AccordionTrigger>
                <AccordionContent>
                  <p>We offer standard shipping through USPS. The shipping is based off of weight of package and will be estimated for you at checkout. Orders are typically shipped within 1-2 business days.</p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-6">
                <AccordionTrigger>How do I become an artist on here?</AccordionTrigger>
                <AccordionContent>
                  <p>We like where your heading with this! Whether you want to advertise or use our shop, we wanna help. Drop us a line!</p>
                  <a href="mailto:kismetcrew@gmail.com?subject=Artist Inquiry" className="block mt-2 text-[#D946EF] dark:text-[#5CC6D0] hover:underline">One of us, one of us</a>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-7">
                <AccordionTrigger>What is your return policy?</AccordionTrigger>
                <AccordionContent>
                  <p>You can find our policy here:</p>
                  <Link to="#return-policy" className="block mt-2 text-[#D946EF] dark:text-[#5CC6D0] hover:underline">Return and refund policy</Link>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-8">
                <AccordionTrigger>Do you offer international shipping?</AccordionTrigger>
                <AccordionContent>
                  <p>No, Unfortunately at this time we are a US based company providing service only to the States.</p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-9">
                <AccordionTrigger>I agreed to a Privacy Policy.... what is it?</AccordionTrigger>
                <AccordionContent>
                  <Link to="#privacy-policy" className="block text-[#D946EF] dark:text-[#5CC6D0] hover:underline">Privacy Policy</Link>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-10">
                <AccordionTrigger>And the Terms and Conditions?</AccordionTrigger>
                <AccordionContent>
                  <Link to="#terms" className="block text-[#D946EF] dark:text-[#5CC6D0] hover:underline">Terms and Conditions</Link>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-11">
                <AccordionTrigger>Why does your logo keep changing?</AccordionTrigger>
                <AccordionContent>
                  <p>We keep growing and changing as artists. So does our logo!</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          
          <div id="product-care" className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12">
            <div className="flex items-center mb-6">
              <BookOpen className="w-6 h-6 text-[#D946EF] dark:text-[#5CC6D0] mr-3" />
              <h2 className="text-2xl font-bold">Your resin product, info and care</h2>
            </div>
            
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <div>
                <h3 className="font-bold mb-1">Safe and Durable</h3>
                <p>Our products are food grade and non toxic. They are also BPA and VOC free. After a full cure our products are extremely durable. There should be minimal to no damage after a fall.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-1">Caring for your Purchase</h3>
                <p>All products are waterproof and can be cleaned with warm water and soap. They are not dishwasher safe as temperatures over 180°F can cause warping of structure. Do not use abrasive soap or cleaning a tool as it may damage surface art.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-1">Glow</h3>
                <p>(if it includes glow) Our glow products are one of our specialties and are made to show off easily. Most products take less than 10 seconds to charge visible with a 395 nm low watt light. It may take more than one pass over with anything lower.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-1">Customize</h3>
                <p>We can include a great deal of customization options such as letters, dates, color choice and logos. It is our pleasure to make something you enjoy and want to share. Please email us and ask. We would be pleased to accommodate your requests and/or share options.</p>
              </div>
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="italic">Notes: If for any reason your piece becomes damaged or warped (we won't ask) you can email us with the subject HELP! We can do our best to help you repair or give you our fix its!</p>
              </div>
            </div>
          </div>
          
          <div id="return-policy" className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6">Return and Refund Policy</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Return and refund policy details will be provided here.
            </p>
          </div>
          
          <div id="privacy-policy" className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6">Privacy Policy</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Privacy policy details will be provided here.
            </p>
          </div>
          
          <div id="terms" className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Terms and Conditions</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Terms and conditions details will be provided here.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WorldMap;
