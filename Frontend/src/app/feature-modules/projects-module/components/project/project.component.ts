import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../../../models/project';
import { MatDialog } from '@angular/material/dialog';
import { UpsertTaskDialogComponent } from '../upsert-task-dialog/upsert-task-dialog.component';
import { Task } from '../../../../models/task';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  @Input() project: Project = new Project();

  task: Task = new Task();

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UpsertTaskDialogComponent, {
      width: '250px',
      data: { task: this.task, project: this.project }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.task = result || new Task();
      this.project.tasks = [];
      this.project.tasks.push(result)
    });
  }

}
