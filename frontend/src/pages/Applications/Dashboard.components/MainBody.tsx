import React, { useRef, useEffect, useState } from "react";
import ContentCard from "./ContentCard";
import SideBar from "./SideBar";
import CarouselTopics from "./CarouselTopics";

// Array of jobs data
const jobs = [
  {
    candidateName: "Navneet Paaji",
    startDate: "Oct 19, 2024",
    endDate: "Dec 3, 2024",
    site: "Remote",
    interviewsScheduled: "2",  // New metric
    offersReceived: "1",        // New metric
    feedbackGiven: "3",         // New metric
    location: "New Delhi, India",
    skills: ["React", "JavaScript", "Tailwind CSS"],
    experienceLevel: "Mid-level",
    education: "Bachelor's in Computer Science",
    preferredJobType: "Full-Time",
  },
  // Add more candidate objects here...
];

const MainBody: React.FC = () => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [sidebarHeight, setSidebarHeight] = useState<number>(0);

  useEffect(() => {
    if (sidebarRef.current) {
      // Set the height based on the sidebar's height
      setSidebarHeight(sidebarRef.current.clientHeight);
    }
  }, []);

  return (
    <>
      <div className="flex justify-center ehd:justify-evenly xl:justify-center xl:gap-16">
        <div
          className="overflow-y-clip nhd:overflow-y-scroll no-scrollbar"
          style={{ height: `${sidebarHeight}px` }} // Set height based on sidebar
        >
          <div>
            <CarouselTopics />
          </div>
          {jobs.map((job, index) => (
            <ContentCard
              key={index}
              candidateName={job.candidateName}
              startDate={job.startDate}
              endDate={job.endDate}
              interviewsScheduled={job.interviewsScheduled} // New prop
              offersReceived={job.offersReceived}           // New prop
              feedbackGiven={job.feedbackGiven}             // New prop
              location={job.location}
              skills={job.skills}
              experienceLevel={job.experienceLevel}
              education={job.education}
              preferredJobType={job.preferredJobType}
            />
          ))}
        </div>
        <div ref={sidebarRef}>
          <SideBar />
        </div>
      </div>
    </>
  );
};

export default MainBody;
