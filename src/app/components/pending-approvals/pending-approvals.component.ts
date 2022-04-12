import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { GeneralService } from 'src/app/services/general.service';
import { StoreService } from 'src/app/services/store.service';
import { IRequest } from 'src/app/models/requests';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  templateUrl: './pending-approvals.component.html',
  styleUrls: ['./pending-approvals.component.scss']
})
export class PendingApprovalsComponent implements OnInit, OnDestroy, AfterViewInit {
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
  modal = '';
  mobile = window.innerWidth < 768;
  pagination: any = {
    page: 1,
    end: false
  };
  total = 0;
  approving = null;
  rejecting = null;
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
    if (!this._store.pendingRequest.items?.length) this.fetchRequests(1);
    this.subscriptions.push(
      this._store.$pendingRequest.subscribe({
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
    this._api.getPendingRequests(page_number, this._auth.restaurant?.slug).pipe(take(1)).subscribe({
      next: (res: any) => {
        console.log(res)
        const { data, total } = res;

        if (page_number === 1) {
          this._store.setState('pendingRequest', {
            ...this._store.pendingRequest,
            items: data,
            pagination: { ...this.pagination, end: data.length === total },
            total
          }, true);
        } else {
          this._store.setState('pendingRequest', {
            ...this._store.pendingRequest,
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
      }
    });
  }

  loadMore() {
    if (!this.pagination.end) this.fetchRequests(++this.pagination.page);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  async approveRequest(request: any) {
    this.approving = request.id;
    try {
      await this._api.approveRequestMethod({ request_id: request.id });
      this.fetchRequests();
    } catch (e: any) {
      console.log({ e });
      this._general.notify('error', e?.error?.message || 'Unable to login');
    }
    this.approving = null;
  }

  async rejectRequest(request: any) {
    this.rejecting = request.id;
    try {
      await this._api.rejectRequestMethod({ request_id: request.id });
      this.fetchRequests();
    } catch (e: any) {
      console.log({ e });
      this._general.notify('error', e?.error?.message || 'Unable to login');
    }
    this.rejecting = null;
  }

  handleSearchInputChange(e: any) {
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      const query = e.target.value;
      if (query) {
        this.search(query);
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
      const res: any = await this._api.searchPendingRequests(query, this._auth.restaurant?.slug);
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
