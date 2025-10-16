import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JewelryService {
  apiUrl = 'https://my-json-server.typicode.com/karukaaa/AngularAruriApi/jewelry';

  constructor(private http: HttpClient) {}

  public getJewelry(term: string): Observable<Jewelry[]> {
    const termRequest = term ? `?q=${term}` : '';

    return this.http.get<Jewelry[]>(`${this.apiUrl}${termRequest}`);
  }
}

export interface Jewelry {
  id: number;
  name: string;
  description: string;
}
