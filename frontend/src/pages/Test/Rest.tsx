import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { StarsBackground } from '@/components/ui/stars-background';
import { useNavigate, useLocation } from 'react-router-dom';

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string | string[];
  type: 'single' | 'multiple' | 'trueFalse';
  timeLimit: number; // New time limit property
}

interface LocationState {
  jobId?: string;
  QuestionObj?: Question[];
  employeeInfo?: EmployeeInfo;
  jobData?: JobDescriptionProps;
}

interface EmployeeInfo {
  fullName: string;
  email: string;
  phoneNumber: string;
  coverLetter: string;
}

interface JobDescriptionProps {
  jobName: string;
  location: string;
  description: string;
  benefits: string;
  ourValues: string;
  positionSummary: string;
  positionResponsibilities: string;
  skills: string;
  whyWorkWithUs: string;
  createdAt: string;
}
const questions: Question[] = [
  {
    id: 1,
    question: 'Is React a JavaScript library?',
    options: ['Yes', 'No'],
    answer: 'Yes',
    type: 'trueFalse',
    timeLimit: 65,
  },
  {
    id: 2,
    question: 'Which of the following are programming languages?',
    options: ['JavaScript', 'HTML', 'CSS', 'Python'],
    answer: ['JavaScript', 'Python'],
    type: 'multiple',
    timeLimit: 25,
  },
  {
    id: 3,
    question: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Lisbon'],
    answer: 'Paris',
    type: 'single',
    timeLimit: 30,
  },
  {
    id: 4,
    question: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Lisbon'],
    answer: 'Paris',
    type: 'single',
    timeLimit: 30,
  },
];

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showEndScreen, setShowEndScreen] = useState(false);
  const [allAttempts, setAllAttempts] = useState<string[][]>([]);
  const location = useLocation();
  const { jobId: JobId, QuestionObj = [], employeeInfo, jobData}: LocationState = location.state as LocationState;
  const totalDuration = questions[currentQuestionIndex].timeLimit;
  const navigate = useNavigate();

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "Are you sure you want to leave? Unsaved progress will be lost.";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleSubmitConfirm = () => {
    const userConfirmed = window.confirm("Are you sure you want to submit the quiz? You will be redirected to the dashboard.");
    if (userConfirmed) {
      navigate("/dashboard");
    }
  };
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isActive && elapsedTime < totalDuration) {
      timer = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    } else if (elapsedTime >= totalDuration) {
      setIsActive(false);
      handleNext();
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isActive, elapsedTime, totalDuration]);

  const handleOptionSelect = (option: string) => {
    if (currentQuestion.type === 'multiple') {
      setSelectedAnswers(prev => {
        if (prev.includes(option)) {
          return prev.filter(ans => ans !== option);
        }
        return [...prev, option];
      });
    } else {
      setSelectedAnswers([option]);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setAllAttempts([...allAttempts, selectedAnswers]); // Push selected answers into allAttempts
      setCurrentQuestionIndex(prev => prev + 1);
      setElapsedTime(0);
      setIsActive(true);
      setSelectedAnswers([]);  // Reset selected answers for next question
    } else {
      setAllAttempts([...allAttempts, selectedAnswers]);  // Push the final question's answers
      setShowEndScreen(true);
      setIsActive(false);
    }
  };
  

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setElapsedTime(0);
    setIsActive(true);
    setSelectedAnswers([]);
    setAllAttempts([]);
    setShowEndScreen(false);
    setShowResults(false);
  };
  // Submit the user's answers to the server
  const handleSubmit = async () => {
    const quizData = {
      employeeInfo,
      JobId,
      answers: allAttempts,  // Send all attempts as the answers
      QuestionObj: questions,  // Send the full list of questions
      jobData,
    };
  
    try {
      const response = await fetch("https://yourserver.com/api/submit-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quizData),  // Send quiz data to the server
      });
  
      if (!response.ok) throw new Error("Failed to submit quiz data");
  
      const result = await response.json();
      console.log("Quiz submitted successfully:", result);  // Log success
    } catch (error) {
      console.error("Error submitting quiz:", error);  // Handle errors
    }
  };
  
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((elapsedTime / totalDuration) * 100).toFixed(2);
  const remainingTime = totalDuration - elapsedTime;

  return (
    <>
      <StarsBackground className='z-0' />
      <div className='relative z-10 flex flex-col justify-center items-center h-screen w-[95%] max-w-2xl m-auto'>
        { showEndScreen ? (
          <div className='flex flex-col gap-3'>
     <div className="text-center bg-gradient-to-br from-blue-500/30 via-blue-600/20 to-blue-800 px-4 py-6 rounded-md max-w-2xl h-auto">
    <h1 className="text-3xl sm:text-4xl font-semibold mb-6 text-white/80">Your Details</h1>
    <ul className="text-left mb-6 overflow-y-auto h-60 pr-3 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-800/40 hover:scrollbar-thumb-blue-700">
      <li className="mb-4 bg-gradient-to-tr from-blue-700 via-blue-800/20 to-blue-900/10 px-5 py-4 rounded-md text-white/90">
        <p><span className="font-semibold text-lg">Job Name:</span> <span className="text-white/70">{jobData?.jobName || "N/A"}</span></p>
        <p><span className="font-semibold text-lg">Location:</span> <span className="text-white/70">{jobData?.location || "N/A"}</span></p>
        <p><span className="font-semibold text-lg">Description:</span> <span className="text-white/70 ">{jobData?.description || "N/A"}</span></p>
      </li>
      <li className="mb-4 bg-gradient-to-tr from-blue-700 via-blue-800/20 to-blue-900/10 px-5 py-4 rounded-md text-white/90">
        <p><span className="font-semibold text-lg">Full Name:</span> <span className="text-white/70">{employeeInfo?.fullName || "N/A"}</span></p>
        <p><span className="font-semibold text-lg">Email:</span> <span className="text-white/70">{employeeInfo?.email || "N/A"}</span></p>
        <p><span className="font-semibold text-lg">Phone:</span> <span className="text-white/70">{employeeInfo?.phoneNumber || "N/A"}</span></p>
        <p><span className="font-semibold text-lg">Cover Letter:</span> <span className="text-white/70">{employeeInfo?.coverLetter || "Not provided"}</span></p>
      </li>
    </ul>
  </div>
            <div className="text-center  bg-gradient-to-br from-blue-500/30 via-blue-600/20 to-blue-800 px-3 py-5 rounded-md max-w-2xl h-96">
              <h1 className="h-10 text-2xl sm:text-4xl font-bold mb-4 text-white/80">Your Attempt</h1>
              <ul className="text-left mb-4 overflow-y-auto h-60 pr-2 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-800/40 hover:scrollbar-thumb-blue-700">
                {questions.map((question, index) => (
                  <li key={question.id} className="mb-2 bg-gradient-to-tr from-blue-700 via-blue-800/20 to-blue-900/10 px-5 py-3 rounded-md text-white/80">
                    <p className="font-semibold">{index + 1}. {question.question}</p>
                    <p className="text-sm text-white/60">
                      Your answer: <span className='text-white/100'>{allAttempts[index].join(', ') || 'No answer selected'}</span>
                    </p>
                  </li>
                ))}
              </ul>
              <Button variant="myButton" onClick={handleSubmitConfirm}>
                Submit Quiz
              </Button>
            </div>

          </div>
        ) : (
          <>
            <div className='h-[5%] w-full flex justify-center items-center font-medium text-xl mb-2 rounded-md  bg-gradient-to-br from-blue-500/30 via-blue-600/20 to-blue-800'>
              Question {currentQuestionIndex + 1}/{questions.length}
            </div>
            <div className='h-[90%] text-center w-full bg-gradient-to-br from-blue-500/10 via-blue-600/20 to-blue-800/10 flex flex-col p-3 rounded-lg shadow-lg'>
              <div className='h-1/2 bg-gradient-to-br from-blue-500/30 via-blue-600/20 to-blue-800 text-start overflow-y-auto p-4 rounded-lg shadow-md'>
                <h2 className='text-lg font-semibold'>{currentQuestion.question}</h2>
              </div>
              <div className='h-1/2 flex flex-col gap-2 mt-3'>
  {currentQuestion.options.map(option => (
    <div key={option} className={`flex items-center h-12 rounded-md`}>
      <button
        className={`flex-1 rounded-md h-full cursor-pointer font-medium text-sm
          ${selectedAnswers.includes(option) ? 'bg-green-600' : 'bg-gradient-to-r from-blue-600 to-blue-800'} 
          text-white transition-all duration-500`}
        onClick={() => handleOptionSelect(option)}
      >
        {option}
      </button>
    </div>
  ))}
</div>



              <div className='w-full bg-transparent mt-3'>
                <div className='rounded-md'>
                  <div className='text-end p-2'>
                    <span className='text-gray-100'>Time remaining: <span className='font-semibold'>{remainingTime}s</span></span>
                  </div>
                  <div className='rounded-md bg-gray-300'>
                    <div className='w-full bg-gradient-to-r from-blue-600 to-blue-800 h-2 rounded-md timer' style={{ width: `${progress}%`, transition: 'width 1s ease-in-out' }}></div>
                  </div>
                </div>
              </div>
              <div className='h-[10%] flex items-center justify-center mt-3'>
                <Button
                  variant={'myButton'}
                  className='w-full h-[80%] bg-blue-600 hover:bg-blue-500 transition duration-300'
                  onClick={handleNext}
                  disabled={selectedAnswers.length === 0}
                >
                  Next
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Quiz;
