
import Pro_NavBar from "./ProfileElements/NavBar";
import Rightprofile from "./ProfileElements/Right_profile";
import { Button } from "../../components/ui/button";


const ProfilePage = () => {

 return (
        <div className="flex md:flex-row flex-col-reverse mx-auto w-[80%] mt-16">
            
            <div className="w-full md:w-[60%] py-5 ">
                <div className="flex justify-between items-center">
                    <div className="text-2xl md:text-5xl font-bold">
                        Navneet Sharma
                    </div>
                   
                </div>
                <div className="mt-6 md:mt-12">
                    <Pro_NavBar />
                </div>
                <div className="mt-6 md:mt-12">
                    <div className="space-x-5 flex mt-8">
                        <Button variant="outline">Archieves</Button>
                        <Button variant="ghost">History</Button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                        {/* Add your post items here */}
                    </div>
                </div>
            </div>
            <div className="w-full md:w-[30%] py-5">
                <Rightprofile />
            </div>

        </div>
    );
}

export default ProfilePage;