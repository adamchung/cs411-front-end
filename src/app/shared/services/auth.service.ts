import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private idSubject = new BehaviorSubject<string>(null);
  public id: Observable<string> = this.idSubject.asObservable();

  constructor(
    private http: HttpClient,
  ) { }

  login(id: string, pw: string) {
    const url = `${environment.apiUrl}/account?username=${id}&password=${pw}`;

    this.http.get<string[]>(url).subscribe(
      (data) => {
        if (data === null || data.length !== 1) {
          console.log('Failed login.');
          this.idSubject.next(null);
        } else {
          this.idSubject.next(data[0]);
        }
    });
  }

  logout() {

  }

  signup(id: string, pw: string)
  {

  }

  isLoggedIn() {
    return true;
  }
}
