
import { TextareaForm } from "./ProfileElements/TextArea";
import Pro_NavBar from "./ProfileElements/NavBar";
import RightProfile from "./ProfileElements/Right_profile";



const AboutProfile = () => {


    return (
        <div className="container flex flex-col-reverse md:flex-row mx-auto w-[90%] lg:w-[80%] mt-16">
            <div className="w-full md:w-[60%] p-5 dark:bg-black bg-white  rounded-lg">
                <div className="flex justify-between items-center">
                    <div className="text-2xl md:text-5xl font-bold text-gray-800 dark:text-white">
                        Navneet Sharma
                    </div>
                </div>
                <div className="mt-6 md:mt-12">
                    <Pro_NavBar />
                </div>
                <div className="mt-6 md:mt-12">
                    <TextareaForm />
                </div>
            </div>
            <div className="w-full md:w-[40%] p-5 bg-white  dark:bg-black rounded-lg md:ml-5">
                <RightProfile />
            </div>
        </div>  
    );
}

export default AboutProfile;