import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Toast } from "@/components/majorComponents/toast";

const MainBody = () => {
    interface Question {
        id: string;
        type: string;
        time: number;
        content: string;
        options?: string[];
        correctAnswers?: (string | number)[];
    }

    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number | null>(null);
    const [showQuestionTypeSelection, setShowQuestionTypeSelection] = useState<boolean>(false);

    const addQuestion = (type: string) => {
        const newQuestion: Question = {
            id: generateRandomId(),
            type: type,
            time: 30,
            content: "",
            options: type === "MCQ" ? [""] : [],
            correctAnswers: type === "Fill Up" ? [""] : [],
        };
        const updatedQuestions = [...questions, newQuestion];
        setQuestions(updatedQuestions);
        setCurrentQuestionIndex(updatedQuestions.length - 1);
        setShowQuestionTypeSelection(false);
    };

    const removeQuestion = (id: string) => {
        const updatedQuestions = questions.filter(question => question.id !== id);
        setQuestions(updatedQuestions);

        // Update currentQuestionIndex
        if (currentQuestionIndex !== null) {
            const newIndex = updatedQuestions.length === 0 ? null : Math.min(currentQuestionIndex, updatedQuestions.length - 1);
            setCurrentQuestionIndex(newIndex);
        }
    };

    const generateRandomId = (): string => {
        const randomValues = new Uint8Array(16);
        window.crypto.getRandomValues(randomValues);
        return Array.from(randomValues, byte => byte.toString(16).padStart(2, '0')).join('');
    };

    const handleQuestionContentChange = (content: string) => {
        if (currentQuestionIndex !== null) {
            const updatedQuestions = [...questions];
            updatedQuestions[currentQuestionIndex].content = content;
            setQuestions(updatedQuestions);
        }
    };

    const handleOptionChange = (optionIndex: number, value: string) => {
        if (currentQuestionIndex !== null && questions[currentQuestionIndex].options) {
            const updatedQuestions = [...questions];
            updatedQuestions[currentQuestionIndex].options![optionIndex] = value;
            setQuestions(updatedQuestions);
        }
    };

    const addOption = () => {
        if (currentQuestionIndex !== null) {
            const updatedQuestions = [...questions];
            updatedQuestions[currentQuestionIndex].options?.push("");
            setQuestions(updatedQuestions);
        }
    };

    const removeOption = (optionIndex: number) => {
        if (currentQuestionIndex !== null && questions[currentQuestionIndex].options) {
            const updatedQuestions = [...questions];
            updatedQuestions[currentQuestionIndex].options?.splice(optionIndex, 1);
            setQuestions(updatedQuestions);
        }
    };

    const handleCorrectAnswerChange = (answerIndex: number, value: string) => {
        if (currentQuestionIndex !== null) {
            const updatedQuestions = [...questions];
            if (!updatedQuestions[currentQuestionIndex].correctAnswers) {
                updatedQuestions[currentQuestionIndex].correctAnswers = [];
            }
            updatedQuestions[currentQuestionIndex].correctAnswers[answerIndex] = value;
            setQuestions(updatedQuestions);
        }
    };

    const nextQuestion = () => {
        if (currentQuestionIndex !== null) {
            if (currentQuestionIndex === questions.length - 1) {
                setCurrentQuestionIndex(null);
                setShowQuestionTypeSelection(true);
            } else {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            }
        }
    };

    const goToPreviousQuestion = () => {
        if (currentQuestionIndex !== null && currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const renderQuestion = (type: string, questionNumber: number) => {
        switch (type) {
            case "MCQ":
                return (
                    <div className="self-start m-auto p-4 border rounded-lg shadow-lg">
                        <div className="text-2xl mb-6">Question {questionNumber}</div>
                        <textarea
                            className="border p-2 w-full mb-4 rounded-md"
                            placeholder="Enter your question here..."
                            value={questions[currentQuestionIndex!].content}
                            onChange={(e) => handleQuestionContentChange(e.target.value)}
                        />
                        <div className="mb-2">Options:</div>
                        {questions[currentQuestionIndex!].options?.map((option, optionIndex) => (
                            <div key={optionIndex} className="flex items-center space-x-2 mb-2">
                                <Checkbox
                                    checked={questions[currentQuestionIndex!].correctAnswers?.includes(optionIndex.toString())}
                                    onCheckedChange={(checked) => handleCorrectAnswerChange(optionIndex, checked ? optionIndex.toString() : "")}
                                />
                                <input
                                    type="text"
                                    className="border p-2 w-full rounded-md"
                                    placeholder={`Option ${optionIndex + 1}`}
                                    value={option}
                                    onChange={(e) => handleOptionChange(optionIndex, e.target.value)}
                                />
                                <Button onClick={() => removeOption(optionIndex)}>Remove</Button>
                            </div>
                        ))}
                        <Button onClick={addOption} className="mt-2">Add Option</Button>
                    </div>
                );
            case "Fill Up":
                return (
                    <div className="self-start m-auto p-4 border rounded-lg shadow-lg">
                        <div className="text-2xl mb-6">Question {questionNumber}</div>
                        <textarea
                            className="border p-2 w-full mb-4 rounded-md"
                            placeholder="Enter your question here..."
                            value={questions[currentQuestionIndex!].content}
                            onChange={(e) => handleQuestionContentChange(e.target.value)}
                        />
                        <div className="mb-2">Correct Answer:</div>
                        <input
                            type="text"
                            className="border p-2 w-full rounded-md"
                            placeholder="Type the correct answer here..."
                            value={questions[currentQuestionIndex!].correctAnswers?.[0] || ""}
                            onChange={(e) => handleCorrectAnswerChange(0, e.target.value)}
                        />
                    </div>
                );
            case "True/False":
                return (
                    <div className="self-start m-auto p-4 border rounded-lg shadow-lg">
                        <div className="text-2xl mb-6">Question {questionNumber}</div>
                        <textarea
                            className="border p-2 w-full mb-4 rounded-md"
                            placeholder="Enter your question here..."
                            value={questions[currentQuestionIndex!].content}
                            onChange={(e) => handleQuestionContentChange(e.target.value)}
                        />
                        <div className="mb-2">Correct Answer:</div>
                        <RadioGroup
                            defaultValue={questions[currentQuestionIndex!].correctAnswers?.[0] as string || "true"}
                            onValueChange={(value) => handleCorrectAnswerChange(0, value)}
                        >
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
            default:
                return null;
        }
    };

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <div className="w-1/4 p-4 border-r">
                <h2 className="text-lg font-semibold mb-4">Question Tally</h2>
                <div className="space-y-2">
                    {questions.map((question, index) => (
                        <div key={question.id} className="flex justify-between items-center p-2 border rounded-md cursor-pointer" onClick={() => setCurrentQuestionIndex(index)}>
                            <span>Question {index + 1}</span>
                            <Button onClick={() => removeQuestion(question.id)} className="text-red-600">Remove</Button>
                        </div>
                    ))}
                </div>
                <Button variant={"myButton"} onClick={() => setShowQuestionTypeSelection(true)} className="mt-4 w-full">Add Question</Button>
            </div>

            {/* Main Content */}
            <div className="w-3/4 h-full p-4">
                {showQuestionTypeSelection && (
                    <div className="p-4 border rounded-lg shadow-lg mb-4">
                        <div>Choose a question type:</div>
                        <div className="flex gap-4 mt-2">
                            <Button variant={"myButton"} onClick={() => addQuestion("MCQ")}>MCQ</Button>
                            <Button variant={"myButton"} onClick={() => addQuestion("Fill Up")}>Fill Up</Button>
                            <Button variant={"myButton"} onClick={() => addQuestion("True/False")}>True/False</Button>
                        </div>
                    </div>
                )}

                {currentQuestionIndex !== null && questions.length > 0 && renderQuestion(questions[currentQuestionIndex].type, currentQuestionIndex + 1)}

                <div className="mt-4">
                    <Button onClick={goToPreviousQuestion} disabled={currentQuestionIndex === null || currentQuestionIndex === 0} className="mr-2">Previous</Button>
                    <Button onClick={nextQuestion} disabled={currentQuestionIndex === null || currentQuestionIndex === questions.length - 1}>Next</Button>
                </div>
            </div>
        </div>
    );
};

export default MainBody;
