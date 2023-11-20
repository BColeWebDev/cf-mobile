import { IWorkouts } from "./IWorkouts";

export interface ITrainingDays {
  name: string;
  description: string;
  workouts: IWorkouts[];
  isCompleted: boolean;
}

export interface ITrainingDaysForm {
  name: string;
  description: string;
  day: string;
}
