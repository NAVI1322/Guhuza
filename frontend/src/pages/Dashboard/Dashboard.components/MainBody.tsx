import React, { useRef, useEffect, useState } from "react";
import ContentCard from "./ContentCard";
import SideBar from "./SideBar";
import CarouselTopics from "./CarouselTopics";

// Array of articles data
const articles = [
  {
    avatarSrc: "https://github.com/shadcn.png",
    avatarFallback: "JD",
    name: "John Doe",
    publication: "Tech Times",
    articleHeading: "Exploring the New Features in React 18",
    articleDescription:
      "React 18 brings a lot of new features for developers, including concurrent rendering, automatic batching, and more.",
    articleImageSrc: "https://source.unsplash.com/random/1", // Random Unsplash image
    date: "Sept 15",
    likes: "22.3K",
    comments: "1.5K",
  },
  {
    avatarSrc: "https://github.com/shadcn.png",
    avatarFallback: "JD",
    name: "John Doe",
    publication: "Tech Today",
    articleHeading: "Understanding JavaScript Closures",
    articleDescription:
      "Closures are a fundamental concept in JavaScript. This article explains how they work and where you can use them.",
    articleImageSrc: "https://source.unsplash.com/random/2", // Random Unsplash image
    date: "Oct 10",
    likes: "10K",
    comments: "2K",
  },
  {
    avatarSrc: "https://example.com/avatar1.jpg",
    avatarFallback: "AE",
    name: "Alice Evans",
    publication: "Health Digest",
    articleHeading: "10 Tips for a Healthy Lifestyle",
    articleDescription:
      "Adopting a healthy lifestyle is easier than you think. Here are 10 practical tips to help you get started.",
    articleImageSrc: "https://source.unsplash.com/random/3", // Random Unsplash image
    date: "Oct 11",
    likes: "15K",
    comments: "5K",
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

            <CarouselTopics/>
            </div>
          {articles.map((article, index) => (
            <ContentCard
              key={index}
              avatarSrc={article.avatarSrc}
              avatarFallback={article.avatarFallback}
              name={article.name}
              publication={article.publication}
              articleHeading={article.articleHeading}
              articleDescription={article.articleDescription}
              articleImageSrc={article.articleImageSrc}
              date={article.date}
              likes={article.likes}
              comments={article.comments}
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
