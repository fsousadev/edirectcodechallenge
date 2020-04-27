import { Task } from './task';
import { EntityStatus } from './entity-status.enum';

export class Project {
  _id?: string;
  projectname: string;
  createdAt?: Date;
  updatedAt?: Date;
  entitystatus?: EntityStatus;
  user_id?: string;

  tasks?: Task[] = [];
}

