import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { AuthService } from './auth.service';
import axios from 'axios'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url = 'https://sellbackend.creditclan.com/merchantclan/public/index.php/api';

  constructor(
    private http: HttpClient,
    private _auth: AuthService
  ) {
  }

  getApprovedRequests(page = 1, slug: string) {
    return this.http.get(`${this.url}/pharmacy/requests?slug=${slug}&status=approved&page=${page}&requests_per_page=${10}`);
  }
  getPendingRequests(page = 1, slug: string | undefined) {
    return this.http.get(`${this.url}/pharmacy/requests?slug=${slug}&status=pending&page=${page}&requests_per_page=${10}`);
  }

  approveRequestMethod(payload: any) {
    return lastValueFrom(this.http.post(`${this.url}/pharmacy/approve`, payload));
  }

  rejectRequestMethod(payload: any) {
    return lastValueFrom(this.http.post(`${this.url}/pharmacy/reject`, payload));
  }


  searchApproveRequests(search: string, slug: any, page = 1) {
    return lastValueFrom(this.http.post(`${this.url}/pharmacies/requests/search?slug=${slug}&status=approved&page=${page}&requests_per_page=${10}`, { search: search }));
  }

  searchPendingRequests(search: string, slug: any, page = 1) {
    return lastValueFrom(this.http.post(`${this.url}/pharmacies/requests/search?slug=${slug}&status=pending&page=${page}&requests_per_page=${10}`, { search: search }));
  }


  async getEatSummary(slug: any) {
    const getRequest: any = await lastValueFrom(this.http.get(`${this.url}/eat/requests?slug=${slug}&status=approved&page=1&requests_per_page=${10}`))
    const payload = {
      phone: getRequest.data[0].waiter_phone
    }
    return lastValueFrom(this.http.post('https://sellbackend.creditclan.com/parent/index.php/globalrequest/eat_summary', payload));
  }
}
