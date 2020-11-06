import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Futurama} from '../models/futurama';

@Injectable({
  providedIn: 'root'
})

// This is a sample api: copy this format

export class DemoService {

  private futuramaSubject = new BehaviorSubject<Futurama>(null)
  public futurama$: Observable<Futurama> = this.futuramaSubject.asObservable();

  constructor(
    private http: HttpClient,
  ) { }

  getFuturama() {
    const url = 'https://sampleapis.com/futurama/api/info';

    return this.http.get<[Futurama]>(url).subscribe(
      (data) => {
        if (data.length === 1) {
          this.futuramaSubject.next(new Futurama(data[0]));
        }
      }
    )
  }

}
