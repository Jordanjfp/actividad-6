
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = 'https://peticiones.online/api/users';

  constructor(private httpClient: HttpClient) {}

  
  getUsers(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl).pipe(
      map(response => response.results), 
      catchError(this.handleError)
    );
  }

  
  getUser(id: number): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl).pipe(
      map(response => {
        const user = response.results.find((user: any) => user.id === id);
        if (user) {
          return user;
        } else {
          throw new Error('Usuario no encontrado');
        }
      }),
      catchError(this.handleError)
    );
  }

  
  createUser(user: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl, user).pipe(
      catchError(this.handleError)
    );
  }

  
  updateUser(id: number, user: any): Observable<any> {
    return this.httpClient.put<any>(`${this.baseUrl}/${id}`, user).pipe(
      catchError(this.handleError)
    );
  }

  
  deleteUser(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Error del cliente o red:', error.error.message);
    } else {
      console.error(`Backend devolvió el código ${error.status}, el body: ${error.error}`);
    }
    return throwError('Algo salió mal; inténtelo nuevamente más tarde.');
  }
}




