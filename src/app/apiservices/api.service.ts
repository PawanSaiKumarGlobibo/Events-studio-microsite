import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  apiUrl = environment.apiUrl;


  constructor(private http: HttpClient,) { }

  getData(pathUrl: string, params: any): Observable<any> {
    let httpParams = new HttpParams();
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        httpParams = httpParams.append(key, params[key]);
      }
    }
    console.log(this.apiUrl + pathUrl, { params: httpParams });
    return this.http.get(this.apiUrl + pathUrl, { params: httpParams }).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error: any) => {
        console.error('An error occurred while fetching event configurations:', error);
        const err = new Error('Something went wrong. Please try again later.');
        return throwError(() => err);
      })
    );
  }

  postData(pathUrl: string, postData: any): Observable<any> {
    return this.http.post(this.apiUrl + pathUrl, postData).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error: any) => {
        console.error('An error occurred while fetching event configurations:', error);
        const err = new Error('Something went wrong. Please try again later.');
        return throwError(() => err);
      })
    );
  }
}

