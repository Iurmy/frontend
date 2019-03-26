import { HttpService } from '../../http/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';




// export interface Config {
//   heroesUrl: string;
//   textfile: string;
// }



@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(public http: HttpService) { }

  public tryHttp(query: any): Observable<any> {
    return this.http.get('/photo/userPhoto/page', query)
  }


  public tryHttpPost(data: any): Observable<any> {
    return this.http.post('/photo/userPhoto/page', data)
  }
}
