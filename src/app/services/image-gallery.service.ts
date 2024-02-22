import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ImageGalleryService {
  private apiUrl = 'https://api.unsplash.com';

  /*------------------Http Header Options -------------------*/
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getPhotos(): Observable<any> {
    const clientId = '70k60UjDeQcxIiZDswNPRfjnNksD-3gA90AQX-y_hSM';
    return this.httpClient.get(`${this.apiUrl}/photos/?client_id=${clientId}`)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  // Add methods for other API calls as needed

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
