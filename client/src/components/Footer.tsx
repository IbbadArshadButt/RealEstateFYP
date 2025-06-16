import { Facebook, Twitter, Instagram, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Zameen Echo</h3>
            <p className="text-gray-400 mb-4">
              Pakistan's most trusted real estate platform, helping you find your perfect property since 2023.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/properties" className="text-gray-400 hover:text-white">
                  Properties
                </Link>
              </li>
              <li>
                <Link to="/agents" className="text-gray-400 hover:text-white">
                  Agents
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="text-xl font-bold mb-4">Property Types</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/properties?type=house" className="text-gray-400 hover:text-white">
                  Houses
                </Link>
              </li>
              <li>
                <Link to="/properties?type=apartment" className="text-gray-400 hover:text-white">
                  Apartments
                </Link>
              </li>
              <li>
                <Link to="/properties?type=commercial" className="text-gray-400 hover:text-white">
                  Commercial
                </Link>
              </li>
              <li>
                <Link to="/properties?type=villa" className="text-gray-400 hover:text-white">
                  Villas
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <Phone className="h-5 w-5 mr-2" />
                <span>+92 308 1200084</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Mail className="h-5 w-5 mr-2" />
                <span>ibbadbutt3521@gmail.com</span>
              </li>
              <li className="text-gray-400">
                Office #123, Some Building,<br />
                Main Boulevard, Lahore
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Zameen Echo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 