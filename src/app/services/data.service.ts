import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() {}
  private dataArray: any;
  private apiUrl = 'http://127.0.0.1:8080/';
  private bambang : any;

  setData(data: any) {
    this.dataArray = data;
  }

  getData(): any {
    return this.dataArray;
  }

  url(): any{
    return this.apiUrl;
  }

  // getDataUsers(): any {
  //   // this.bambang = this.http.get<any>(`${this.apiUrl}/users/getusers`)
  //   return this.dataArray
  // }
}
