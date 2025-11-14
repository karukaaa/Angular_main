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

  public getJewelryById(id: string | number): Observable<Jewelry> {
    return this.http.get<Jewelry>(`${this.apiUrl}/${id}`);
  }
}

export interface Jewelry {
  id: number;
  name: string;
  description: string;
  type: string;
  material: string;
  size: string;
  price: number;
  img: string;
  currency: string;
  availability: boolean;
  stones: string[];
  weight: string;
  style: string;
  collection: {
    name: string;
    description: string;
    creationDate: string;
  };
}
