
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
  getFile(fileId: string): Observable<any> {
    return this.http.get(`${this.url}${this.endoPoint}/${fileId}`);
  }
  updateFile(fileId: string | null, file: any): Observable<any> {
    return this.http.put(`${this.url}${this.endoPoint}/${fileId}`, file);
  }
  deleteFile(fileId: string | null | number): Observable<any> {
    return this.http.delete(`${this.url}${this.endoPoint}/${fileId}`);
  }
  createFile(file: any): Observable<any> {
    return this.http.post(`${this.url}${this.endoPoint}`, file);
  }
}
