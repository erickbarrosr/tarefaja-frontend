import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  signUp(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/sign-up`, body);
  }
}
