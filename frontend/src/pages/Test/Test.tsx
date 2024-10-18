import React, { useState, useEffect } from 'react';

// Define an interface for the structure of a question
interface Question {
  id: string; // Unique identifier for the question
  type: string; // Type of question (MCQ, True/False, Fill Up)
  time: number; // Time allocated for answering the question
  content: string; // The question text
  options: string[]; // Options for MCQ or True/False questions
  correctAnswers: string[]; // Correct answers, represented as '1' (true) or '0' (false)
}

// Array of questions conforming to the Question interface
const questions: Question[] = [
  {
    id: '23f26e1b76c6adaed41ae927e4c7069a',
    type: 'MCQ',
    time: 10,
    content: 'Are you gay?',
    options: ['Yes', 'Ohh yess', '1st option', 'Again yes'],
    correctAnswers: ['0', '1', '0', '0'], // '1' indicates the second option is correct
  },
  {
    id: 'a02c2a2ec8fc86e16574c8ff2bc149b0',
    type: 'True/False',
    time: 10,
    content: 'Seriously, you are gay?',
    options: ['Yes','No'],
    correctAnswers: ['1','0'], // '1' indicates the first option is correct
  },
  {
    id: '4bbbf831bc0dae37e720f3fb95819d21',
    type: 'Fill Up',
    time: 10,
    content: 'When did you feel you are gay?',
    options: [], // No options for fill-up questions
    correctAnswers: ['from birth'], // Correct answer for fill-up
  },
];

// Functional component representing the quiz
const Test: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Tracks the index of the current question
  const [timeLeft, setTimeLeft] = useState(questions[0].time); // Time left for the current question
  const [correctCount, setCorrectCount] = useState(0); // Count of correct answers given by the user
  const [userAnswers, setUserAnswers] = useState<string[]>([]); // Array to store user's answers

  // Effect hook to manage the timer for each question
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer); // Stop the timer when it reaches 0
          handleNextQuestion(); // Move to the next question when time's up
          return 0; // Set time left to 0
        }
        return prev - 1; // Decrease time left by 1 second
      });
    }, 1000); // Timer interval set to 1 second

    // Cleanup function to clear the timer when the component unmounts or updates
    return () => clearInterval(timer);
  }, [currentQuestionIndex]); // Re-run effect when the current question index changes

  // Function to handle the answer submitted by the user
  const handleAnswer = (answer: string) => {
    setUserAnswers((prev) => [...prev, answer]); // Add the user's answer to the answers array
    // Check if the answer is correct
    if (questions[currentQuestionIndex].correctAnswers[parseInt(answer)] === '1') {
      setCorrectCount((prev) => prev + 1); // Increment correct count if the answer is correct
    }
    handleNextQuestion(); // Move to the next question
  };

  // Function to move to the next question or show results if it's the last question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1); // Increment question index to show the next question
      setTimeLeft(questions[currentQuestionIndex + 1].time); // Reset the time left for the next question
    } else {
      // Show results
      console.log(questions)
      alert(`Quiz Finished! Correct Answers: ${correctCount} / ${questions.length}`); // Display the result
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="p-6 rounded shadow-md w-80 ">
        {/* Display the current question number and content */}
        <h2 className="text-lg font-bold mb-4">Question {currentQuestionIndex + 1}: {questions[currentQuestionIndex].content}</h2>
        
        {/* Render options for MCQ or True/False questions */}
        {questions[currentQuestionIndex].options.length > 0 ? (
          questions[currentQuestionIndex].options.map((option, index) => (
            <button
              key={index}
              className="block w-full bg-blue-500 py-2 mb-2 rounded hover:bg-blue-600 transition-colors"
              onClick={() => handleAnswer(index.toString())} // Call handleAnswer with the selected option index
            >
              {option} {/* Display option text */}
            </button>
          ))
        ) : (
          // Render input for Fill Up questions
          <input
            type="text"
            className="border rounded p-2 w-full mb-2"
            placeholder="Type your answer" // Placeholder for user input
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAnswer((e.target as HTMLInputElement).value); // Call handleAnswer with the typed answer
                (e.target as HTMLInputElement).value = ''; // Clear the input after submission
              }
            }}
          />
        )}
        
        <div className="text-center mt-4">
          <div className="text-xl">{timeLeft}</div> {/* Display time left for answering the question */}
          <div className="text-sm">Time Left</div> {/* Label for time left */}
        </div>
      </div>
    </div>
  );
};

export default Test; // Export the Test component for use in other parts of the application
