import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {data} from './data';

@Injectable({
  providedIn: 'root'
})
export class ManageService {
  private myUrl = 'api/data';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient){}

  
  getRecords(): Observable<data[]> {
    return this.http.get<data[]>(this.myUrl)
      .pipe(
        tap(),
        catchError(this.handleError<data[]>('getRecords', []))
      );
  }

  getRecord(id: number): Observable<data> {
    const url = `${this.myUrl}/${id}`;
    return this.http.get<data>(url).pipe(
      tap(),
      catchError(this.handleError<data>(`getRecord id=${id}`))
    );
  }

  updateRecord(data: data): Observable<any> {
    return this.http.put(this.myUrl, data, this.httpOptions).pipe(
      tap(),
      catchError(this.handleError<any>('updateRecord'))
    );
  }

  addRecord(data: data): Observable<data> {
    return this.http.post<data>(this.myUrl, data, this.httpOptions).pipe(
      tap(),
      catchError(this.handleError<data>('addRecord'))
    );
  }

  deleteRecord(id: number): Observable<data> {
    const url = `${this.myUrl}/${id}`;
  
    return this.http.delete<data>(url, this.httpOptions).pipe(
      tap(),
      catchError(this.handleError<data>('deleteRecord'))
    );
  }

  searchRecords(term: string): Observable<data[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<data[]>(`${this.myUrl}/?name=${term}`).pipe(
      tap(),
      catchError(this.handleError<data[]>('searchRecordss', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}


