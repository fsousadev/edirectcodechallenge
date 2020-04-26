import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from '../../../../models/project';
import { Task } from '../../../../models/task';

@Component({
  selector: 'app-upsert-task-dialog',
  templateUrl: './upsert-task-dialog.component.html',
  styleUrls: ['./upsert-task-dialog.component.css']
})
export class UpsertTaskDialogComponent implements OnInit {

  project: Project = new Project();
  task: Task = new Task();

  constructor(
    public dialogRef: MatDialogRef<UpsertTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.project = this.data.project;
    this.task = this.data.task;
  }

  ngOnInit() {
    console.log(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
