import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { throwError } from 'rxjs';

let httpGetOptions:Object = {
  // headers: new HttpHeaders({
  //   'Content-Type':'application/json;charset=UTF-8',
  // })
};

let httpPostOptions:Object = {
  // headers: new HttpHeaders({
  //   'Content-Type':'application/json;charset=UTF-8',
  // })
};


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public http;

  constructor(Http: HttpClient) {
    this.http = Http;
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };




  public get<Void>(url: String, params?: Object, options?: Object) {
    let httpParams = new HttpParams();
    if (params) {
      for (const key in params) {
        if (params[key] === false || params[key]) {
          httpParams = httpParams.set(key, params[key]);
        }
      }
    }
    options ? httpGetOptions = options : null;
    return this.http.get(url, { params: httpParams, ...httpGetOptions}).pipe(
      catchError(this.handleError)
    );
  }

  public post<Void>(url: String, data?: Object, options?: Object) {
    options ? httpPostOptions = options : null;
    return this.http.post(url, data, httpPostOptions).pipe(
      catchError(this.handleError)
    );
  }

  //   public put(url, data?: Object, cb?: Function, options?: Object) {
  //     console.log('put开始请求');
  //     const vm = this;
  //     vm.http.put(url, data, options)
  //       .subscribe(res => {
  //         console.log('put请求结束', res);
  //         cb(res);
  //       });
  //   }

  //   public delete(url, params?: Object, cb?: Function) {
  //     let httpParams = new HttpParams();
  //     console.log('delete开始请求');
  //     const vm = this;
  //     if (params) {
  //       for (const key in params) {
  //         if (params[key]) {
  //           httpParams = httpParams.set(key, params[key]);
  //         }
  //       }
  //     }
  //     vm.http.delete(url, { params: httpParams })
  //       .subscribe(data => {
  //         console.log('delete请求结束', data);
  //         cb(data);
  //       });
  //   }
}