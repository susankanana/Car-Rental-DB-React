import { Car, Users, Shield, Award, Clock, MapPin, CheckCircle, Star, Heart, Target, Eye, Zap } from 'lucide-react';
import me from "../../assets/images/me.jpg"
import woman4 from "../../assets/images/woman4.jpg"
import man4 from "../../assets/images/man4.jpg"
import whitecar from "../../assets/images/whitecar.jpg"

const About = () => {
  const stats = [
    {
      icon: Car,
      number: "500+",
      label: "Vehicles in Fleet",
      description: "Modern, well-maintained cars"
    },
    {
      icon: Users,
      number: "10,000+",
      label: "Happy Customers",
      description: "Satisfied clients across Kenya"
    },
    {
      icon: Award,
      number: "10+",
      label: "Years Experience",
      description: "Trusted car rental service"
    },
    {
      icon: Star,
      number: "5.0",
      label: "Average Rating",
      description: "Based on customer reviews"
    }
  ];

  const values = [
    {
      icon: Shield,
      title: "Safety First",
      description: "All our vehicles undergo rigorous safety inspections and are fully insured for your peace of mind."
    },
    {
      icon: Heart,
      title: "Customer Care",
      description: "We prioritize exceptional customer service with 24/7 support and personalized assistance."
    },
    {
      icon: CheckCircle,
      title: "Quality Assurance",
      description: "Every vehicle in our fleet meets the highest standards of cleanliness and maintenance."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We continuously improve our services with the latest technology and booking systems."
    }
  ];

  const team = [
    {
      name: "Susan Kanana",
      role: "Founder & CEO",
      image: me,
      description: "With over 15 years in the automotive industry, Susan founded RentCar to provide reliable transportation solutions."
    },
    {
      name: "David Mwangi",
      role: "Operations Manager",
      image: man4,
      description: "David ensures our fleet operations run smoothly and our customers receive exceptional service."
    },
    {
      name: "Grace Wanjiku",
      role: "Customer Relations",
      image: woman4,
      description: "Grace leads our customer service team, ensuring every client has a memorable rental experience."
    }
  ];

  const milestones = [
    {
      year: "2014",
      title: "Company Founded",
      description: "Started with 10 vehicles and a vision to transform car rental in Kenya"
    },
    {
      year: "2017",
      title: "100 Vehicles",
      description: "Expanded our fleet to serve more customers across Nairobi"
    },
    {
      year: "2020",
      title: "Digital Platform",
      description: "Launched our online booking system for seamless customer experience"
    },
    {
      year: "2023",
      title: "500+ Fleet",
      description: "Became Kenya's leading car rental service with nationwide coverage"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-blue-600">RentCar</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're Kenya's premier car rental service, dedicated to providing reliable, 
            affordable, and convenient transportation solutions for over a decade.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="bg-blue-50 rounded-2xl p-8">
            <div className="flex items-center mb-6">
              <div className="bg-blue-600 p-3 rounded-full mr-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">
              To provide exceptional car rental services that empower our customers with 
              the freedom to explore Kenya safely, comfortably, and affordably. We strive 
              to exceed expectations through quality vehicles, transparent pricing, and 
              outstanding customer service.
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="flex items-center mb-6">
              <div className="bg-gray-600 p-3 rounded-full mr-4">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">
              To be East Africa's most trusted and innovative car rental company, 
              setting the standard for quality, reliability, and customer satisfaction. 
              We envision a future where every journey is seamless and every customer 
              becomes a lifelong advocate.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-blue-600 rounded-2xl p-8 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Impact in Numbers</h2>
            <p className="text-blue-100 text-lg">
              These numbers reflect our commitment to excellence and customer satisfaction
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div>
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-xl font-semibold text-blue-100 mb-2">{stat.label}</div>
                <div className="text-blue-200 text-sm">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Our Story */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Founded in 2014 by Susan Kanana, RentCar began as a small family business 
                  with just 10 vehicles and a big dream. Having experienced the challenges 
                  of finding reliable transportation in Kenya, Susan was determined to create 
                  a car rental service that prioritized customer satisfaction and vehicle quality.
                </p>
                <p>
                  What started in a small garage in Nairobi has grown into Kenya's leading 
                  car rental company. We've maintained our commitment to personal service 
                  while embracing technology to make car rental more convenient than ever.
                </p>
                <p>
                  Today, we're proud to serve thousands of customers annually, from business 
                  travelers and tourists to families planning their perfect getaway. Our success 
                  is built on trust, reliability, and the belief that every journey should be 
                  comfortable and worry-free.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src= {whitecar}
                alt="RentCar fleet"
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Award className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Since 2014</div>
                    <div className="text-sm text-gray-600">Serving Kenya with Pride</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do and shape our commitment to excellence
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 rounded-2xl hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  <div className="bg-blue-100 p-4 rounded-full">
                    <value.icon className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Key milestones that have shaped RentCar into what it is today
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                      <div className="text-2xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate professionals behind RentCar's success
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <div className="text-blue-600 font-medium mb-4">{member.role}</div>
                <p className="text-gray-600 leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose RentCar?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We go above and beyond to ensure your car rental experience exceeds expectations
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 p-2 rounded-full flex-shrink-0">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Premium Fleet</h3>
                <p className="text-gray-600">Latest model vehicles with advanced safety features</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 p-2 rounded-full flex-shrink-0">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">24/7 Support</h3>
                <p className="text-gray-600">Round-the-clock customer service and roadside assistance</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 p-2 rounded-full flex-shrink-0">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Free Delivery</h3>
                <p className="text-gray-600">Complimentary vehicle delivery to your location</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 p-2 rounded-full flex-shrink-0">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Full Insurance</h3>
                <p className="text-gray-600">Comprehensive coverage for complete peace of mind</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 p-2 rounded-full flex-shrink-0">
                <Star className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Transparent Pricing</h3>
                <p className="text-gray-600">No hidden fees, clear pricing structure</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 p-2 rounded-full flex-shrink-0">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Expert Team</h3>
                <p className="text-gray-600">Experienced professionals dedicated to your satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;