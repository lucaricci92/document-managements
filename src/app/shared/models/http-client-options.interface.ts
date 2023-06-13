import { HttpHeaders, HttpParams } from '@angular/common/http';

export interface HttpClientOptions {
  disableSpinner?: boolean,
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  observe?: 'body' | 'events' | 'response';
  params?: HttpParams | {
    [param: string]: string | string[];
  };
  reportProgress?: boolean;
  responseType?: 'json' | 'text' | 'blob';
  withCredentials?: boolean;
}
