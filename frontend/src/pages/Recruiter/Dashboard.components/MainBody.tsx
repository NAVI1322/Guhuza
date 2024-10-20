import React, { useRef, useEffect, useState } from "react";
import ContentCard from "./ContentCard";
import SideBar from "./SideBar";
import CarouselTopics from "./CarouselTopics";

// Array of articles data
const jobs = [
  {
    jobName: "Software Dev",
    startDate: "Oct 19, 2024",
    endDate: "Dec 3, 2024",
    site: "Remote",
    applied: "123",
    waitlisted: "31",
    shortlisted: "23",
  },
  // Add more article objects here...
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
              site={job.site}
              jobName={job.jobName}
              startDate={job.startDate}
              endDate={job.endDate}
              applied={job.applied}
              waitlisted={job.waitlisted}
              shortlisted={job.shortlisted}
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
