import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { time } from 'console';
import { type } from 'os';
import { join } from 'path';
import { map } from 'zod';

const questions = [
  {
    id: "4b870978428b84cc866cecc54acfb077",
    type: "MCQ",
    time: 30,
    content: "What is the capital of France?",
    options: [
      "France",
      "Paris",
      "London",
      "Something else"
    ],
    correctAnswers: [
      "0", // Correct option is Paris
      "1", // Correct option is Paris
    ]
  },
  {
    id: "4b870978428b84cc866cecc54acfb077",
    type: "MCQ",
    time: 30,
    content: "What is the capital of France?",
    options: [
      "France",
      "Paris",
      "London",
      "Something else"
    ],
    correctAnswers: [
      "0", // Correct option is Paris
      "3", // Correct option is Paris
    ]
  },
  {
    id: "3b870978428b84cc866cecc54acfb077",
    type: "MCQ",
    time: 30,
    content: "What is the capital of Germany?",
    options: [
      "France",
      "Berlin",
      "London",
      "Something else"
    ],
    correctAnswers: [
      "1", // Correct option is Berlin
    ]
  },
  {
    id: "a873cd0bd3d9f7369bcd88c6aa39e495",
    type: "Fill Up",
    time: 30,
    content: "East or west?",
    options: [],
    correctAnswers: [
      "west"
    ]
  },
  {
    id: "44f64ecb3b93efc4105edaea5c9effc8",
    type: "True/False",
    time: 30,
    content: "Why is the sky blue?",
    options: [],
    correctAnswers: [
      "true"
    ]
  }
];

const Test = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isTestStarted && timeLeft !== null && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => (prev! - 1));
      }, 1000);
    } else if (timeLeft === 0) {
      handleNextQuestion();
    }

    return () => clearInterval(timer);
  }, [isTestStarted, timeLeft]);

  const startTest = () => {
    setIsTestStarted(true);
    setTimeLeft(questions[currentQuestionIndex].time);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setTimeLeft(questions[nextIndex].time);
    } else {
      calculateScore();
    }
  };

  const handleAnswerChange = (answer: string) => {
    const currentQuestion = questions[currentQuestionIndex];

    if (currentQuestion.type === "MCQ") {
      const newAnswers = [...userAnswers];

      // If it is a single correct answer question
      if (currentQuestion.correctAnswers.length === 1) {
        newAnswers[currentQuestionIndex] = answer; // Select only one option
      } else {
        // If it is a multiple correct answer question
        if (newAnswers[currentQuestionIndex]) {
          const selectedAnswers = newAnswers[currentQuestionIndex].split(','); // Split existing answers

          if (selectedAnswers.includes(answer)) {
            // Deselect if already selected
            newAnswers[currentQuestionIndex] = selectedAnswers.filter(ans => ans !== answer).join(',');
          } else {
            selectedAnswers.push(answer); // Add new selection
            newAnswers[currentQuestionIndex] = selectedAnswers.join(','); // Join back to string
          }
        } else {
          newAnswers[currentQuestionIndex] = answer; // Initialize with the first selection
        }
      }

      setUserAnswers(newAnswers);
    } else {
      const newAnswers = [...userAnswers];
      newAnswers[currentQuestionIndex] = answer;
      setUserAnswers(newAnswers);
    }
  };

  const calculateScore = () => {
    let totalScore = 0;

    questions.forEach((question, index) => {
      const userAnswer = userAnswers[index];
      const correctAnswers = question.correctAnswers;

      if (question.type === "MCQ") {
        const userAnswerArray = userAnswer ? userAnswer.split(',') : [];
        if (userAnswerArray.length === correctAnswers.length && userAnswerArray.every(answer => correctAnswers.includes(answer))) {
          totalScore++;
        }
      } else if (question.type === "Fill Up" && userAnswer?.toLowerCase() === correctAnswers[0]?.toLowerCase()) {
        totalScore++;
      } else if (question.type === "True/False" && userAnswer === correctAnswers[0]) {
        totalScore++;
      }
    });

    setScore(totalScore);
    setIsTestStarted(false);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const isSingleCorrect = currentQuestion.correctAnswers.filter(ans => ans !== "").length === 1;

  return (
    // <div className=" w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
    //   {/* Radial gradient for the container to give a faded look */}
    //   <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
    <div className=" p-4 max-w-md mx-auto flex flex-col justify-center h-screen">
      {isTestStarted ? (
        <>
          <h2 className="text-xl font-bold mb-4">{currentQuestion.content}</h2>
          {currentQuestion.type === "MCQ" && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">{isSingleCorrect ? 'Single Correct' : 'Multiple Correct'}</h3>
              {currentQuestion.options.map((option, index) => {
                const isSelected = userAnswers[currentQuestionIndex]?.split(',').includes(index.toString());
                return (
                  <Button
                    key={index}
                    onClick={() => handleAnswerChange(index.toString())}
                    variant={"myButton"}
                    className={` min-w-80 w-full mb-2 transition-colors`}
                  >
                    {isSelected && <span className="mr-2">✓</span>}
                    {option}
                  </Button>
                );
              })}
            </div>
          )}
          {currentQuestion.type === "Fill Up" && (
            <input
              type="text"
              onChange={(e) => handleAnswerChange(e.target.value)}
              className="border border-gray-300 p-2 rounded  min-w-80 w-full mb-4"
              placeholder="Type your answer"
            />
          )}
          {currentQuestion.type === "True/False" && (
            <div className="mb-4">
              <Button
                onClick={() => handleAnswerChange("true")}
                variant={"myButton"}
                className={` min-w-80 w-full mb-2 transition-colors`}
              >
                {userAnswers[currentQuestionIndex] === "true" && <span className="mr-2">✓</span>}
                True
              </Button>
              <Button
                onClick={() => handleAnswerChange("false")}
                variant={"myButton"}
                className={` min-w-80 w-full mb-2 transition-colors`}
              >
                {userAnswers[currentQuestionIndex] === "false" && <span className="mr-2">✓</span>}
                False
              </Button>
            </div>
          )}
          <div className="flex items-center justify-between">
            <p className="text-lg">Time left: {timeLeft !== null ? timeLeft : 0} seconds</p>
            <Button onClick={handleNextQuestion} variant={"myButton"}>Next</Button>
          </div>
        </>
      ) : (
        <>
          {score !== null && (
            <h3 className="mt-4">Your Score: {score} / {questions.length}</h3>
          )}
          {!isTestStarted && score === null && (
            <Button onClick={startTest} variant={"myButton"} className='self-center'>Start Test</Button>
          )}
        </>
      )}
    </div>
    // </div>
  );
};

export default Test;

