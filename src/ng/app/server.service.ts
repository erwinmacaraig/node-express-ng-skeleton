
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ServerService {
  constructor(private http: Http) { }

  storeServers(servers: any[]) {
    const myHeader = new Headers({'Content-Type': 'application/json'});
    // return this.http.post('https://learning-proj-cd416.firebaseio.com/data.json',
    //     servers,
    //     {headers: myHeader}
    // );

    return this.http.put('https://learning-proj-cd416.firebaseio.com/data.json',
        servers,
        {headers: myHeader}
    );
  }
  getServers() {
    return this.http.get('https://learning-proj-cd416.firebaseio.com/data.json').map(
      (response: Response) => {
        const data = response.json();
        for (const server of data) {
          server.name = 'FETCHED_' + server.name;
        }
        return data;
      }
    ).catch((error: Response) => {
      // console.log(error);
      return Observable.throw('Something went wrong');
    });
  }

  getAppName() {
    return this.http.get('https://learning-proj-cd416.firebaseio.com/appName.json').map(
      (response: Response) => {
        console.log(response);
        return response.json();
      }
    );
  }
}
