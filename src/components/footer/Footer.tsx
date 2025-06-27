import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, Star } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="text-2xl font-bold">
              RENT<span className="text-blue-400">CAR</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Your trusted car rental partner in Kenya. Premium vehicles, 
              competitive prices, and exceptional service.
            </p>
            <div className="flex items-center space-x-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <span className="text-gray-300 text-sm">5.0 Rating</span>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Vehicle Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Vehicle Categories</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Economy Cars</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Compact Cars</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Mid-size Cars</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">SUVs</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Luxury Vehicles</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Convertibles</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Fleet</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Locations</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Reviews</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <div className="text-white font-medium">(254)790519306</div>
                  <div className="text-gray-300 text-sm">24/7 Support</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <div className="text-white font-medium">info@rentcar.com</div>
                  <div className="text-gray-300 text-sm">Email Us</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <div className="text-white font-medium">Kenya, Nairobi</div>
                  <div className="text-gray-300 text-sm">Free Delivery Available</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <div className="text-white font-medium">24/7 Service</div>
                  <div className="text-gray-300 text-sm">Always Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-blue-600 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Hit the Road?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust RentCar for their transportation needs. 
            Book your perfect car today and experience the freedom of the road!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/booking" className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
             Book Your Car
            </a>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold">
              Get Free Quote
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © 2025 RentCar. All rights reserved.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;