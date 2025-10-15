import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JewelryService {
  apiUrl = 'https://my-json-server.typicode.com/karukaaa/AngularAruriApi/jewelry';

  constructor(private http: HttpClient) {}

  public getJewelry(): Observable<Jewelry[]> {
    return this.http.get<Jewelry[]>(this.apiUrl);
  }

  public searchJewelry(query: string): Observable<Jewelry[]> {
    return this.http.get<Jewelry[]>(`${this.apiUrl}?q=${query}`);
  }
}

export interface Jewelry {
  id: number;
  name: string;
  description: string;
}
