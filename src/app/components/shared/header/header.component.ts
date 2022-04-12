import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { RestaurantProfileDetails } from 'src/app/models/restaurant';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() currentRoute?: string;
  @Output() search = new EventEmitter();
  @Input('show-search') showSearch = false;

  mobileNavVisible = false;
  mobile = window.innerWidth < 768;
  modal = '';
  merchant: RestaurantProfileDetails | null = null;
  subscriptions: Subscription[] = [];
  scrolled = false;
  scrollHandler: any = null;
  lastScrollTop = 0;
  scrollDirection = '';

  constructor(
    public _general: GeneralService,
    private location: Location,
    private _api: ApiService,
    public _auth: AuthService
  ) {
  }

  ngOnInit() {
    this.subscriptions.push(
      this._auth.$restaurant.subscribe({
        next: merchant => {
          this.merchant = merchant;
        }
      })
    );
    this.scrollHandler = this.handleScroll.bind(this);
    window.addEventListener('scroll', this.scrollHandler);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scrollHandler);
  }

  handleScroll(e: any) {
    const scrollTop = e.target.scrollingElement.scrollTop;
    this.scrolled = scrollTop > 50;
    const st = window.scrollY || document.documentElement.scrollTop;
    this.scrollDirection = st > this.lastScrollTop ? 'down' : 'up';
    this.lastScrollTop = st <= 0 ? 0 : st;
  }

  goBack() {
    this.location.back();
  }

  launchModal(modal: string) {
    this.modal = modal;
  }
}
