import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Task } from '../../dto/task.dto';
import { ListTasksService } from '../../services/list-tasks.service';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss'],
})
export class TaskPageComponent implements OnInit {
  public tasks?: Task[]         
  public show: boolean = false   
  public search = this.builder.group({ q: ''})
  constructor(private service: ListTasksService, private builder: FormBuilder) { }

  ngOnInit(): void {
    this.handleSearch()
  }
  private handleNext(tasks: Task[]){
    this.tasks = tasks
  }
  handleAddTask(task: Task){
    const currentTasks = this.tasks || []
    this.tasks = [task, ...currentTasks]
  }
  handleToggleForm(){
    this.show = !this.show
  }
  handleSearch(){
    this.service.listTask(this.search.value.q).subscribe({
      next: (response) => this.handleNext(response),
      error: () => this.tasks = []
    })
  }
}
