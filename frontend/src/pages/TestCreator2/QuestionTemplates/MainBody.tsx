import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

const MainBody = () => {
    interface Question {
        id: string;
        type: string;
        time: number;
    }
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number | null>(null);
    const [showQuestionTypeSelection, setShowQuestionTypeSelection] = useState<boolean>(false);

    const addQuestion = (type: string) => {
        const newQuestion = {
            id: generateRandomId(),
            type: type,
            time: 30
        };
        const updatedQuestions = [...questions, newQuestion];
        setQuestions(updatedQuestions);
        setCurrentQuestionIndex(updatedQuestions.length - 1);
        setShowQuestionTypeSelection(false);
    };

    const removeQuestion = (id: string) => {
        setQuestions(questions.filter(question => question.id !== id));
        setCurrentQuestionIndex(null);
    };

    const generateRandomId = (): string => {
        const randomValues = new Uint8Array(16);
        window.crypto.getRandomValues(randomValues);
        return Array.from(randomValues, byte => byte.toString(16).padStart(2, '0')).join('');
    };

    const questionCode = (type: string, questionNumber: number) => {
        if (type === "MCQ") {
            return (
                <div className="self-start m-auto">
                    <div className="text-2xl mb-6">Question {questionNumber}</div>
                    <div className="max-w-2xl">This is an MCQ question.</div>
                    <div className="mb-2">Choose the correct option:</div>
                    <RadioGroup defaultValue="option-one">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="option-one" id="option-one" />
                            <label htmlFor="option-one">Option 1</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="option-two" id="option-two" />
                            <label htmlFor="option-two">Option 2</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="option-three" id="option-three" />
                            <label htmlFor="option-three">Option 3</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="option-four" id="option-four" />
                            <label htmlFor="option-four">Option 4</label>
                        </div>
                    </RadioGroup>
                </div>
            );
        }
        if (type === "Fill Up") {
            return (
                <div className="self-start m-auto">
                    <div className="text-2xl mb-6">Question {questionNumber}</div>
                    <div className="max-w-2xl">This is a Fill Up question.</div>
                    <input type="text" className="border p-2 w-full mt-2" placeholder="Type the answer here..." />
                </div>
            );
        }
        if (type === "True/False") {
            return (
                <div className="self-start m-auto">
                    <div className="text-2xl mb-6">Question {questionNumber}</div>
                    <div className="max-w-2xl">This is a True/False question.</div>
                    <div className="mb-2">Select True or False:</div>
                    <RadioGroup defaultValue="option-one">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="true" id="true" />
                            <label htmlFor="true">True</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="false" id="false" />
                            <label htmlFor="false">False</label>
                        </div>
                    </RadioGroup>
                </div>
            );
        }
    };

    const handleAddQuestionClick = () => {
        setShowQuestionTypeSelection(true);
        setCurrentQuestionIndex(null);
    };

    const navigateToPreviousQuestion = () => {
        if (currentQuestionIndex !== null && currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const navigateToNextQuestion = () => {
        if (currentQuestionIndex !== null && currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    return (
        <div className="flex justify-center overflow-y-hidden" style={{ height: 'calc(100vh - 65px)' }}>
            <div className="w-3/5 h-full gap-2">
                {!showQuestionTypeSelection && currentQuestionIndex === null && (
                    <Button variant={"myButton"} onClick={handleAddQuestionClick}>Add Question</Button>
                )}

                {showQuestionTypeSelection && (
                    <div>
                        <div>Choose a question type:</div>
                        <div className="flex gap-4">
                            <Button variant={"myButton"} onClick={() => addQuestion("MCQ")}>MCQ</Button>
                            <Button variant={"myButton"} onClick={() => addQuestion("Fill Up")}>Fill Up</Button>
                            <Button variant={"myButton"} onClick={() => addQuestion("True/False")}>True/False</Button>
                        </div>
                    </div>
                )}

                {currentQuestionIndex !== null && questions[currentQuestionIndex] && (
                    <div>
                        {questionCode(questions[currentQuestionIndex].type, currentQuestionIndex + 1)}
                        <div className="flex justify-end gap-4 mt-6">
                            <Button onClick={navigateToPreviousQuestion} disabled={currentQuestionIndex === 0}>Previous Question</Button>
                            <Button onClick={navigateToNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>Next Question</Button>
                            <Button onClick={handleAddQuestionClick}>Add Question</Button>
                        </div>
                    </div>
                )}
            </div>

            <div className="h-full border-l"></div>

            <div className="w-2/5 flex flex-col gap-6 mx-8 px-5 my-10 overflow-y-auto">
                <div className="sticky w-full">
                    <div>Select a question to get started</div>
                    <div className="flex justify-between">
                        <div>Questions: {questions.length}</div>
                        <div>Preview</div>
                    </div>
                </div>
                {questions.map((question, index) => (
                    <div key={index} className="flex justify-between">
                        <button
                            className="hover:underline text-left"
                            onClick={() => setCurrentQuestionIndex(index)}
                        >
                            Question {index + 1}
                        </button>
                        <span>{question.type}</span>
                        <Button variant={"myButton"} onClick={() => removeQuestion(question.id)}>Remove</Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MainBody;
