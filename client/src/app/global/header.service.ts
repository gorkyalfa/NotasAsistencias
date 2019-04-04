import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  headers: HttpHeaders;
  token: 'jwt';
  constructor() {}

  getSecurity(): HttpHeaders {
    if (this.headers == null) {
      this.headers = new HttpHeaders();
    }
    if (!this.headers.has('Content-Type')) {
      this.headers.append('Content-Type', 'application/json');
    }
    if (!this.headers.has('Authorization')) {
      this.headers.append('Authorization', 'Basic ' + sessionStorage.getItem(this.token));
    } else {
      this.headers.set('Authorization', 'Basic ' + sessionStorage.getItem(this.token));
    }
    return this.headers;
  }
}
