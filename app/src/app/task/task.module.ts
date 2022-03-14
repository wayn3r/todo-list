import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './components/task/task.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { AddTaskFormComponent } from './components/add-task-form/add-task-form.component';
import { TaskPageComponent } from './components/task-page/task-page.component';


@NgModule({
  
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    TaskComponent,
    TaskListComponent,
    AddTaskFormComponent,
    TaskPageComponent
  ],
  providers:[],
  exports: [TaskPageComponent],
})
export class TaskModule { }
