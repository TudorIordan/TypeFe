import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpGeneralService {
  url: string;

  constructor(public http: HttpClient) {
    this.url = environment.apiRoute;
  }

  post(endpoint: string, body: any) {
    return this.http.post(`${this.url + endpoint}`, body, {
      headers: this.getHttpHeaders(),
    });
  }

  get(endpoint: string) {
    return this.http.get(`${this.url + endpoint}`, {
      headers: this.getHttpHeaders(),
    });
  }

  getHttpHeaders() {
    return new HttpHeaders().set('key', 'value');
  }
}
