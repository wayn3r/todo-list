import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../dto/task.dto';
import { ListTasksService } from '../../services/list-tasks.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  @Input() public tasks?: Task[]
  public sortBy?: string
  public asc: boolean = true
  constructor() { }

  ngOnInit(): void {
  }
  handleSortBy(field:string){
    this.asc = this.sortBy !== field || !this.asc
    this.sortBy = field
    
    this.tasks = this.tasks?.sort((a: Task, b:Task) => {
      const first = a as any
      const second = b as any
      if(!first[field] || !second[field]){
        return 0
      }
      if(this.asc){
        return first[field] < second[field] ? -1 : 1
      }
      return first[field] > second[field] ? -1 : 1
    })
  }

}
