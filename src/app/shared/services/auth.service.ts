import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private idSubject = new BehaviorSubject<string>(null);
  public id$: Observable<string> = this.idSubject.asObservable();

  private loginFailSubject = new BehaviorSubject<boolean>(false);
  public loginFail$: Observable<boolean> = this.loginFailSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    // For testing
    this.idSubject.next('test1');
  }

  login(id: string, pw: string) {
    const url = `${environment.apiUrl}/account?username=${id}&password=${pw}`;

    this.http.get<string[]>(url).subscribe(
      (data) => {
        if (data === null || data.length !== 1) {
          console.log('Failed login.');
          this.idSubject.next(null);
        } else {
          this.loginFailSubject.next(false);
          this.idSubject.next(data[0]);
          this.router.navigateByUrl('/');
        }
      },
      (error) => {
        console.log(error);
        this.loginFailSubject.next(true);
      }
    );
  }

  logout() {
    this.idSubject.next(null);
    this.router.navigateByUrl('/login');
  }

  signup(id: string, pw: string) {


  }


  isLoggedIn() {
    return this.idSubject.getValue() !== null;
  }
}
