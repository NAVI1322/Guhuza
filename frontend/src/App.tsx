

import './App.css'
import HeroSection from './components/HeroSection'
import FeatureSection from './components/FeatureSection'
import { Workflow } from 'lucide-react'
import Pricing from './components/Pricing'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import Navbar from './components/Navbar'

function App() {


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

export default App
