
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MobileHeader from '@/components/navigation/MobileHeader';
import Sidebar from '@/components/navigation/Sidebar';
import NavigationMenu from '@/components/navigation/NavigationMenu';
import { ArrowLeft, Mail, Phone, MapPin } from 'lucide-react';

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
        <div className="max-w-7xl mx-auto pt-20 md:pt-0 px-4 md:px-8">
          <Link to="/" className="flex items-center text-primary mb-6 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5CC6D0] focus-visible:rounded-sm focus-visible:ring-offset-2">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to home
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Contact KismetTheory</h1>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
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
                        href="mailto:info@kismettheory.com" 
                        className="text-[#D946EF] dark:text-[#5CC6D0] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5CC6D0] focus-visible:rounded-sm focus-visible:ring-offset-2"
                      >
                        info@kismettheory.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-[#D946EF] dark:text-[#5CC6D0] mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold">Phone</h3>
                      <a 
                        href="tel:+15551234567" 
                        className="text-[#D946EF] dark:text-[#5CC6D0] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5CC6D0] focus-visible:rounded-sm focus-visible:ring-offset-2"
                      >
                        (555) 123-4567
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-[#D946EF] dark:text-[#5CC6D0] mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold">Location</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        DelMar, CA
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <form className="space-y-4">
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
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-4">About KismetTheory</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              KismetTheory is a creative collective based in DelMar, California. We focus on bringing unique handcrafted products and experiences to our community.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Our mission is to connect local artists and businesses with people who appreciate authentic, meaningful creations. Through our shop, events, and community initiatives, we aim to foster a sense of connection and positive impact.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Follow us on social media to stay updated on our latest collections, events, and community activities.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WorldMap;
