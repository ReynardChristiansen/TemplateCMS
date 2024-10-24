import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { DataService } from '../../data.service.js';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class MasterUsersService {

  private apiUrl : String = "";
  constructor(
    private http: HttpClient, 
    private dataService: DataService
  ) {
    this.apiUrl = dataService.url();

  }

  getData(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get<any>(`${this.apiUrl}users/getusers`, httpOptions)
      .pipe(
        catchError(this.handleError('getData', []))
      );
  }

  stsupdt(index:String): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = {
      index: index,
    };

    return this.http.post(`${this.apiUrl}users/stsupdt`, body, { headers });
  }
  addNewData(databaru:any): Observable<any> {
    const headers =  new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = databaru

    return this.http.post<any>(`${this.apiUrl}users/addnew`, body, { headers })
      .pipe(
        catchError(this.handleError('getData', []))
      );
  }

  getDataById(index:String){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = {
      index: index,
    };

    return this.http.post(`${this.apiUrl}users/getdatabyid`, body, { headers });
  }

  updateData(data:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const body = data;

    return this.http.post(`${this.apiUrl}users/update`, body, { headers });
  }

  // updateData(data:any){
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization' : 'T3MPL4T3CMS'
  //   });
  //   const body = {
  //     body : btoa(data),
  //     signature: this.SHA1((`${data}T3MPL4T3CMS`))
  //   }

  //   return this.http.post(`${this.apiUrl}users/getdatabyid`, body, { headers });
  // }

  private SHA1(data:any){
    return CryptoJS.SHA1(data);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      // Handle error more specifically, e.g., display error message, retry request
      return of(result as T);
    };
  }
}