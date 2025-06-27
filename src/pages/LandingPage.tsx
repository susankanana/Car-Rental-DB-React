import Navbar from "../components/nav/Nav";
import Hero from "../components/hero/Hero"
import Services from "../components/services/Services"
import Testimonials from "../components/testimonials/Testimonials";
import Footer from "../components/footer/Footer";

const LandingPage = () => {
  return (
    <div>
         <Navbar />
         <Hero />
         <Services />
         <Testimonials />
         <Footer />
    </div>
  )
}

export default LandingPage