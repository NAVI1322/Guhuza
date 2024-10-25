import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';
import Summary from './elements/testSummary';

interface Question {
  id: string;
  type: "multiple-choice" | "true-false" | "fill-up";
  time?: number;
  content: string;
  options: string[];
  correctAnswers: string[];
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

const Test: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [isTestStarted, setIsTestStarted] = useState<boolean>(true);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const location = useLocation();
  const { jobId: JobId, QuestionObj = [], employeeInfo, jobData }: LocationState = location.state as LocationState;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTestStarted && timeLeft !== null && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => (prev ? prev - 1 : 0));
      }, 1000);
    } else if (timeLeft === 0) {
      handleNextQuestion();
    }
    return () => clearInterval(timer);
  }, [isTestStarted, timeLeft]);

  useEffect(() => {
    setTimeLeft(QuestionObj[currentQuestionIndex]?.time || 30);
  }, [QuestionObj, currentQuestionIndex]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < QuestionObj.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setTimeLeft(QuestionObj[currentQuestionIndex + 1]?.time || 30);
    } else {
      setIsTestStarted(false);
    }
  };

  const handleAnswerChange = (answer: string) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = answer;
    setUserAnswers(updatedAnswers);
  };

  const handleSubmit = async () => {
    const quizData = { employeeInfo, JobId, answers: userAnswers, QuestionObj, jobData };
    try {
      const response = await fetch("https://yourserver.com/api/submit-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quizData),
      });
      if (!response.ok) throw new Error("Failed to submit quiz data");
      console.log("Quiz submitted successfully:", await response.json());
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  const currentQuestion = QuestionObj[currentQuestionIndex];

  return (
    <div className="p-4 max-w-md mx-auto flex flex-col justify-center h-screen">
      {employeeInfo && (
        <h2 className="text-xl font-bold mb-4">Welcome, {employeeInfo.fullName}!</h2>
      )}
      {isTestStarted ? (
        <>
          <h3 className="text-lg font-semibold mb-4">{currentQuestion?.content}</h3>
          
          {/* Render options based on question type */}
          {currentQuestion?.type === "multiple-choice" && (
            <div className="mb-4">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswerChange(option)}
                  variant={"myButton"}
                  className="min-w-80 w-full mb-2 transition-colors"
                >
                  {userAnswers[currentQuestionIndex] === option && <span className="mr-2">✓</span>}
                  {option}
                </Button>
              ))}
            </div>
          )}
          
          {currentQuestion?.type === "true-false" && (
            <div className="mb-4">
              {["True", "False"].map((option) => (
                <Button
                  key={option}
                  onClick={() => handleAnswerChange(option)}
                  variant={"myButton"}
                  className="min-w-80 w-full mb-2 transition-colors"
                >
                  {userAnswers[currentQuestionIndex] === option && <span className="mr-2">✓</span>}
                  {option}
                </Button>
              ))}
            </div>
          )}

          {currentQuestion?.type === "fill-up" && (
            <input
              type="text"
              onChange={(e) => handleAnswerChange(e.target.value)}
              className="border border-gray-300 p-2 rounded min-w-80 w-full mb-4"
              placeholder="Type your answer"
              value={userAnswers[currentQuestionIndex] || ""}
            />
          )}

          <div className="flex items-center justify-between">
            <p className="text-lg">Time left: {timeLeft !== null ? timeLeft : 0} seconds</p>
            <Button onClick={handleNextQuestion} variant={"myButton"}>Next</Button>
          </div>
        </>
      ) : (
        <div className="p-4 max-w-md mx-auto flex flex-col justify-center h-screen">
        <Summary
          employeeInfo={employeeInfo}
          jobData={jobData}
          QuestionObj={QuestionObj}
          userAnswers={userAnswers}
        />
      </div>
      )}
    </div>
  );
};

export default Test;