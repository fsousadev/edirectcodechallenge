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

  task: Task = new Task();
  //now: Date = new Date();

  constructor(
    public dialogRef: MatDialogRef<UpsertTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.task = this.data.task;
    //this.task.startdate = new Date();
  }

  ngOnInit() {
    console.log(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
