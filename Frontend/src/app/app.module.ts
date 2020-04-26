import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ProjectComponent } from './feature-modules/projects-module/components/project/project.component';
import { TaskComponent } from './feature-modules/projects-module/components/task/task.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ProjectsComponent } from './feature-modules/projects-module/components/projects/projects.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { UpsertTaskDialogComponent } from './feature-modules/projects-module/components/upsert-task-dialog/upsert-task-dialog.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
    TaskComponent,
    ProjectsComponent,
    UpsertTaskDialogComponent
  ],
  entryComponents: [UpsertTaskDialogComponent],
  imports: [
    FormsModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      //{ path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'projects', component: ProjectsComponent },
    ]),
    StoreModule.forRoot({
      //todos: TodoReducer,
      //user: UserReducer,
    }),
    EffectsModule.forRoot([/*TodoEffects*/]),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    }),
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
