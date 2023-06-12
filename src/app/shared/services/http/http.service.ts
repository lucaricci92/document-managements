import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, concat, defer, finalize, Observable, ReplaySubject, throwError } from 'rxjs';
import { HttpClientOptions } from 'src/app/interfaces/http-client-options.interface';
import { LoadingService } from 'src/app/services/loading.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {

  get errors$() {
    return HttpService._errors$.asObservable();
  }

  protected static _errors$ = new ReplaySubject( 1 );
  private readonly url = 'http://localhost:3000';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    protected loadingService: LoadingService,
    private readonly httpClient: HttpClient
  ) {}

  get<T>( endpoint: string, options?: HttpClientOptions ): Observable<T> {
    return this.addStandardRequestsMiddleware<T>(
      this.httpClient.get.bind( this.httpClient ),
      options?.disableSpinner ?? false,
      `${this.url}/${endpoint}`,
      options
    );
  }

  delete<T>( endpoint: string ): Observable<T> {
    return this.addStandardRequestsMiddleware<T>(
      this.httpClient.delete.bind( this.httpClient ),
      false,
      `${this.url}/${endpoint}`
    );
  }

  patch<T>( endpoint: string, body: any | null, options?: HttpClientOptions ): Observable<T> {
    return this.addStandardRequestsMiddleware<T>(
      this.httpClient.patch.bind( this.httpClient ),
      options?.disableSpinner ?? false,
      `${this.url}${endpoint}`,
      body,
      options
    );
  }

  post<T>( endpoint: string, body: any | null, options?: HttpClientOptions ): Observable<T> {
    return this.addStandardRequestsMiddleware<T>(
      this.httpClient.post.bind( this.httpClient ),
      options?.disableSpinner ?? false,
      `${this.url}${endpoint}`,
      body,
      options
    );
  }

  put<T>( endpoint: string, body: any | null, options?: HttpClientOptions ): Observable<T> {
    return this.addStandardRequestsMiddleware<T>(
      this.httpClient.put.bind( this.httpClient ),
      options?.disableSpinner ?? false,
      `${this.url}${endpoint}`,
      body,
      options
    );
  }

  private addStandardRequestsMiddleware<T>( obs: ( ...args: any ) => Observable<T>, disableSpinner: boolean, ...args: any[] ): Observable<T> {
    return concat(
      defer( () => {
        if ( !disableSpinner ) this.loadingService.show();
        return obs( ...args );
      } )
    ).pipe(
      finalize( () => {
        if ( !disableSpinner ) this.loadingService.hide();
      } ),
      catchError( this.handleError.bind( this ) )
    );
  }

  private handleError( err: HttpErrorResponse ) {
    HttpService._errors$.next( err );
    return throwError( () => err );
  }
}
