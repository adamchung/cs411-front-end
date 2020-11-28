import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
  ) { }

  login(id: string, pw: string) {
    const url = `${environment.apiUrl}`;
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
