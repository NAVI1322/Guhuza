
import HeroSection from '../majorComponents/HeroSection'
import FeatureSection from '../majorComponents/FeatureSection'
import { Workflow } from 'lucide-react'
import Pricing from '../majorComponents/Pricing'
import Testimonials from '../majorComponents/Testimonials'
import Footer from '../majorComponents/Footer'
import Navbar from '../majorComponents/Navbar'


function HomePage() {


  return (
    <>
     
      <Navbar />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <HeroSection />
        <FeatureSection />
        <Workflow />
        <Pricing />
        <Testimonials />
        <Footer />
      </div>
    </>
  )
}

export default HomePage