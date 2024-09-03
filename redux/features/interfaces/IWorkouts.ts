import { ISets } from "./ISets";

export interface IWorkouts {
  restTime: string;
  name: string;
  equipment: string;
  muscle_target: string;
  bodyPart: string;
  gifUrl: string;
  id: string;
  sets: ISets[];
  _id: string;
}
