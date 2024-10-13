
import axios from "axios";
import { useEffect, useState } from "react";

import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { AboutModal } from "./Modal_editProfile";
import { Button } from "@/components/ui/button";  
import { capitalizeFirstLetter } from "@/hooks/FirstLetterCapital";


const RightProfile = () => {
  const [data, setData] = useState("");
 
  const Domain = import.meta.env.VITE_DOMAIN; 

  const id = localStorage.getItem("id");
  useEffect(() => {
    async function fetchData() {
      try {
        
        console.log(id)
        const res = await axios.get(`${Domain}/api/v1/blog/GetProfileData/${id}`);
        console.log(res.data)
        setData(res.data.UserData); // Ensure res.data.UserData has the correct structure
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } 

    if (id) {
      fetchData();
    }
  }, [id, Domain]); // Dependency array

  return (
    <div className="flex md:w-[40%] p-4 dark:bg-black bg-white">
      <div className="space-y-5 font-medium">
        <div className="rounded-full">
          <img className="rounded-full w-20 h-20" src="https://picsum.photos/400/400" alt="Profile picture" />
        </div>
        <div>
          <span className="text-lg">rksharma@gmail.com</span>
        </div>
        <Dialog>
            <DialogTrigger asChild>
              <Button variant={"link"} className="hover:text-green-500  text-green-700">Edit Profile</Button>
            </DialogTrigger>
            <AboutModal />
          </Dialog>
      </div>
    </div>
  );
};

export default RightProfile;