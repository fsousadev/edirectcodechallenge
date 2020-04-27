import { Component, OnInit, Input, Output, EventEmitter, AfterViewChecked } from '@angular/core';
import { Project } from '../../../../models/project';
import { MatDialog } from '@angular/material/dialog';
import { UpsertTaskDialogComponent } from '../upsert-task-dialog/upsert-task-dialog.component';
import { Task, TaskStatus } from '../../../../models/task';
import { EntityStatus } from '../../../../models/entity-status.enum';
import { TasksService } from '../../../../services/tasks.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  @Input() project: Project = new Project();
  @Output() onDelete: EventEmitter<Project> = new EventEmitter<Project>();
  @Output() onUpdate: EventEmitter<Project> = new EventEmitter<Project>();

  task: Task = new Task();
  isInEditMode: boolean = false;

  constructor(
    public dialog: MatDialog,
    private tasksService: TasksService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    if (!this.project.tasks)
      this.project.tasks = [];
  }


  getTodoTasks(): Task[] {
    return this.project.tasks.filter(item => item.status == TaskStatus.Todo);
  }

  getDoneTasks(): Task[] {
    return this.project.tasks.filter(item => item.status == TaskStatus.Done);
  }

  openDialog(): void {
    this.task.project_id = this.project._id;
    const dialogRef = this.dialog.open(UpsertTaskDialogComponent, {
      width: '300px',
      data: { task: this.task }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.tasksService.create(result).subscribe(res => {
        this._snackBar.open("Task created with sucess!", "X", {
          duration: 5000,
          panelClass: ['green-snackbar']
        });
        this.project.tasks.push(res)
        this.task = new Task();
      }, err => {
        this._snackBar.open("Error creating Task!", "X", {
          duration: 5000,
          panelClass: ['red-snackbar']
        });
      });
    });
  }

  delete() {
    this.project.entitystatus = EntityStatus.Deleted;
    this.onDelete.emit(this.project);
  }

  edit() {
    this.onUpdate.emit(this.project);
    this.isInEditMode = false;
  }

  setIsInEditMode(y: boolean, x: HTMLInputElement) {
    this.isInEditMode = y;
    console.log(x);
    console.log(y);
  }

  updateTask(task: Task) {
    this.tasksService.update(task).subscribe(res => {
      this._snackBar.open("Task updated with sucess!", "X", {
        duration: 5000,
        panelClass: ['green-snackbar']
      });
      this.task = new Task();
    }, err => {
      this._snackBar.open("Error updating Task!", "X", {
        duration: 5000,
        panelClass: ['red-snackbar']
      });
    });
  }

  deleteTask(task: Task) {
    console.log("delete");
    this.tasksService.update(task).subscribe(res => {
      this._snackBar.open("Task deleted with sucess!", "X", {
        duration: 5000,
        panelClass: ['green-snackbar']
      });
      this.project.tasks.splice(this.project.tasks.findIndex(item => item._id == task._id), 1);
      this.task = new Task();
    }, err => {
      this._snackBar.open("Error deleting Task!", "X", {
        duration: 5000,
        panelClass: ['red-snackbar']
      });
    });
  }

}
