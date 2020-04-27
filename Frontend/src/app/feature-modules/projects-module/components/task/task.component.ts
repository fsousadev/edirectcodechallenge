import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task, TaskStatus } from '../../../../models/task';
import { EntityStatus } from '../../../../models/entity-status.enum';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() task: Task = new Task();
  @Input() done: boolean = false;
  @Output() onDelete: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() onUpdate: EventEmitter<Task> = new EventEmitter<Task>();

  hover: boolean;
  now: Date = new Date();

  constructor() { }

  ngOnInit() {
    if (this.task.enddate) {
      this.task.enddate = new Date(this.task.enddate);
    }
  }

  update() {
    if (this.task.status == TaskStatus.Todo) {
      this.task.status = TaskStatus.Done;
    } else if (this.task.status == TaskStatus.Done) {
      this.task.status = TaskStatus.Todo;
    }
    this.onUpdate.emit(this.task);
  }

  delete() {
    this.task.entitystatus = EntityStatus.Deleted;
    this.onDelete.emit(this.task);
  }

}
