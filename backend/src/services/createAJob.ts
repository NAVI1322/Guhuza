import { prisma } from "../index";

interface QuestionData {
    type: string;
    time: number;
    content: string;
    options?: string[];
    correctAnswers?: string[];
}

export const createjob = async (JobName: string, questions: QuestionData[]) => {
    try {
        // Create the job along with the associated questions
        const response = await prisma.availableJob.create({
            data: {
                jobName: JobName,
                questions: {
                    create: questions.map((question) => ({
                        type: question.type,
                        content: question.content,
                        options: question.options || [], // Default to empty array if not provided
                        correctAnswers: question.correctAnswers || [], // Default to empty array if not provided
                    })),
                },
            },
        });

        console.log("Job and questions added successfully:", response);
        return response; // Optionally return the created job with questions
    } catch (error) {
        console.error("Error adding job:", error);
        throw new Error("Failed to add job");
    }
};



