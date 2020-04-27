import { EntityStatus } from './entity-status.enum';

export class Task {
  _id?: string;
  description: string;
  status: TaskStatus;
  startdate?: Date;
  enddate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  entitystatus?: EntityStatus;
  project_id?: string;

}

export enum TaskStatus {
  Todo = 'todo',
  Done = 'done'
}
