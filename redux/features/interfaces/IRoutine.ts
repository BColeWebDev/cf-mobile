import { IWorkouts } from "./IWorkouts";

export interface IRoutine {
  description: string;
  name: string;
  day: string;
  workouts: IWorkouts[];
  primaryMuscleGroup: string[];
  secondaryMuscleGroup: string[];
  isCompleted: boolean;
  _id: string;
}
