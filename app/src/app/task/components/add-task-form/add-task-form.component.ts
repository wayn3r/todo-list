import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Task } from '../../dto/task.dto';
import { AddTaskService } from '../../services/add-task.service';

@Component({
  selector: 'app-add-task-form',
  templateUrl: './add-task-form.component.html',
  styleUrls: ['./add-task-form.component.scss']
})
export class AddTaskFormComponent implements OnInit {
  @Output() public onAddTask = new EventEmitter<Task>();
  private defaultTask: Task = {
    title:'',
    description: '',
    priority:'low',
    status:'open'
  }
  public form = this.builder.group(this.defaultTask);
  public errors:{message:string}[] = []
  constructor(
    private builder: FormBuilder, 
    private service: AddTaskService
  ) { }

  ngOnInit(): void {
  }
  handleSubmit(){
    this.errors = []
    this.service.addTask(this.form.value).subscribe({
      next: (task: Task) => this.handleSucces(task),
      error: (err: HttpErrorResponse) => this.errors = err.error
    })
  }
  private handleSucces(task:Task):void{
    this.form.reset(this.defaultTask)
    this.onAddTask.emit(task)
  }
}
