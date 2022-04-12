import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  modal = '';
  total_meals_today = 0;
  total_meals_amount = 0;
  all_requests = 0;

  constructor(
    private router: Router,
    public _auth: AuthService,
    private _api: ApiService,
  ) {
  }

  ngOnInit(): void {
    console.log(this._auth.restaurant!.phone);
    this.getSummary();

  }

  async getSummary() {
    const res: any = await this._api.getEatSummary(this._auth.restaurant?.slug);
    this.total_meals_today = res.data.total_meals_today;
    this.total_meals_amount = res.data.total_meals_amount;
    this.all_requests = res.data.all_requests;
  }
}
