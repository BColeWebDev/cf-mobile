import { IWorkouts } from "./IWorkouts";
import { ISets } from "./ISets";
import { IRoutine } from "./IRoutine";
/**  New Regiment
 * @prop {string} name Regiment Name
 * @prop {string} description Regiment Description
 * @prop {string} userid Current User ID
 */
export interface IRegiments {
  name: string;
  description: string;
  userid: string;
}

/**  New Regiment
 * @prop {string} _id Regiment Id
 * @prop {string} name Regiment Name
 * @prop {string} description Regiment Description
 * @prop {string} userid Current User ID
 * @prop {IRoutine[]} routines All regiment routines
 * @prop {boolean} isCompleted workout completed
 * @prop {string[]} days all workout days
 * @prop {boolean} sharable shared workout plan
 */
export interface RootRegiment {
  _id: string;
  name: string;
  description: string;
  userid: string;
  routines: IRoutine[];
  isCompleted: boolean;
  days: string[];
  sharables: boolean;
}
