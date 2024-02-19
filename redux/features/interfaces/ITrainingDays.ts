import { ISets } from "./ISets";
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

export interface IUpdateTrainingDaysForm {
  routineId: string;
  workoutId: string;
  regimentId: string;
  sets: ISets;
  restTime: string;
}
