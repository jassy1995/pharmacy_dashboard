import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StoreService } from './store.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { RestaurantProfileDetails } from 'src/app/models/restaurant';
import { AuthResponse } from 'src/app/models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api = 'https://sellbackend.creditclan.com/schoolcredit/public/index.php/api';
  private isAuthenticated = false;

  constructor(private http: HttpClient, private router: Router, private _store: StoreService) {
  }

  private _restaurant: RestaurantProfileDetails | null = null;

  public $restaurant = new BehaviorSubject<RestaurantProfileDetails | null>(this._restaurant);

  public get restaurant(): RestaurantProfileDetails | null {
    return this._restaurant;
  }

  public get token(): string | null {
    return localStorage.getItem('token') || null;
  }

  public get authenticated(): boolean {
    return this.isAuthenticated;
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  setRestaurant(school: RestaurantProfileDetails) {
    this._restaurant = school;
    this.$restaurant.next(this._restaurant);
  }

  updateRestaurant(data: any) {
    this._restaurant = { ...this._restaurant, ...data };
    this.$restaurant.next(this._restaurant);
  }

  authenticate(restaurant: any) {
    this.setRestaurant(restaurant);
    this.isAuthenticated = true;
  }

  getRestaurantFromToken(token: any) {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get(`${this.api}/school/data`, { headers });
  }

  login(
    data: Partial<{
      email: string;
      password: string;
      phone: string;
    }>
  ): Promise<AuthResponse> {
    return this.http.post<any>(`${this.api}/school/login`, data).toPromise();
  }

  async logout() {
    this.isAuthenticated = false;
    this._restaurant = null;
    this.$restaurant.next(null);
    this._store.reset();
    localStorage.removeItem('token');
    await this.router.navigate(['/login']);
  }
}
