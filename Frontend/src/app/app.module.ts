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
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UpsertProjectDialogComponent } from './feature-modules/projects-module/components/upsert-project-dialog/upsert-project-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthComponent } from './shared/auth/auth.component';
import { HeaderComponent } from './shared/header/header.component';
import { CallbackComponent } from './shared/auth/callback/callback.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
    TaskComponent,
    ProjectsComponent,
    UpsertTaskDialogComponent,
    UpsertProjectDialogComponent,
    AuthComponent,
    HeaderComponent,
    CallbackComponent
  ],
  entryComponents: [UpsertTaskDialogComponent],
  imports: [
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatSnackBarModule,
    FormsModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: AuthComponent, pathMatch: 'full' },
      { path: 'projects', component: ProjectsComponent },
      { path: 'auth', component: AuthComponent },
      { path: 'callback', component: CallbackComponent },
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
