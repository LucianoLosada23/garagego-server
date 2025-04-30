import { Request , Response} from "express";
import Repuesto from "../models/Repuesto.model";

export const createReplacement = async (req: Request, res: Response) => {
  try {
    const replacement = new Repuesto(req.body);
    const savedReplacement = await replacement.save();
    res.status(201).json({ data: savedReplacement });
  }catch(error){
    console.error("Error creating replacement:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}