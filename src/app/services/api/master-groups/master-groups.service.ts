import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { DataService } from '../../data.service';



@Injectable({
  providedIn: 'root'
})
export class MasterGroupsService {
  private apiUrl : String = "";  
  constructor(
    private http: HttpClient,
    private dataService : DataService
  ) {
    this.apiUrl = dataService.url();
  }

  getData(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get<any>(`${this.apiUrl}groups/getallgroup`, httpOptions)
      .pipe(
        catchError(this.handleError('getData', []))
      );
  }

  getDataGroupMenu(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get<any>(`${this.apiUrl}groups/getallGroupMenu`, httpOptions)
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

    return this.http.post(`${this.apiUrl}groups/getdatabyid`, body, { headers });
  }

  updateData(data:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const body = data;

    return this.http.post(`${this.apiUrl}groups/update`, body, { headers });
  }

  deleteData(data:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const body = data;

    return this.http.post(`${this.apiUrl}groups/delete`, body, { headers });
  }
  
  addNewData(databaru:any): Observable<any> {
    const headers =  new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = databaru

    return this.http.post<any>(`${this.apiUrl}groups/addnew`, body, { headers })
      .pipe(
        catchError(this.handleError('getData', []))
      );
  }

  

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
