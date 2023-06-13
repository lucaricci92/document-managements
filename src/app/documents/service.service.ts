
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private url = 'http://localhost:3000';
  endoPoint = '/file';
  constructor(
    private http: HttpClient
  ) { }

  getFiles(): Observable<any> {
    return this.http.get(`${this.url}${this.endoPoint}`);
  }
}
