import { Task } from './task';

export class Project {
  _id: string;
  projectname: string;
  createdAt: Date;
  updatedAt: Date;
  user_id: string;

  tasks: Task[] = [];
}
