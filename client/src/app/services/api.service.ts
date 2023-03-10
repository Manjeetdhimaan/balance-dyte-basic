import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  //HttpMethods

  postEmail(emailBody: any) {
    return this.http.post(environment.apiBaseUrl + '/send-mail', emailBody);
  }
}
