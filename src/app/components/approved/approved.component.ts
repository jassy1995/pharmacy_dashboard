import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { GeneralService } from 'src/app/services/general.service';
import { StoreService } from 'src/app/services/store.service';
import { IRequest } from 'src/app/models/requests';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-students',
  templateUrl: './approved.component.html',
  styleUrls: ['./approved.component.scss']
})
export class ApprovedComponent implements OnInit, OnDestroy, AfterViewInit {
  subscriptions: Subscription[] = [];
  students: Array<IRequest> = [];
  searched: any = {
    data: [],
    meta: null,
    searching: false,
    query: '',
    pagination: {
      page: 1,
      end: true
    }

  };
  loading = false;
  fetching = false;
  timer: any
  modal = '';
  currentStudent = null;
  mobile = window.innerWidth < 768;
  pagination: any = {
    page: 1,
    end: false
  };
  total = 0;
  timeout: any = null;

  constructor(
    private _api: ApiService,
    public _general: GeneralService,
    public _auth: AuthService,
    public _store: StoreService
  ) {
  }

  public get items(): any[] {
    if (this.searched.meta) return this.searched.data;
    else return this.students;
  }

  ngOnInit(): void {
    console.log(this._auth.restaurant?.slug)
    if (!this._store.approvedRequest.items?.length) this.fetchRequests(1);
    this.subscriptions.push(
      this._store.$approvedRequest.subscribe({
        next: ({ items, pagination, total }) => {
          if (!items) return;
          this.students = items;
          this.total = total;
          if (this.pagination) this.pagination = pagination;
        }
      })
    );
  }

  ngAfterViewInit() {
  }

  fetchRequests(page_number = 1) {
    this[page_number === 1 ? 'loading' : 'fetching'] = true;
    this._api.getApprovedRequests(page_number, this._auth.restaurant!.slug).pipe(take(1)).subscribe({
      next: (res: any) => {
        console.log(res)
        const { data, total } = res;
        const items = data.filter((item: any) => item.customer !== null)
        if (page_number === 1) {
          this._store.setState('approvedRequest', {
            ...this._store.approvedRequest,
            items: items,
            pagination: { ...this.pagination, end: data.length === total },
            total
          }, true);
        } else {
          this._store.setState('approvedRequest', {
            ...this._store.approvedRequest,
            items: [...this.students, ...data],
            pagination: { ...this.pagination, end: data.length === total },
            total
          }, true);
        }
        this[page_number === 1 ? 'loading' : 'fetching'] = false;
      },
      error: () => {
        this[page_number === 1 ? 'loading' : 'fetching'] = false;
        this._general.notify('error', 'Unable to fetch requests, please check your network and reload');
      },
    });
  }

  loadMore() {
    if (!this.pagination.end) this.fetchRequests(++this.pagination.page);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  async handleSearchInputChange(e: any) {
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(async () => {
      const query = e.target.value;
      if (query) {
        await this.search(query);
        this.searched.searching = true;
        this.searched.query = query;
      } else {
        this.searched = { searching: false, data: [], meta: null, pagination: { page: 1, end: true }, query: '' };
      }
    }, 1000);
  }


  async search(query: any, page_number = 1) {
    this[page_number === 1 ? 'loading' : 'fetching'] = true;
    try {
      const res: any = await this._api.searchApproveRequests(query, this._auth.restaurant?.slug);
      console.log(res)
      const { data, total } = res;
      if (page_number === 1) {
        this.searched.data = data;
      } else {
        this.searched.data = [...this.searched.data, ...data];
      }
      this.searched.pagination.page = page_number;
      this.searched.pagination.end = this.searched.data.length === total;
      this[page_number === 1 ? 'loading' : 'fetching'] = false;
    } catch (e: any) {
      console.log(e);
      this[page_number === 1 ? 'loading' : 'fetching'] = false;
      this._general.notify('error', 'Unable to fetch requests, please check your network and reload');
    }

  }



}
