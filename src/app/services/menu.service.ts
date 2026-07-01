import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  _id?: string;
  id?: number; // fallback for mock data
  name: string;
  description: string;
  price: number | string;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/api/menu';

  getMenu(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
}
