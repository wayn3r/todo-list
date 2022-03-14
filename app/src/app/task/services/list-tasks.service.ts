import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListTasksService {
  private apiUrl:string = environment.api + '/task'
  constructor(private http:HttpClient) { }

  public listTask(q:string = ''): Observable<any>{
    
    return this.http.get(`${this.apiUrl}?q=${q}&sortBy=id`)
  }
}
