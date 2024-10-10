
import HeroSection from '../majorComponents/HeroSection'
import FeatureSection from '../majorComponents/FeatureSection'
import { Workflow } from 'lucide-react'
import Pricing from '../majorComponents/Pricing'
import Testimonials from '../majorComponents/Testimonials'
import Footer from '../majorComponents/Footer'
import Navbar from '../majorComponents/Navbar'
import { CardHoverEffectDemo } from '../majorComponents/HoverEffect'
import { MarqueeDemo } from '../majorComponents/Marqe'


import CarouselSize from "../Carousel";
import { Timeline } from '../ui/timeline'
// import IconCloud from '../ui/icon-cloud'

import user1 from "../../assets/timeline-illustrations/1.jpeg";
import user2 from "../../assets/timeline-illustrations/2.jpeg";
import user3 from "../../assets/timeline-illustrations/3.jpeg";
import user4 from "../../assets/timeline-illustrations/4.jpeg";
import user5 from "../../assets/timeline-illustrations/5.jpeg";
import user6 from "../../assets/timeline-illustrations/6.jpeg";
import user7 from "../../assets/timeline-illustrations/7.jpeg";
import { BorderBeamDemo } from '../majorComponents/BorderBeam'

import TextBreak from '../majorComponents/TextBreak'
import { GlobeDemo } from '../majorComponents/Globe'

function HomePage() {
  // const slugs = [
  //   "typescript",
  //   "javascript",
  //   "dart",
  //   "java",
  //   "react",
  //   "flutter",
  //   "android",
  //   "html5",
  //   "css3",
  //   "nodedotjs",
  //   "express",
  //   "nextdotjs",
  //   "prisma",
  //   "amazonaws",
  //   "postgresql",
  //   "firebase",
  //   "nginx",
  //   "vercel",
  //   "testinglibrary",
  //   "jest",
  //   "cypress",
  //   "docker",
  //   "git",
  //   "jira",
  //   "github",
  //   "gitlab",
  //   "visualstudiocode",
  //   "androidstudio",
  //   "sonarqube",
  //   "figma",
  // ];
  // const cloud = <IconCloud iconSlugs={slugs}/>
  type TimelineEntry = {
    title: string;
    content: React.ReactNode;
  };
  const timelineData: TimelineEntry[] = [
    // {
    //   title: "Job Seeker Profile Creation",
    //   content: cloud,
    // },
    {
      title: "Job Seeker Profile Creation",
      content: (
        <p className=''>
          <div className='mb-0  sm:mb-20 max-w-sm m-auto'>
            Job seekers begin by creating a comprehensive profile on the Guhuza platform. This includes detailed information about their skills, qualifications, work experience, education, and career aspirations. Users are encouraged to upload their resumes and provide additional information to enhance their visibility in the job market.
          </div>
          <BorderBeamDemo image={user1} />
        </p>
      ),
    },
    {
      title: "AI Matching Technology Activation",
      content: (
        <p className=''>
          <div className='mb-0  sm:mb-20 max-w-sm m-auto'>
          Guhuza's advanced AI technology analyzes the job seeker’s profile against thousands of job listings on the platform. The AI evaluates the skills required for each position and ranks job matches based on relevance and alignment with the candidate's experience and qualifications. This process is designed to ensure that job seekers only see positions that are a good fit for their profiles.
        </div>
          <BorderBeamDemo image={user2} />
          
        </p>
      ),
    },
    {
      title: "Instant Job Matching and Connection",
      content: (
        <p className=''><div className='mb-0  sm:mb-20 max-w-sm m-auto'>

          Once a suitable match is identified, Guhuza's system instantly connects job seekers with potential employers. This eliminates the time-consuming process of applying to multiple positions, allowing candidates to focus on preparing for interviews. Job seekers receive real-time notifications about matches and can easily review job details.
        </div>
          <BorderBeamDemo image={user3} />
        </p>
      ),
    },
    {
      title: "Live Interviews Through the Platform",
      content: (
        <p className=''><div className='mb-0  sm:mb-20 max-w-sm m-auto'>

          Employers can conduct live interviews with matched candidates directly through the Guhuza platform. The built-in video conferencing tools ensure a smooth interview process, allowing employers to assess candidates in real-time. Job seekers can showcase their skills and qualifications, making the interview more personal and interactive.
        </div>
          <BorderBeamDemo image={user4} /> {/* Replace with appropriate user image */}
        </p>
      ),
    },
    {
      title: "Automated Hiring Process Management",
      content: (
        <p className=''><div className='mb-0  sm:mb-20 max-w-sm m-auto'>

          Guhuza automates the entire hiring process, from job openings to final job offers. The platform manages candidate screening, background checks, and necessary verifications in a streamlined manner. This ensures that both employers and job seekers can focus on what matters most: finding the right match without unnecessary delays or complications.
        </div>
          <BorderBeamDemo image={user5} /> {/* Replace with appropriate user image */}
        </p>
      ),
    },
    {
      title: "Quick Job Start in Less than 24 Hours",
      content: (
        <p className=''><div className='mb-0  sm:mb-20 max-w-sm m-auto'>

          After successful interviews and all required checks, candidates can begin their new jobs in less than 24 hours. This rapid turnaround time allows businesses to fill positions quickly, while job seekers can start their careers without long waiting periods. Guhuza's efficiency helps foster a dynamic job market where opportunities are seized swiftly.
        </div>
          <BorderBeamDemo image={user6} /> {/* Replace with appropriate user image */}
        </p>
      ),
    },
    {
      title: "Continuous Feedback and Improvement",
      content: (
        <p className=''><div className='mb-0  sm:mb-20 max-w-sm m-auto'>

          After the hiring process, both employers and job seekers are encouraged to provide feedback on their experiences. This feedback is crucial for Guhuza to continually refine and improve its matching algorithm and user experience. By analyzing this data, Guhuza aims to enhance the overall effectiveness of the platform and ensure the highest satisfaction for both job seekers and employers.
        </div>
          <BorderBeamDemo image={user7} /> {/* Replace with appropriate user image */}
        </p>
      ),
    },
  ];
  
  
  
  
  return (
    <>

      
  

      <Navbar />
      {/* <CardSpotlightDemo/> */}
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <HeroSection />
      <TextBreak lefttext={'Your Advantage'} righttext={'Awaits'}/>
        <CardHoverEffectDemo />

   
      <TextBreak lefttext={'Our'} righttext={'Partners'}/>

        <MarqueeDemo />

      <TextBreak lefttext={'How it'} righttext={'Works?'}/>
    
      <Timeline data={timelineData}/>
      {/* <TextBreak lefttext={'Our'} righttext={'Utilities'}/> */}
        {/* <BentoGridThirdDemo /> */}
        <TextBreak lefttext={'Employer'} righttext={'Services'}/>
        <div className='p-10'>
          
        <CarouselSize />
        </div>
      <TextBreak lefttext={'Game'} righttext={'Features'}/>
        <FeatureSection />

        <Workflow />
        <Pricing />
        <Testimonials />
        {/* <TypewriterEffectSmoothDemo /> */}
        <GlobeDemo/>
        <Footer />
      </div>
      
 
    </>
  )
}

export default HomePage