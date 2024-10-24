import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from '../../data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginService {

  private apiUrl : String = "";  
  constructor(
    private http: HttpClient,
    private dataService : DataService
  ) {
    this.apiUrl = dataService.url();
  }

  updateData(data:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const body = data;

    return this.http.post(`${this.apiUrl}users/update`, body, { headers });
  }

}

