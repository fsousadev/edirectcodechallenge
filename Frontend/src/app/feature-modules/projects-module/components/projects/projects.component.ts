import { Component, OnInit } from '@angular/core';
import { Project } from '../../../../models/project';
import { ProjectsService } from '../../../../services/projects.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: Project[] = [];
  project: Project = new Project();
  isLoading: boolean = false;

  constructor(
    private projectsService: ProjectsService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.projectsService.getByUserId(null)
      .pipe(
        finalize(() => this.isLoading = false)
      ).subscribe(res => this.projects = res);
  }

  createProject() {
    this.projectsService.create(this.project).subscribe(res => {
      this.projects.push(res);
      this.project.projectname = null;
      this._snackBar.open("Project created with sucess!", "X", {
        duration: 5000,
        panelClass: ['green-snackbar']
      });
    }, err => {
      this._snackBar.open("Error creating Project!", "X", {
        duration: 5000,
        panelClass: ['red-snackbar']
      });
    })
  }

  updateProject(project: Project) {
    this.projectsService.update(project).subscribe(res => {
      this._snackBar.open("Project updated with sucess!", "X", {
        duration: 5000,
        panelClass: ['green-snackbar']
      });
    }, err => {
      this._snackBar.open("Error updating Project!", "X", {
        duration: 5000,
        panelClass: ['red-snackbar']
      });
    })
  }

  deleteProject(project: Project) {
    this.projectsService.update(project).subscribe(res => {
      this.projects.splice(this.projects.findIndex(item => item._id == project._id), 1);
      this._snackBar.open("Project deleted with sucess!", "X", {
        duration: 5000,
        panelClass: ['green-snackbar']
      });
    }, err => {
      this._snackBar.open("Error deleting Project!", "X", {
        duration: 5000,
        panelClass: ['red-snackbar']
      });
    });
  }
}
