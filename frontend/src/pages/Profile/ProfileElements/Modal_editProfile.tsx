
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UpdateEProfile } from "@/hooks/update_EProfile";
import { useState } from "react";


export function AboutModal() {
 

  const [firstName,SetfirstName] = useState("");
  const [lastName,SetlastName] = useState("");
  const [email,_]= useState("Navneet.Sharmaxdev@gmail.com")
  
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="firstName" className="text-right">
            First Name
          </Label>
          <Input
            id="firstName"
            className="col-span-3"
            value={firstName}
             onChange={(e) => SetfirstName(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="lastName" className="text-right">
            Last Name
          </Label>
          <Input
            id="lastName"
            className="col-span-3"
            value={lastName}
             onChange={(e) => SetlastName(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">
            Email
          </Label>
          <Input id="email" value="navneet.sharmaxdev@gmail.com" className="col-span-3" readOnly />
        </div>
      </div>
      <DialogFooter>
        <Button type="button" onClick={()=>{UpdateEProfile(firstName,lastName,email)}}>
          Save changes
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}