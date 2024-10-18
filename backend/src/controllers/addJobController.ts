import { createjob } from "../services/createAJob";
import { Request, Response } from 'express';

export const AddJob = async (req: Request, res: Response): Promise<void> => {
    const { JobName, questions}:any = req.body;
  
    try {
      const updateResult = await createjob(JobName,questions); // Renamed to updateResult to avoid conflict
  
      res.status(200).json({ message: 'Employee Profile Updated successfully', data: updateResult });
      return;
    } catch (e) {
      console.error("Error updating employee profile:", e);
      res.status(500).json({ error: 'An error occurred while updating the employee profile' });
    }
  };
