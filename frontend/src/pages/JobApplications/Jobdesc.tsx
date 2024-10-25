import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, MapPin, CheckCircle, ClipboardList, Star, Gift } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";

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

const JobDescriptionPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [employeeInfo, setEmployeeInfo] = useState({ fullName: "", email: "", phoneNumber: "", coverLetter: "" });
    
    const location = useLocation();
    const navigate = useNavigate();

    const job = location.state?.selectedJob;
    if (!job) return <div>Access Denied</div>;

    const jobData = location.state?.selectedJob.jobDescription as JobDescriptionProps;
    const jobId = location.state?.selectedJob.id;
    const QuestionObj = job.questions;

    console.log(employeeInfo)

    const handleNextStepClickEvent = () => {
        if (QuestionObj && jobId) {
            navigate('/Test', { state: { QuestionObj, jobId, employeeInfo ,jobData}});
        } else {
            alert("Invalid job data");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEmployeeInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
    };

    const sanitize = (content: string) => DOMPurify.sanitize(content);

    return (
        <div className="container mx-auto px-4 py-10 bg-gradient-to-b from-gray-100 to-white min-h-screen">
            <Card className="max-w-5xl mx-auto bg-white shadow-md rounded border border-gray-300">
                <CardHeader className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-blue-100 to-white">
                    <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <Briefcase className="w-6 h-6 text-blue-600" /> {sanitize(jobData.jobName)}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-600 flex items-center gap-1 mt-2">
                        <MapPin className="w-4 h-4" /> {sanitize(jobData.location)} • Posted on {new Date(jobData.createdAt).toLocaleDateString()}
                    </CardDescription>
                </CardHeader>

                <CardContent className="px-8 py-6 space-y-8">
                    {/* Display additional job details */}
                    <section>
                        <h2 className="text-lg font-semibold text-blue-600">Job Description</h2>
                        <p className="text-gray-700">{sanitize(jobData.description)}</p>
                    </section>
                    <section>
                        <h2 className="text-lg font-semibold text-blue-600">Benefits</h2>
                        <p className="text-gray-700">{sanitize(jobData.benefits)}</p>
                    </section>
                    <section>
                        <h2 className="text-lg font-semibold text-blue-600">Our Values</h2>
                        <p className="text-gray-700">{sanitize(jobData.ourValues)}</p>
                    </section>
                    <section>
                        <h2 className="text-lg font-semibold text-blue-600">Position Summary</h2>
                        <p className="text-gray-700">{sanitize(jobData.positionSummary)}</p>
                    </section>
                    <section>
                        <h2 className="text-lg font-semibold text-blue-600">Position Responsibilities</h2>
                        <p className="text-gray-700">{sanitize(jobData.positionResponsibilities)}</p>
                    </section>
                    <section>
                        <h2 className="text-lg font-semibold text-blue-600">Skills Required</h2>
                        <p className="text-gray-700">{sanitize(jobData.skills)}</p>
                    </section>
                    <section>
                        <h2 className="text-lg font-semibold text-blue-600">Why Work With Us</h2>
                        <p className="text-gray-700">{sanitize(jobData.whyWorkWithUs)}</p>
                    </section>

                    {/* Apply button to open modal */}
                    <div className="flex justify-center mt-10">
                        <Button 
                            onClick={() => setIsModalOpen(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-12 rounded-lg transition duration-200 shadow-md transform hover:scale-105"
                        >
                            Apply Now
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white max-w-lg w-full rounded-lg shadow-lg p-6 relative">
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl font-bold"
                        >
                            &times;
                        </button>
                        <CardTitle className="text-xl font-semibold text-gray-800 mb-4">Apply for {sanitize(jobData.jobName)}</CardTitle>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-gray-700">Full Name</label>
                                <Input type="text" name="fullName" placeholder="Your Name" value={employeeInfo.fullName} onChange={handleInputChange} required />
                            </div>
                            <div>
                                <label className="block text-gray-700">Email</label>
                                <Input type="email" name="email" placeholder="Your Email" value={employeeInfo.email} onChange={handleInputChange} required />
                            </div>
                            <div>
                                <label className="block text-gray-700">Phone Number</label>
                                <Input type="tel" name="phoneNumber" placeholder="Your Phone Number" value={employeeInfo.phoneNumber} onChange={handleInputChange} required />
                            </div>
                            <div>
                                <label className="block text-gray-700">Cover Letter</label>
                                <Textarea name="coverLetter" placeholder="Write a short cover letter" rows={4} value={employeeInfo.coverLetter} onChange={handleInputChange} />
                            </div>
                            <div className="flex justify-end mt-4">
                                <Button 
                                    type="button" 
                                    onClick={handleNextStepClickEvent}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-8 rounded-md transition duration-200"
                                >
                                   Next Step
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobDescriptionPage;