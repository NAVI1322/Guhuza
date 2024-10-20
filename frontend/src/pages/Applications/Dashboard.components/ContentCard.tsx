import { Button } from '@/components/ui/button';
import { CalendarClock, CalendarDays } from 'lucide-react';
import { FC } from 'react';

interface ContentCardProps {
  candidateName: string;
  startDate: string;
  endDate: string;
  interviewsScheduled: string; // New metric
  offersReceived: string;      // New metric
  feedbackGiven: string;       // New metric
  location: string;
  skills: string[];
  experienceLevel: string;
  education: string;
  preferredJobType: string;
}

const ContentCard: React.FC<ContentCardProps> = ({
  candidateName,
  startDate,
  endDate,
  interviewsScheduled,
  offersReceived,
  feedbackGiven,
  location,
  skills,
  experienceLevel,
  education,
  preferredJobType,
}) => {
  return (
    <div className="flex flex-col py-3 px-5">
      <div className="border-b pb-5 max-w-[680px]">
        <div>
          <div className="flex flex-col">
            <div className="flex justify-between mb-2">
              <div className="line-clamp-4 font-bold text-lg md:text-xl">
                {candidateName}
                <div className="font-light text-sm mb-5 flex flex-col gap-[1px]">
                  <div className="flex gap-[4px] items-center text-purple-200">
                    <CalendarDays className="size-4" />
                    Work Exp: {startDate}
                  </div>
                  <div className="flex gap-[4px] items-center text-red-500">
                    <CalendarClock className="size-4" />
                    Deadline: {endDate}
                  </div>
                </div>
              </div>
              <img
                src="https://github.com/shadcn.png"
                className="w-[120px] aspect-square rounded-md border-slate-300 border"
                alt=""
              />
            </div>

            <div className="mb-2 text-gray-300">
              <div className="">Location: {location}</div>
              <div className="">Experience Level: {experienceLevel}</div>
              <div className="">Education: {education}</div>
              <div className="">Preferred Job Type: {preferredJobType}</div>
            </div>

            <div className="mb-2">
              <div className="">Skills:</div>
              <ul className="list-disc list-">
                {skills.map((skill, index) => (
                  <li key={index} className="">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-between">
              <div className="flex items-center gap-5 text-xs">
                <div className="gap-2 items-center flex text-blue-400">
                  <div>{interviewsScheduled}</div>
                  <div className="hidden fsty:block">Interviews Scheduled</div>
                </div>
                <div className="gap-2 items-center flex text-green-400">
                  <div>{offersReceived}</div>
                  <div className="hidden fsty:block">Offers Received</div>
                </div>
                <div className="gap-2 items-center flex text-orange-400">
                  <div>{feedbackGiven}</div>
                  <div className="hidden fsty:block">Feedback Given</div>
                </div>
              </div>
              <Button variant={"myButton"} className="ml-4">
                Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
