import { Observable } from 'rxjs'
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../dto/task.dto';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AddTaskService {
  private apiUrl:string = environment.api + '/task'
  constructor(private http:HttpClient) { }

  public addTask(task: Task): Observable<any>{
    return this.http.post(this.apiUrl, task)
  }
}
